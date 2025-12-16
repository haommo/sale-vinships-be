export declare class UserResponseDto {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    avatar?: string;
    lastLogin?: Date;
    leadsProcessed: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare class PaginationMetaDto {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export declare class PaginatedUsersResponseDto {
    data: UserResponseDto[];
    meta: PaginationMetaDto;
}
