import { Injectable, Inject } from '@nestjs/common';
import { UserPort } from '../ports/user.port';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { AuthSession } from '../entities/auth-session.entity';
import { TokenGeneratorInterface } from '../services/token-generator.interface';
import { LoginRequest } from '../interfaces/request/login-request.interface';
import { LoginResponse } from '../interfaces/response/login-response.interface';

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UserPort')
        private readonly userPort: UserPort,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepositoryInterface,
        @Inject('TokenGenerator')
        private readonly tokenGenerator: TokenGeneratorInterface,
    ) { }

    async execute(request: LoginRequest): Promise<LoginResponse> {
        const { email, password } = request;

        const user = await this.userPort.validateUserCredentials(email, password);

        await this.authRepository.deleteSessionsByUserId(user.id);

        const token = await this.tokenGenerator.generateTokens(user);

        const session = AuthSession.create(
            user.id,
            token.accessToken,
            token.refreshToken,
            new Date(Date.now() + token.expiresIn * 1000),
        );

        await this.authRepository.saveSession(session);

        return {
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                nickName: user.nickName,
                profileImageUrl: user.profileImageUrl,
                friendCount: user.friendCount,
                followerCount: user.followerCount,
                postCount: user.postCount,
            },
        };
    }

}
