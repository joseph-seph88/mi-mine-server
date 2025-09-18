import { Injectable, Inject, UnauthorizedException, ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserUseCase } from '../../domain/usecases/create-user.usecase';
import { CreateUserRequest } from '../../domain/interfaces/request/create-request.interface';
import { UserResponseDto } from '../../presentation/dtos/user-response.dto';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserRole } from '../../../../shared/enums/common/user-role.enum';
import { UpdateUserUseCase } from '../../domain/usecases/update-user.usecase';
import { UpdateUserRequest } from '../../domain/interfaces/request/update-request.interface';
import { DeleteUserUseCase } from '../../domain/usecases/delete-user.usecase';
import { GetUserUseCase } from '../../domain/usecases/get-user.usecase';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) { }

  async createUser(createUserDto: any): Promise<UserResponseDto> {
    const request: CreateUserRequest = {
      email: createUserDto.email,
      nickName: createUserDto.nickName,
    };

    const user = await this.createUserUseCase.execute(request);
    return this.mapUserToResponseDto(user);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this.getUserUseCase.execute(id);
    return this.mapUserToResponseDto(user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }

  async updateUser(id: string, userRequestDto: any): Promise<UserResponseDto> {
    const request: UpdateUserRequest = {
      nickName: userRequestDto.nickName,
      profileImageUrl: userRequestDto.profileImageUrl,
      friendCount: userRequestDto.friendCount,
      followerCount: userRequestDto.followerCount,
      postCount: userRequestDto.postCount,
    };

    const updatedUser = await this.updateUserUseCase.updateProfile(id, request);
    return this.mapUserToResponseDto(updatedUser);
  }

  async validateUserCredentials(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async createUserForAuth(email: string, password: string, nickName: string): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('이미 존재하는 이메일입니다.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create(
      '',
      email,
      nickName,
      hashedPassword,
      '',
      0,
      0,
      0,
      [UserRole.USER]
    );

    return await this.userRepository.save(user);
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
      user.updatedAt,
    );
  }
}
