import { LeadsService } from './leads.service';
import { CreateLeadDto, UpdateLeadDto, LeadQueryDto, UpdateStatusDto, AddNoteDto, BulkDeleteDto, AssignLeadDto } from './dto';
export declare class LeadsController {
    private leadsService;
    constructor(leadsService: LeadsService);
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
            emails: import("@prisma/client/runtime/library").JsonValue;
            phones: import("@prisma/client/runtime/library").JsonValue;
            keywords: import("@prisma/client/runtime/library").JsonValue;
            notes: import("@prisma/client/runtime/library").JsonValue;
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
        emails: import("@prisma/client/runtime/library").JsonValue;
        phones: import("@prisma/client/runtime/library").JsonValue;
        keywords: import("@prisma/client/runtime/library").JsonValue;
        notes: import("@prisma/client/runtime/library").JsonValue;
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
        emails: import("@prisma/client/runtime/library").JsonValue;
        phones: import("@prisma/client/runtime/library").JsonValue;
        keywords: import("@prisma/client/runtime/library").JsonValue;
        notes: import("@prisma/client/runtime/library").JsonValue;
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
        emails: import("@prisma/client/runtime/library").JsonValue;
        phones: import("@prisma/client/runtime/library").JsonValue;
        keywords: import("@prisma/client/runtime/library").JsonValue;
        notes: import("@prisma/client/runtime/library").JsonValue;
        userId: string;
    }>;
    updateStatus(id: string, dto: UpdateStatusDto, userId: string): Promise<{
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
        emails: import("@prisma/client/runtime/library").JsonValue;
        phones: import("@prisma/client/runtime/library").JsonValue;
        keywords: import("@prisma/client/runtime/library").JsonValue;
        notes: import("@prisma/client/runtime/library").JsonValue;
        userId: string;
    }>;
    addNote(id: string, dto: AddNoteDto, userId: string): Promise<string[]>;
    assign(id: string, dto: AssignLeadDto): Promise<{
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
        emails: import("@prisma/client/runtime/library").JsonValue;
        phones: import("@prisma/client/runtime/library").JsonValue;
        keywords: import("@prisma/client/runtime/library").JsonValue;
        notes: import("@prisma/client/runtime/library").JsonValue;
        userId: string;
    }>;
    bulkDelete(dto: BulkDeleteDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
