export declare class LeadNoteDto {
    id: string;
    content: string;
    authorId?: string;
    authorName?: string;
    createdAt: string;
}
export declare class LeadAssignedToDto {
    id: string;
    name: string;
    email: string;
}
export declare class LeadResponseDto {
    id: string;
    name: string;
    company?: string;
    website?: string;
    region?: string;
    industry?: string;
    platform: string;
    source: string;
    status: string;
    nextActionDate?: Date;
    assignedTo?: LeadAssignedToDto;
    emails: string[];
    phones: string[];
    keywords: string[];
    notes: LeadNoteDto[];
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaginationMetaDto {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class PaginatedLeadsResponseDto {
    data: LeadResponseDto[];
    meta: PaginationMetaDto;
}
