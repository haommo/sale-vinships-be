import { UserRole, UserStatus } from '@prisma/client';
export declare class UserQueryDto {
    search?: string;
    role?: UserRole;
    status?: UserStatus;
    page?: number;
    limit?: number;
}
