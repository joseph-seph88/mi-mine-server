import { Injectable } from '@nestjs/common';
import { UserPort } from '../../domain/ports/user.port';
import { UserService } from '../../../user/application/services/user.service';
import { User } from '../../../user/domain/entities/user.entity';

@Injectable()
export class UserAdapter implements UserPort {
    constructor(private readonly userService: UserService) { }

    async validateUserCredentials(email: string, password: string): Promise<User> {
        return await this.userService.validateUserCredentials(email, password);
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.userService.findUserById(id);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userService.findUserByEmail(email);
    }

    async createUserForAuth(email: string, password: string, nickName: string): Promise<User> {
        return await this.userService.createUserForAuth(email, password, nickName);
    }
}
