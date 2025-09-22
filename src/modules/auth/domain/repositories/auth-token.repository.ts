import { UserTokenInterface } from "../interfaces/types/user-token.interface";

export abstract class AuthTokenRepository {
    abstract generateAndSaveTokens(userId: string, email: string): Promise<UserTokenInterface>;
    abstract deleteSessionsByUserId(userId: string): Promise<void>;
    abstract refreshTokens(userId: string, refreshToken: string): Promise<UserTokenInterface>;
    abstract validateToken(token: string): Promise<{ isValid: boolean; payload?: any; error?: string }>;
}
