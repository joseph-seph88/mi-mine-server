import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../domain/usecases/login.usecase';
import { RegisterUseCase } from '../../domain/usecases/register.usecase';
import { RefreshTokenUseCase } from '../../domain/usecases/refresh-token.usecase';
import { LoginRequest } from '../../domain/interfaces/request/login-request.interface';
import { LoginResponse } from '../../domain/interfaces/response/login-response.interface';
import { RegisterRequest } from '../../domain/interfaces/request/register-request.interface';
import { RefreshTokenRequest } from '../../domain/interfaces/request/refresh-token-request.interface';
import { AuthToken } from '../../domain/interfaces/auth-token.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
    ) { }

    async login(request: LoginRequest): Promise<LoginResponse> {
        return this.loginUseCase.execute(request);
    }

    async register(request: RegisterRequest): Promise<void> {
        await this.registerUseCase.execute(request);
    }

    async refreshToken(request: RefreshTokenRequest): Promise<AuthToken> {
        return this.refreshTokenUseCase.execute(request);
    }
}
