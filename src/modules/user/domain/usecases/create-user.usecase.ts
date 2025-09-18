import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepositoryInterface } from '../repositories/user.repository.interface';
import { CreateUserRequest } from '../interfaces/request/create-request.interface';
import { UserRole } from 'src/shared/enums/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) { }

  async execute(request: CreateUserRequest): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = User.create(
      crypto.randomUUID(),
      request.email,
      request.nickName,
      '',
      '',
      0,
      0,
      0,
      [UserRole.USER],
    );

    return await this.userRepository.save(user);
  }
}
