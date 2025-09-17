import { Injectable } from '@nestjs/common';
import { AuthSession } from '../../domain/entities/auth-session.entity';
import { AuthRepositoryInterface } from '../../domain/repositories/auth.repository.interface';

@Injectable()
export class AuthRepository implements AuthRepositoryInterface {
    private sessions: Map<string, AuthSession> = new Map();

    async saveSession(session: AuthSession): Promise<AuthSession> {
        this.sessions.set(session.id, session);
        return session;
    }

    async findSessionByUserId(userId: string): Promise<AuthSession | null> {
        for (const session of this.sessions.values()) {
            if (session.userId === userId) {
                return session;
            }
        }
        return null;
    }

    async findSessionByRefreshToken(refreshToken: string): Promise<AuthSession | null> {
        for (const session of this.sessions.values()) {
            if (session.refreshToken === refreshToken) {
                return session;
            }
        }
        return null;
    }

    async deleteSession(sessionId: string): Promise<void> {
        this.sessions.delete(sessionId);
    }

    async deleteSessionsByUserId(userId: string): Promise<void> {
        for (const [sessionId, session] of this.sessions.entries()) {
            if (session.userId === userId) {
                this.sessions.delete(sessionId);
            }
        }
    }
}
