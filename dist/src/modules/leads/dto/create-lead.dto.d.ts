import { LeadStatus } from '@prisma/client';
export declare class CreateLeadDto {
    name: string;
    company?: string;
    website?: string;
    region?: string;
    industry?: string;
    platform?: string;
    source?: string;
    status?: LeadStatus;
    nextActionDate?: string;
    emails?: string[];
    phones?: string[];
    keywords?: string[];
    notes?: string[];
}
