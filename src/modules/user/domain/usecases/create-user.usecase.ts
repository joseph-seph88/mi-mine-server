import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../../shared/entities/user.entity';
import { CreateUserRequest } from '../interfaces/request/create-request.interface';
import { UserRole } from 'src/shared/enums/common';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async execute(request: CreateUserRequest): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: request.email } });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const user = User.create(
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
