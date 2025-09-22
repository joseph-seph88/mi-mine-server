import { Injectable } from '@nestjs/common';
import { LoginUseCase } from '../../domain/usecases/login.usecase';
import { RegisterUseCase } from '../../domain/usecases/register.usecase';
import { RefreshTokenUseCase } from '../../domain/usecases/refresh-token.usecase';
import { LoginRequestDto } from '../../presentation/dtos/request/login-request.dto';
import { LoginResponseDto } from '../../presentation/dtos/response/login-response.dto';
import { TokenResponseDto } from '../../presentation/dtos/response/token-response.dto';
import { RegisterRequestDto } from '../../presentation/dtos/request/register-request.dto';
import { RefreshTokenRequestDto } from '../../presentation/dtos/request/refresh-token-request.dto';
import { DeleteTokenUseCase } from '../../domain/usecases/delete-token.usecase';

@Injectable()
export class AuthService {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
        private readonly refreshTokenUseCase: RefreshTokenUseCase,
        private readonly deleteTokenUseCase: DeleteTokenUseCase,
    ) { }

    async register(request: RegisterRequestDto): Promise<void> {
        await this.registerUseCase.execute(request);
    }

    async login(request: LoginRequestDto): Promise<LoginResponseDto> {
        const domainResponse = await this.loginUseCase.execute(request);
        return LoginResponseDto.fromDomainResponse(domainResponse);
    }

    async refreshToken(request: RefreshTokenRequestDto): Promise<TokenResponseDto> {
        const domainToken = await this.refreshTokenUseCase.execute(request.userId, request.refreshToken);
        return TokenResponseDto.fromDomainToken(domainToken);
    }

    async deleteToken(userId: string): Promise<void> {
        await this.deleteTokenUseCase.execute(userId);
    }
}
