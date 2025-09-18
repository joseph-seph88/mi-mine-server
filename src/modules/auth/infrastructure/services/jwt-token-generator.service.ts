import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../../user/domain/entities/user.entity';
import { AuthToken } from '../../domain/interfaces/auth-token.interface';
import { TokenGeneratorInterface } from '../../domain/services/token-generator.interface';
import { JwtPayload } from '../../../../shared/interfaces/jwt-payload.interface';
import { JWT_CONSTANTS } from '../../../../shared/constants/auth.constants';

@Injectable()
export class JwtTokenGenerator implements TokenGeneratorInterface {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) { }

    async generateTokens(user: User): Promise<AuthToken> {
        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            name: user.nickName,
            roles: user.roles,
        };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(JWT_CONSTANTS.ACCESS_SECRET_KEY),
                expiresIn: this.configService.get<string>(JWT_CONSTANTS.ACCESS_EXPIRES_IN, '15m'),
            }),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>(JWT_CONSTANTS.REFRESH_SECRET_KEY),
                expiresIn: this.configService.get<string>(JWT_CONSTANTS.REFRESH_EXPIRES_IN, '7d'),
            }),
        ]);

        const expiresIn = this.parseExpiresIn(
            this.configService.get<string>(JWT_CONSTANTS.ACCESS_EXPIRES_IN, '15m')
        );

        return { accessToken, refreshToken, expiresIn };
    }

    private parseExpiresIn(expiresIn: string): number {
        const match = expiresIn.match(/^(\d+)([smhd])$/);
        if (!match) return 900;

        const value = parseInt(match[1]);
        const unit = match[2];

        switch (unit) {
            case 's': return value;
            case 'm': return value * 60;
            case 'h': return value * 60 * 60;
            case 'd': return value * 24 * 60 * 60;
            default: return 900;
        }
    }
}
