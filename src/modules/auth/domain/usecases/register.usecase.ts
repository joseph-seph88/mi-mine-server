import { Injectable } from '@nestjs/common';
import { AuthUserRepository } from '../repositories/auth-user.repository';
import { RegisterRequestInterface } from '../interfaces/request/register-request.interface';

@Injectable()
export class RegisterUseCase {
    constructor(private readonly authUserRepository: AuthUserRepository) { }

    async execute(request: RegisterRequestInterface): Promise<void> {
        const isSuccess = await this.authUserRepository.registerUser(request);
        if (!isSuccess) {
            throw new Error('회원가입에 실패했습니다.');
        }
    }
}
