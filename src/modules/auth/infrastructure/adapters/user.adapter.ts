import { Injectable } from '@nestjs/common';
import { UserPort } from '../../domain/ports/user.port';
import { AuthUserService } from '../services/auth-user.service';
import { User } from '../../../user/domain/entities/user.entity';

@Injectable()
export class UserAdapter implements UserPort {
    constructor(private readonly authUserService: AuthUserService) { }

    async validateUserCredentials(email: string, password: string): Promise<User> {
        return await this.authUserService.validateUserCredentials(email, password);
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.authUserService.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.authUserService.findUserByEmail(email);
    }

    async createUserForAuth(email: string, password: string, nickName: string): Promise<User> {
        return await this.authUserService.createUserForAuth(email, password, nickName);
    }
}
