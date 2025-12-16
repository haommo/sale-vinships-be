import { LeadStatus } from '@prisma/client';
export declare class LeadQueryDto {
    search?: string;
    status?: LeadStatus;
    platform?: string;
    source?: string;
    region?: string;
    industry?: string;
    userId?: string;
    dateFrom?: string;
    dateTo?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
