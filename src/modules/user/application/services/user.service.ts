import { Injectable } from '@nestjs/common';
import { UserResponseDto } from '../../presentation/dtos/user-response.dto';
import { UpdateUserUseCase } from '../../domain/usecases/update-user.usecase';
import { GetUserUseCase } from '../../domain/usecases/get-user.usecase';
import { DeleteUserUseCase } from '../../domain/usecases/delete-user.usecase';
import { UserRequestDto } from 'src/shared/dtos/request/user-request.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) { }

  async getUserById(id: string): Promise<UserResponseDto> {
    return await this.getUserUseCase.execute(id);
  }

  async updateUser(id: string, updateUserDto: UserRequestDto): Promise<UserResponseDto> {
    return await this.updateUserUseCase.updateProfile(id, updateUserDto);
  }

  async deleteUser(id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }
}