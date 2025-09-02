import { Injectable, Inject } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository.interface';

export interface CreateUserRequest {
  email: string;
  name: string;
}

export interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    // 비즈니스 로직: 이메일 중복 체크
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // 비즈니스 로직: 사용자 생성
    const user = User.create(
      this.generateId(),
      request.email,
      request.name,
    );

    const savedUser = await this.userRepository.save(user);

    return {
      user: savedUser,
    };
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
