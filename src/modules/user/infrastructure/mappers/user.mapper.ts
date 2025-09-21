import { User } from '../../../../shared/entities/user.entity';
import { UserResponseInterface } from '../../domain/interfaces/response/user-response.interface';
import { UpdateUserRequestInterface } from '../../domain/interfaces/request/update-request.interface';
import { UserRequestDto } from '../../../../shared/dtos/request/user-request.dto';

export class UserMapper {
    static toResponseInterface(user: User): UserResponseInterface {
        return {
            id: user.id.toString(),
            email: user.email,
            nickName: user.nickName,
            profileImageUrl: user.profileImageUrl,
            friendCount: user.friendCount,
            followerCount: user.followerCount,
            postCount: user.postCount,
            roles: user.roles,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            deletedAt: user.deletedAt,
            friendIdList: user.friendIdList,
            followerIdList: user.followerIdList,
        };
    }

    static toUserRequestDto(updateRequest: UpdateUserRequestInterface): UserRequestDto {
        return {
            nickName: updateRequest.nickName,
            profileImageUrl: updateRequest.profileImageUrl,
            friendCount: updateRequest.friendCount,
            followerCount: updateRequest.followerCount,
            postCount: updateRequest.postCount,
            friendIdList: updateRequest.friendIdList,
            followerIdList: updateRequest.followerIdList,
        };
    }
}
