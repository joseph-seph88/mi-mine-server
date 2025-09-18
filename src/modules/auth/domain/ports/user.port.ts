import { User } from '../../../user/domain/entities/user.entity';

export interface UserPort {
    validateUserCredentials(email: string, password: string): Promise<User>;
    findUserById(id: string): Promise<User | null>;
    findUserByEmail(email: string): Promise<User | null>;
    createUserForAuth(email: string, password: string, nickName: string): Promise<User>;
}
