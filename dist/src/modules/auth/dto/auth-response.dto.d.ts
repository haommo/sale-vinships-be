export declare class AuthUserDto {
    id: string;
    email: string;
    name: string;
    role: string;
}
export declare class AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: AuthUserDto;
}
