import { Injectable } from '@nestjs/common';
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

  async getUserById(id: string): Promise<UserResponseInterface | null> {
    const userData = await this.sharedUserService.getUserById(id);

    if (!userData) {
      return null;
    }

    return UserMapper.toResponseInterface(userData);
  }

  async updateUser(id: string, userData: UpdateUserRequestInterface): Promise<UserResponseInterface | null> {
    const userId = parseInt(id);
    if (isNaN(userId)) {
      throw new Error(`Invalid user ID: ${id}`);
    }

    const userRequestDto = UserMapper.toUserRequestDto(userData);
    const updatedUser = await this.sharedUserService.updateUser(userId, userRequestDto);

    if (!updatedUser) {
      return null;
    }

    return UserMapper.toResponseInterface(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.sharedUserService.deleteUser(id);
  }
}
