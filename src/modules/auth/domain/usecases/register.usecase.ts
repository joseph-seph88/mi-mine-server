import { Injectable, Inject } from '@nestjs/common';
import { UserPort } from '../ports/user.port';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { AuthSession } from '../entities/auth-session.entity';
import { TokenGeneratorInterface } from '../services/token-generator.interface';
import { RegisterRequest } from '../interfaces/request/register-request.interface';

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject('UserPort')
        private readonly userPort: UserPort,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepositoryInterface,
        @Inject('TokenGenerator')
        private readonly tokenGenerator: TokenGeneratorInterface,
    ) { }

    async execute(request: RegisterRequest): Promise<void> {
        const { email, password, nickName } = request;

        const savedUser = await this.userPort.createUserForAuth(email, password, nickName);

        const token = await this.tokenGenerator.generateTokens(savedUser);

        const session = AuthSession.create(
            savedUser.id,
            token.accessToken,
            token.refreshToken,
            new Date(Date.now() + token.expiresIn * 1000),
        );

        await this.authRepository.saveSession(session);
    }
}
