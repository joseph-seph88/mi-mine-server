import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
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

    async validate(payload: JwtPayload): Promise<JwtPayload> {
        if (!payload.sub || !payload.email) {
            throw new UnauthorizedException(AUTH_MESSAGES.INVALID_PAYLOAD);
        }

        return payload;
    }
}
