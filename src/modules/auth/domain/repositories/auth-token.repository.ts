import { UserTokenInterface } from "../interfaces/types/user-token.interface";

export interface AuthTokenRepository {
    generateAndSaveTokens(userId: string, email: string): Promise<UserTokenInterface>;
    deleteSessionsByUserId(userId: string): Promise<void>;
    refreshTokens(userId: string, refreshToken: string): Promise<UserTokenInterface>;
    validateToken(token: string): Promise<{ isValid: boolean; payload?: any; error?: string }>;
}
