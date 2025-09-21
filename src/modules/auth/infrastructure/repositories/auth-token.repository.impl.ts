import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../../../../shared/services/redis.service';
import { AuthTokenRepository } from '../../domain/repositories/auth-token.repository';
import { UserTokenInterface } from '../../domain/interfaces/types/user-token.interface';
import { JwtPayload } from '../../../../shared/interfaces/jwt-payload.interface';
import { JWT_CONSTANTS } from '../../../../shared/constants/auth.constants';
import { UserSession } from 'src/shared/entities/user-session.entity';
import { TimeUtil } from '../../../../shared/utils/time.util';

@Injectable()
export class AuthTokenRepositoryImpl extends AuthTokenRepository {
    constructor(
        private redisService: RedisService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {
        super();
    }

    async generateAndSaveTokens(userId: string, email: string): Promise<UserTokenInterface> {
        const tokens = await this.generateTokens(userId, email);
        const tokenData = UserSession.fromTokens(userId, tokens);
        await this.redisService.setSession(userId, tokenData);
        return tokens;
    }

    async deleteSessionsByUserId(userId: string): Promise<void> {
        await this.redisService.deleteSessionByUserId(userId);
    }

    async refreshTokens(userId: string, refreshToken: string): Promise<UserTokenInterface> {
        const session = await this.redisService.getSessionByUserId(userId);
        if (!session) {
            throw new Error('세션을 찾을 수 없습니다.');
        }

        if (session.refreshToken !== refreshToken) {
            throw new Error('유효하지 않은 리프레시 토큰입니다.');
        }

        if (session.isExpired()) {
            await this.redisService.deleteSessionByUserId(userId);
            throw new Error('만료된 리프레시 토큰입니다.');
        }

        const payload = await this.validateToken(session.accessToken);
        if (!payload.isValid || !payload.payload?.email) {
            throw new Error('세션 정보가 유효하지 않습니다.');
        }

        const newTokens = await this.generateTokens(userId, payload.payload.email);

        session.refresh(
            newTokens.accessToken,
            newTokens.refreshToken,
            new Date(Date.now() + newTokens.expiresIn * 1000)
        );

        await this.redisService.setSession(userId, session);
        return newTokens;
    }

    async validateToken(token: string): Promise<{ isValid: boolean; payload?: any; error?: string }> {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>(JWT_CONSTANTS.ACCESS_SECRET_KEY),
            });

            return {
                isValid: true,
                payload: payload
            };
        } catch (error) {
            return {
                isValid: false,
                error: error.message
            };
        }
    }

    private async generateTokens(userId: string, email: string): Promise<UserTokenInterface> {
        const payload: JwtPayload = {
            sub: userId,
            email: email,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(JWT_CONSTANTS.ACCESS_SECRET_KEY),
                expiresIn: this.configService.get<string>(JWT_CONSTANTS.ACCESS_EXPIRES_IN, '30m'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(JWT_CONSTANTS.REFRESH_SECRET_KEY),
                expiresIn: this.configService.get<string>(JWT_CONSTANTS.REFRESH_EXPIRES_IN, '7d'),
            }),
        ]);

        const expiresIn = TimeUtil.parseToSeconds(
            this.configService.get<string>(JWT_CONSTANTS.ACCESS_EXPIRES_IN, '30m')
        );

        return { accessToken, refreshToken, expiresIn };
    }

}
