import { UpdateUserRequestInterface } from '../interfaces/request/update-request.interface';
import { UserResponseInterface } from '../interfaces/response/user-response.interface';

export abstract class UserRepository {
  abstract getUserById(id: string): Promise<UserResponseInterface>;
  abstract updateUser(id: string, user: UpdateUserRequestInterface): Promise<UserResponseInterface>;
  abstract deleteUser(id: string): Promise<void>;
}
