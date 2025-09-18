import { User } from '../../domain/entities/user.entity';
import { UserResponseDto } from '../dtos/user-response.dto';

export class UserMapper {
  static toResponseDto(user: User): UserResponseDto {
    return new UserResponseDto(
      user.id,
      user.email,
      user.nickName,
      user.createdAt,
      user.updatedAt,
    );
  }

  static toResponseDtoList(users: User[]): UserResponseDto[] {
    return users.map(user => this.toResponseDto(user));
  }
}
