import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';
import { UserSession } from '../entities/user-session.entity';
import { redisConfigFactory } from '../config/redis.config';

@Injectable()
export class RedisService implements OnModuleInit {
    private redis: RedisClientType;

    constructor(private readonly configService: ConfigService) { }

    async onModuleInit() {
        const redisConfig = redisConfigFactory(this.configService);

        this.redis = createClient({
            socket: {
                host: redisConfig.host,
                port: redisConfig.port,
            },
            password: redisConfig.password,
            database: redisConfig.db,
        });

        this.redis.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        await this.redis.connect();
    }

    async setSession(userId: string, session: UserSession): Promise<void> {
        try {
            const key = `session:${userId}`;
            const sessionData = {
                userId: session.userId,
                accessToken: session.accessToken,
                refreshToken: session.refreshToken,
                expiresAt: session.expiresAt.toISOString(),
                createdAt: session.createdAt.toISOString(),
            };

            await this.redis.setEx(key, this.getExpirationSeconds(session.expiresAt), JSON.stringify(sessionData));
        } catch (error) {
            throw new Error(`Failed to save session for user ${userId}: ${error.message}`);
        }
    }

    async getSessionByUserId(userId: string): Promise<UserSession | null> {
        const key = `session:${userId}`;
        const sessionData = await this.redis.get(key);

        if (!sessionData || typeof sessionData !== 'string') {
            return null;
        }

        return this.parseSessionData(sessionData);
    }

    async deleteSessionByUserId(userId: string): Promise<void> {
        const key = `session:${userId}`;
        await this.redis.del(key);
    }

    async cleanupExpiredSessions(): Promise<number> {
        const keys = await this.redis.keys('session:*');
        let deletedCount = 0;

        for (const key of keys) {
            const sessionData = await this.redis.get(key);
            if (sessionData && typeof sessionData === 'string') {
                const parsed = JSON.parse(sessionData);
                const expiresAt = new Date(parsed.expiresAt);

                if (new Date() > expiresAt) {
                    await this.redis.del(key);
                    deletedCount++;
                }
            }
        }

        return deletedCount;
    }

    /**
     * 세션 데이터를 AuthSession 객체로 파싱
     */
    private parseSessionData(sessionData: string): UserSession {
        const parsed = JSON.parse(sessionData);
        const session = new UserSession(
            parsed.userId,
            parsed.accessToken,
            parsed.refreshToken,
            new Date(parsed.expiresAt),
        );
        session.createdAt = new Date(parsed.createdAt);
        return session;
    }

    /**
     * 만료 시간까지의 초 단위 계산
     */
    private getExpirationSeconds(expiresAt: Date): number {
        const now = new Date();
        const diffMs = expiresAt.getTime() - now.getTime();
        return Math.max(1, Math.floor(diffMs / 1000));
    }
}
