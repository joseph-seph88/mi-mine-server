import { AuthSession } from '../entities/auth-session.entity';

export interface AuthRepositoryInterface {
    saveSession(session: AuthSession): Promise<AuthSession>;
    findSessionByUserId(userId: string): Promise<AuthSession | null>;
    findSessionByRefreshToken(refreshToken: string): Promise<AuthSession | null>;
    deleteSession(sessionId: string): Promise<void>;
    deleteSessionsByUserId(userId: string): Promise<void>;
}
