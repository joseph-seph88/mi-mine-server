import { Injectable, Inject, UnauthorizedException, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserUseCase, CreateUserRequest } from '../../domain/usecases/create-user.usecase';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserResponseDto } from '../dtos/user-response.dto';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';
import { UserRole } from '../../../../shared/enums/common/user-role.enum';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    @Inject('UserRepository')
    private readonly userRepository: UserRepositoryInterface,
  ) { }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const request: CreateUserRequest = {
      email: createUserDto.email,
      name: createUserDto.name,
    };

    const response = await this.createUserUseCase.execute(request);
    return UserMapper.toResponseDto(response.user);
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

  async findUserById(id: string): Promise<User | null> {
    return await this.userRepository.findById(id);
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
}
