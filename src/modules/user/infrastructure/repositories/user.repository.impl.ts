import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UpdateUserRequestInterface } from '../../domain/interfaces/request/update-request.interface';
import { UserResponseInterface } from '../../domain/interfaces/response/user-response.interface';
import { SharedUserService } from 'src/shared/services/shared-user.service';
import { UserMapper } from '../mappers/user.mapper';

@Injectable()
export class UserRepositoryImpl extends UserRepository {
  constructor(
    private readonly sharedUserService: SharedUserService,
  ) {
    super();
  }

  async getUserById(id: string): Promise<UserResponseInterface> {
    const userData = await this.sharedUserService.getUserById(id);

    if (!userData) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return UserMapper.toResponseInterface(userData);
  }

  async updateUser(id: string, userData: UpdateUserRequestInterface): Promise<UserResponseInterface> {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error(`사용자 ID가 유효하지 않습니다. ID: ${id}`);
    }

    const userRequestDto = UserMapper.toUserRequestDto(userData);
    const updatedUser = await this.sharedUserService.updateUser(userId, userRequestDto);

    if (!updatedUser) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return UserMapper.toResponseInterface(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.sharedUserService.deleteUser(id);
  }
}
