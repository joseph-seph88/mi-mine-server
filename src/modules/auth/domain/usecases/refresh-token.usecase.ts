import { Injectable } from '@nestjs/common';
import { AuthTokenRepository } from '../repositories/auth-token.repository';
import { UserTokenInterface } from '../interfaces/types/user-token.interface';

@Injectable()
export class RefreshTokenUseCase {
    constructor(private readonly authTokenRepository: AuthTokenRepository) { }

    async execute(userId: string, refreshToken: string): Promise<UserTokenInterface> {
        const newToken = await this.authTokenRepository.refreshTokens(userId, refreshToken);
        return newToken;
    }
}
