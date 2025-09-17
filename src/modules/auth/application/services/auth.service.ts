import { Injectable } from '@nestjs/common';
import { LoginUseCase, LoginRequest, LoginResponse } from '../../domain/usecases/login.usecase';
import { RegisterUseCase, RegisterRequest, RegisterResponse } from '../../domain/usecases/register.usecase';
import { RefreshTokenUseCase, RefreshTokenRequest, RefreshTokenResponse } from '../../domain/usecases/refresh-token.usecase';

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

    async register(request: RegisterRequest): Promise<RegisterResponse> {
        return this.registerUseCase.execute(request);
    }

    async refreshToken(request: RefreshTokenRequest): Promise<RefreshTokenResponse> {
        return this.refreshTokenUseCase.execute(request);
    }
}
