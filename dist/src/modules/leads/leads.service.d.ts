import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto, UpdateStatusDto, AddNoteDto } from './dto';
import { Prisma } from '@prisma/client';
export declare class LeadsService {
    private prisma;
    constructor(prisma: PrismaService);
    private sanitizePhone;
    private isValidEmail;
    private validateAndSanitizePhones;
    private validateEmails;
    private readonly leadSelect;
    findAll(query: LeadQueryDto, user: {
        id: string;
        role: string;
    }): Promise<{
        data: {
            id: string;
            name: string;
            status: import(".prisma/client").$Enums.LeadStatus;
            createdAt: Date;
            updatedAt: Date;
            user: {
                id: string;
                email: string;
                name: string;
            };
            website: string | null;
            company: string | null;
            region: string | null;
            industry: string | null;
            platform: string;
            source: string;
            nextActionDate: Date | null;
            emails: Prisma.JsonValue;
            phones: Prisma.JsonValue;
            keywords: Prisma.JsonValue;
            notes: Prisma.JsonValue;
            userId: string;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: string, user: {
        id: string;
        role: string;
    }): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            name: string;
        };
        website: string | null;
        company: string | null;
        region: string | null;
        industry: string | null;
        platform: string;
        source: string;
        nextActionDate: Date | null;
        emails: Prisma.JsonValue;
        phones: Prisma.JsonValue;
        keywords: Prisma.JsonValue;
        notes: Prisma.JsonValue;
        userId: string;
    }>;
    create(dto: CreateLeadDto, userId: string): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            name: string;
        };
        website: string | null;
        company: string | null;
        region: string | null;
        industry: string | null;
        platform: string;
        source: string;
        nextActionDate: Date | null;
        emails: Prisma.JsonValue;
        phones: Prisma.JsonValue;
        keywords: Prisma.JsonValue;
        notes: Prisma.JsonValue;
        userId: string;
    }>;
    update(id: string, dto: UpdateLeadDto): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            name: string;
        };
        website: string | null;
        company: string | null;
        region: string | null;
        industry: string | null;
        platform: string;
        source: string;
        nextActionDate: Date | null;
        emails: Prisma.JsonValue;
        phones: Prisma.JsonValue;
        keywords: Prisma.JsonValue;
        notes: Prisma.JsonValue;
        userId: string;
    }>;
    updateStatus(id: string, dto: UpdateStatusDto, _userId: string): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            name: string;
        };
        website: string | null;
        company: string | null;
        region: string | null;
        industry: string | null;
        platform: string;
        source: string;
        nextActionDate: Date | null;
        emails: Prisma.JsonValue;
        phones: Prisma.JsonValue;
        keywords: Prisma.JsonValue;
        notes: Prisma.JsonValue;
        userId: string;
    }>;
    addNote(id: string, dto: AddNoteDto, _authorId: string): Promise<string[]>;
    remove(id: string): Promise<{
        message: string;
    }>;
    bulkDelete(ids: string[]): Promise<{
        message: string;
    }>;
    assignTo(id: string, userId: string): Promise<{
        id: string;
        name: string;
        status: import(".prisma/client").$Enums.LeadStatus;
        createdAt: Date;
        updatedAt: Date;
        user: {
            id: string;
            email: string;
            name: string;
        };
        website: string | null;
        company: string | null;
        region: string | null;
        industry: string | null;
        platform: string;
        source: string;
        nextActionDate: Date | null;
        emails: Prisma.JsonValue;
        phones: Prisma.JsonValue;
        keywords: Prisma.JsonValue;
        notes: Prisma.JsonValue;
        userId: string;
    }>;
}
