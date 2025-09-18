import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../../presentation/dtos/user-response.dto';
import { CreateUserUseCase } from '../../domain/usecases/create-user.usecase';
import { UpdateUserUseCase } from '../../domain/usecases/update-user.usecase';
import { GetUserUseCase } from '../../domain/usecases/get-user.usecase';
import { DeleteUserUseCase } from '../../domain/usecases/delete-user.usecase';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  async createUser(createUserDto: any): Promise<UserResponseDto> {
    return await this.createUserUseCase.execute(createUserDto);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.getUserUseCase.execute(id);
    return this.mapUserToResponseDto(user);
  }

  async updateUser(id: string, updateUserDto: any): Promise<UserResponseDto> {
    const updatedUser = await this.updateUserUseCase.updateProfile(id, updateUserDto);
    return this.mapUserToResponseDto(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${id}`);
    }
  }


  private mapUserToResponseDto(user: User): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.email,
      user.nickName,
      user.profileImageUrl,
      user.friendCount,
      user.followerCount,
      user.postCount,
      user.createdAt,
      user.updatedAt
    );
  }
}