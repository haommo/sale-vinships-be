"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LeadsService = class LeadsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    sanitizePhone(phone) {
        return phone.replace(/\D/g, '');
    }
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validateAndSanitizePhones(phones) {
        return phones
            .map((p) => this.sanitizePhone(p))
            .filter((p) => p.length >= 9);
    }
    validateEmails(emails) {
        const invalidEmails = emails.filter((e) => !this.isValidEmail(e));
        if (invalidEmails.length > 0) {
            throw new common_1.BadRequestException(`Invalid email format: ${invalidEmails.join(', ')}`);
        }
        return emails.map((e) => e.toLowerCase().trim());
    }
    leadSelect = {
        id: true,
        name: true,
        company: true,
        website: true,
        region: true,
        industry: true,
        platform: true,
        source: true,
        status: true,
        nextActionDate: true,
        emails: true,
        phones: true,
        keywords: true,
        notes: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        user: {
            select: {
                id: true,
                name: true,
                email: true,
            },
        },
    };
    async findAll(query, user) {
        const { search, status, platform, source, region, industry, userId: filterUserId, dateFrom, dateTo, page = 1, limit = 10, sortBy = 'createdAt', sortOrder = 'desc', } = query;
        const skip = (page - 1) * limit;
        const roleFilter = user.role === 'ADMIN' ? {} : { userId: user.id };
        const where = {
            ...roleFilter,
            ...(search && {
                AND: [
                    {
                        OR: [
                            { name: { contains: search } },
                            { company: { contains: search } },
                        ],
                    },
                ],
            }),
            ...(status && { status }),
            ...(platform && { platform }),
            ...(source && { source }),
            ...(region && { region }),
            ...(industry && { industry }),
            ...(filterUserId && { userId: filterUserId }),
            ...(dateFrom || dateTo
                ? {
                    createdAt: {
                        ...(dateFrom && { gte: new Date(dateFrom) }),
                        ...(dateTo && { lte: new Date(dateTo) }),
                    },
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.lead.findMany({
                where,
                skip,
                take: limit,
                orderBy: { [sortBy]: sortOrder },
                select: this.leadSelect,
            }),
            this.prisma.lead.count({ where }),
        ]);
        return {
            data,
            meta: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id, user) {
        const lead = await this.prisma.lead.findUnique({
            where: { id },
            select: this.leadSelect,
        });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        if (user.role !== 'ADMIN' && lead.userId !== user.id) {
            throw new common_1.NotFoundException('Lead not found');
        }
        return lead;
    }
    async create(dto, userId) {
        const { emails, phones, keywords, notes, ...leadData } = dto;
        const validatedEmails = emails ? this.validateEmails(emails) : [];
        const sanitizedPhones = phones
            ? this.validateAndSanitizePhones(phones)
            : [];
        return this.prisma.lead.create({
            data: {
                ...leadData,
                userId,
                nextActionDate: dto.nextActionDate
                    ? new Date(dto.nextActionDate)
                    : null,
                emails: validatedEmails,
                phones: sanitizedPhones,
                keywords: keywords || [],
                notes: notes || [],
            },
            select: this.leadSelect,
        });
    }
    async update(id, dto) {
        const lead = await this.prisma.lead.findUnique({ where: { id } });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        const { emails, phones, keywords, notes: _notes, ...leadData } = dto;
        const updateData = {
            ...leadData,
            nextActionDate: dto.nextActionDate
                ? new Date(dto.nextActionDate)
                : undefined,
        };
        if (emails !== undefined) {
            updateData.emails = this.validateEmails(emails);
        }
        if (phones !== undefined) {
            updateData.phones = this.validateAndSanitizePhones(phones);
        }
        if (keywords !== undefined) {
            updateData.keywords = keywords;
        }
        return this.prisma.lead.update({
            where: { id },
            data: updateData,
            select: this.leadSelect,
        });
    }
    async updateStatus(id, dto, _userId) {
        const lead = await this.prisma.lead.findUnique({ where: { id } });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const updatedLead = await tx.lead.update({
                where: { id },
                data: { status: dto.status },
                select: this.leadSelect,
            });
            if (dto.status === 'CLOSED' && lead.userId) {
                await tx.user.update({
                    where: { id: lead.userId },
                    data: { leadsProcessed: { increment: 1 } },
                });
            }
            return updatedLead;
        });
        return result;
    }
    async addNote(id, dto, _authorId) {
        const lead = await this.prisma.lead.findUnique({ where: { id } });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        const currentNotes = lead.notes || [];
        const updatedNotes = [...currentNotes, dto.content];
        await this.prisma.lead.update({
            where: { id },
            data: { notes: updatedNotes },
        });
        return updatedNotes;
    }
    async remove(id) {
        const lead = await this.prisma.lead.findUnique({ where: { id } });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        await this.prisma.lead.delete({ where: { id } });
        return { message: 'Lead deleted successfully' };
    }
    async bulkDelete(ids) {
        const result = await this.prisma.lead.deleteMany({
            where: { id: { in: ids } },
        });
        return { message: `${result.count} leads deleted successfully` };
    }
    async assignTo(id, userId) {
        const lead = await this.prisma.lead.findUnique({ where: { id } });
        if (!lead) {
            throw new common_1.NotFoundException('Lead not found');
        }
        return this.prisma.lead.update({
            where: { id },
            data: { userId },
            select: this.leadSelect,
        });
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsService);
//# sourceMappingURL=leads.service.js.map