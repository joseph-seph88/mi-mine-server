import { User } from '../../../user/domain/entities/user.entity';
import { AuthToken } from '../interfaces/auth-token.interface';

export interface TokenGeneratorInterface {
    generateTokens(user: User): Promise<AuthToken>;
}
