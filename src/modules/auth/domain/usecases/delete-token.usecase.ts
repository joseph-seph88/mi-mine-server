import { Injectable } from '@nestjs/common';
import { AuthTokenRepository } from '../repositories/auth-token.repository';
import { UserTokenInterface } from '../interfaces/types/user-token.interface';

@Injectable()
export class DeleteTokenUseCase {
    constructor(private readonly authTokenRepository: AuthTokenRepository) { }

    async execute(userId: string): Promise<void> {
        await this.authTokenRepository.deleteSessionsByUserId(userId);
    }
}
