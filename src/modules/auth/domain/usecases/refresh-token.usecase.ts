import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { UserPort } from '../ports/user.port';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { TokenGeneratorInterface } from '../services/token-generator.interface';
import { RefreshTokenRequest } from '../interfaces/request/refresh-token-request.interface';
import { AuthToken } from '../interfaces/auth-token.interface';

@Injectable()
export class RefreshTokenUseCase {
    constructor(
        @Inject('UserPort')
        private readonly userPort: UserPort,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepositoryInterface,
        @Inject('TokenGenerator')
        private readonly tokenGenerator: TokenGeneratorInterface,
    ) { }

    async execute(request: RefreshTokenRequest): Promise<AuthToken> {
        const { refreshToken } = request;

        const session = await this.authRepository.findSessionByRefreshToken(refreshToken);
        if (!session) {
            throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
        }

        if (session.isExpired()) {
            await this.authRepository.deleteSession(session.id);
            throw new UnauthorizedException('만료된 리프레시 토큰입니다.');
        }

        const user = await this.userPort.findUserById(session.userId);
        if (!user) {
            throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
        }

        const newToken = await this.tokenGenerator.generateTokens(user);

        const updatedSession = session.refresh(
            newToken.accessToken,
            newToken.refreshToken,
            new Date(Date.now() + newToken.expiresIn * 1000)
        );

        await this.authRepository.saveSession(updatedSession);

        return newToken;
    }
}
