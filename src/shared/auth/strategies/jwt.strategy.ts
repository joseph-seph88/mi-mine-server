import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../../interfaces/jwt-payload.interface';
import { UserInfo } from '../../../modules/user/domain/interfaces/response/user-response.interface';
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

    async validate(payload: JwtPayload): Promise<UserInfo> {
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
            nickName: payload.name || '',
            profileImageUrl: '',
            friendCount: 0,
            followerCount: 0,
            postCount: 0,
            roles: payload.roles || [],
        };
    }
}
