import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateLeadDto,
  UpdateLeadDto,
  LeadQueryDto,
  UpdateStatusDto,
  AddNoteDto,
} from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadsService {
  constructor(private prisma: PrismaService) {}

  // Helper: Sanitize phone - keep only digits
  private sanitizePhone(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  // Helper: Validate email format
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Helper: Validate and sanitize phones array
  private validateAndSanitizePhones(phones: string[]): string[] {
    return phones
      .map((p) => this.sanitizePhone(p))
      .filter((p) => p.length >= 9); // Filter out invalid short numbers
  }

  // Helper: Validate emails array
  private validateEmails(emails: string[]): string[] {
    const invalidEmails = emails.filter((e) => !this.isValidEmail(e));
    if (invalidEmails.length > 0) {
      throw new BadRequestException(
        `Invalid email format: ${invalidEmails.join(', ')}`,
      );
    }
    return emails.map((e) => e.toLowerCase().trim());
  }

  // Helper: Check for duplicate emails in existing leads
  private async checkDuplicateEmails(
    emails: string[],
    excludeLeadId?: string,
  ): Promise<void> {
    if (emails.length === 0) return;

    const allLeads = await this.prisma.lead.findMany({
      where: excludeLeadId ? { id: { not: excludeLeadId } } : undefined,
      select: { id: true, name: true, emails: true },
    });

    for (const lead of allLeads) {
      const leadEmails = (lead.emails as string[]) || [];
      const duplicates = emails.filter((email) =>
        leadEmails.some(
          (existingEmail) =>
            existingEmail.toLowerCase() === email.toLowerCase(),
        ),
      );

      if (duplicates.length > 0) {
        throw new ConflictException('Lead đã tồn tại');
      }
    }
  }

  // Helper: Check for duplicate phones in existing leads
  private async checkDuplicatePhones(
    phones: string[],
    excludeLeadId?: string,
  ): Promise<void> {
    if (phones.length === 0) return;

    const allLeads = await this.prisma.lead.findMany({
      where: excludeLeadId ? { id: { not: excludeLeadId } } : undefined,
      select: { id: true, name: true, phones: true },
    });

    for (const lead of allLeads) {
      const leadPhones = (lead.phones as string[]) || [];
      const duplicates = phones.filter((phone) =>
        leadPhones.some(
          (existingPhone) =>
            this.sanitizePhone(existingPhone) === this.sanitizePhone(phone),
        ),
      );

      if (duplicates.length > 0) {
        throw new ConflictException('Lead đã tồn tại');
      }
    }
  }

  private readonly leadSelect = {
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

  async findAll(query: LeadQueryDto, user: { id: string; role: string }) {
    const {
      search,
      status,
      platform,
      source,
      region,
      industry,
      userId: filterUserId,
      dateFrom,
      dateTo,
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // ADMIN sees all, SALES/MARKETING see only their own leads
    const roleFilter = user.role === 'ADMIN' ? {} : { userId: user.id };

    const where: Prisma.LeadWhereInput = {
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

  async findOne(id: string, user: { id: string; role: string }) {
    const lead = await this.prisma.lead.findUnique({
      where: { id },
      select: this.leadSelect,
    });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    // Check permission: ADMIN can see all, others can only see their own leads
    if (user.role !== 'ADMIN' && lead.userId !== user.id) {
      throw new NotFoundException('Lead not found');
    }

    return lead;
  }

  async create(dto: CreateLeadDto, userId: string) {
    const { emails, phones, keywords, notes, ...leadData } = dto;

    // Validate and sanitize
    const validatedEmails = emails ? this.validateEmails(emails) : [];
    const sanitizedPhones = phones
      ? this.validateAndSanitizePhones(phones)
      : [];

    // Check for duplicate emails and phones
    await this.checkDuplicateEmails(validatedEmails);
    await this.checkDuplicatePhones(sanitizedPhones);

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

  async update(id: string, dto: UpdateLeadDto) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const { emails, phones, keywords, notes: _notes, ...leadData } = dto;

    const updateData: any = {
      ...leadData,
      nextActionDate: dto.nextActionDate
        ? new Date(dto.nextActionDate)
        : undefined,
    };

    if (emails !== undefined) {
      const validatedEmails = this.validateEmails(emails);
      // Check duplicate emails, excluding current lead
      await this.checkDuplicateEmails(validatedEmails, id);
      updateData.emails = validatedEmails;
    }

    if (phones !== undefined) {
      const sanitizedPhones = this.validateAndSanitizePhones(phones);
      // Check duplicate phones, excluding current lead
      await this.checkDuplicatePhones(sanitizedPhones, id);
      updateData.phones = sanitizedPhones;
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

  async updateStatus(id: string, dto: UpdateStatusDto, _userId: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const result = await this.prisma.$transaction(async (tx) => {
      const updatedLead = await tx.lead.update({
        where: { id },
        data: { status: dto.status },
        select: this.leadSelect,
      });

      // Increment leadsProcessed khi chuyển sang CLOSED
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

  async addNote(
    id: string,
    dto: AddNoteDto,
    _authorId: string,
  ): Promise<string[]> {
    const lead = await this.prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    const currentNotes = (lead.notes as string[]) || [];
    const updatedNotes = [...currentNotes, dto.content];

    await this.prisma.lead.update({
      where: { id },
      data: { notes: updatedNotes },
    });

    return updatedNotes;
  }

  async remove(id: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    await this.prisma.lead.delete({ where: { id } });

    return { message: 'Lead deleted successfully' };
  }

  async bulkDelete(ids: string[]) {
    const result = await this.prisma.lead.deleteMany({
      where: { id: { in: ids } },
    });

    return { message: `${result.count} leads deleted successfully` };
  }

  async assignTo(id: string, userId: string) {
    const lead = await this.prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      throw new NotFoundException('Lead not found');
    }

    return this.prisma.lead.update({
      where: { id },
      data: { userId },
      select: this.leadSelect,
    });
  }
}
