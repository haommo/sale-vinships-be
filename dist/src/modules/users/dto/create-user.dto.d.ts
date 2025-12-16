import { UserRole, UserStatus } from '@prisma/client';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status?: UserStatus;
    avatar?: string;
}
