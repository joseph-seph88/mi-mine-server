import { Injectable } from '@nestjs/common';
import { AuthTokenRepository } from '../repositories/auth-token.repository';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { LoginRequestInterface } from '../interfaces/request/login-request.interface';
import { LoginResponseInterface } from '../interfaces/response/login-response.interface';

@Injectable()
export class LoginUseCase {
    constructor(
        private readonly authTokenRepository: AuthTokenRepository,
        private readonly authUserRepository: AuthUserRepository,
    ) { }

    async execute(request: LoginRequestInterface): Promise<LoginResponseInterface> {
        const userInfo = await this.authUserRepository.loginUser({ email: request.email, password: request.password });
        const tokenInfo = await this.authTokenRepository.generateAndSaveTokens(userInfo.id, userInfo.email);

        return {
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
            user: userInfo,
        };
    }

}
