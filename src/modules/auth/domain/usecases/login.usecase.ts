import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../../user/domain/repositories/user.repository.interface';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { AuthToken } from '../entities/auth-token.entity';
import { AuthSession } from '../entities/auth-session.entity';
import { TokenService } from '../../application/services/token.service';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: AuthToken;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

@Injectable()
export class LoginUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepositoryInterface,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepositoryInterface,
        private readonly tokenService: TokenService,
    ) { }

    async execute(request: LoginRequest): Promise<LoginResponse> {
        const { email, password } = request;

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        await this.authRepository.deleteSessionsByUserId(user.id);

        const token = await this.tokenService.generateTokens(user);

        const session = AuthSession.create(
            this.generateId(),
            user.id,
            token.accessToken,
            token.refreshToken,
            new Date(Date.now() + token.expiresIn * 1000),
        );

        await this.authRepository.saveSession(session);

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
