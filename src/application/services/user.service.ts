import { Injectable } from '@nestjs/common';
import { CreateUserUseCase, CreateUserRequest } from '../../domain/usecases/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const request: CreateUserRequest = {
      email: createUserDto.email,
      name: createUserDto.name,
    };

    const response = await this.createUserUseCase.execute(request);
    return UserMapper.toResponseDto(response.user);
  }
}
