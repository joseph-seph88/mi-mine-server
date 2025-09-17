import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserRepositoryInterface } from '../../../user/domain/repositories/user.repository.interface';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { AuthToken } from '../entities/auth-token.entity';
import { TokenService } from '../../application/services/token.service';

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface RefreshTokenResponse {
    token: AuthToken;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepositoryInterface,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepositoryInterface,
        private readonly tokenService: TokenService,
    ) { }

    async execute(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        const { refreshToken } = request;

        const session = await this.authRepository.findSessionByRefreshToken(refreshToken);
        if (!session) {
            throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
        }

        if (session.isExpired()) {
            await this.authRepository.deleteSession(session.id);
            throw new UnauthorizedException('만료된 리프레시 토큰입니다.');
        }

        const user = await this.userRepository.findById(session.userId);
        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }

        const newToken = await this.tokenService.generateTokens(user);

        const updatedSession = session.refresh(
            newToken.accessToken,
            newToken.refreshToken,
            new Date(Date.now() + newToken.expiresIn * 1000)
        );

        await this.authRepository.saveSession(updatedSession);

        return {
            token: newToken,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
}
