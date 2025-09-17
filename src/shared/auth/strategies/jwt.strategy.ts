import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { AuthUser } from '../../interfaces/auth-user.interface';
import { AUTH_MESSAGES, JWT_CONSTANTS } from '../../constants/auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>(JWT_CONSTANTS.SECRET_KEY) || 'fallback-secret-key',
        });
    }

    async validate(payload: JwtPayload): Promise<AuthUser> {
        if (!payload.sub || !payload.email) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_PAYLOAD);
        }

        // const user = await this.userService.findById(payload.sub);
        // if (!user) {
        //   throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        // }

        return {
            id: payload.sub,
            email: payload.email,
            name: payload.name || '',
            roles: payload.roles || [],
        };
    }
}
