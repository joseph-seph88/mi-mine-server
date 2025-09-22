import { ConfigService } from '@nestjs/config';
import { RedisConfig } from '../interfaces/redis.interface';

export const redisConfigFactory = (configService: ConfigService): RedisConfig => ({
    host: configService.get<string>('REDIS_HOST', 'localhost'),
    port: configService.get<number>('REDIS_PORT', 6379),
    password: configService.get<string>('REDIS_PASSWORD') || undefined,
    db: configService.get<number>('REDIS_DB', 0),
});