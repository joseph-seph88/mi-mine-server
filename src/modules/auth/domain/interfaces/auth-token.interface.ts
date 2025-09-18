export interface AuthToken {
    readonly accessToken: string;
    readonly refreshToken: string;
    readonly expiresIn: number;
}
