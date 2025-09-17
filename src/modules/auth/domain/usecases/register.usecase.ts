import { Injectable, ConflictException, Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepositoryInterface } from '../../../user/domain/repositories/user.repository.interface';
import { AuthRepositoryInterface } from '../repositories/auth.repository.interface';
import { User } from '../../../user/domain/entities/user.entity';
import { AuthToken } from '../entities/auth-token.entity';
import { AuthSession } from '../entities/auth-session.entity';
import { TokenService } from '../../application/services/token.service';
import { UserRole } from '../../../../shared/enums/common/user-role.enum';

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface RegisterResponse {
    token: AuthToken;
    user: {
        id: string;
        email: string;
        name: string;
    };
}

@Injectable()
export class RegisterUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepositoryInterface,
        @Inject('AuthRepository')
        private readonly authRepository: AuthRepositoryInterface,
        private readonly tokenService: TokenService,
    ) { }

    async execute(request: RegisterRequest): Promise<RegisterResponse> {
        const { email, password, name } = request;

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.create(
            this.generateId(),
            email,
            name,
            hashedPassword,
            [UserRole.USER]
        );

        const savedUser = await this.userRepository.save(user);

        const token = await this.tokenService.generateTokens(savedUser);

        const session = AuthSession.create(
            this.generateId(),
            savedUser.id,
            token.accessToken,
            token.refreshToken,
            new Date(Date.now() + token.expiresIn * 1000),
        );

        await this.authRepository.saveSession(session);

        return {
            token,
            user: {
                id: savedUser.id,
                email: savedUser.email,
                name: savedUser.name,
            },
        };
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}
