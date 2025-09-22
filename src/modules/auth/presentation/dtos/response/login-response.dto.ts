import { ApiProperty } from "@nestjs/swagger";
import { LoginResponseInterface } from "src/modules/auth/domain/interfaces/response/login-response.interface";
export class LoginResponseDto {
    @ApiProperty({ description: '액세스 토큰', example: 'accessToken' })
    accessToken: string;

    @ApiProperty({ description: '리프레시 토큰', example: 'refreshToken' })
    refreshToken: string;

    @ApiProperty({ description: '사용자', example: {
        id: '1',
        email: 'test@example.com',
        nickName: 'test',
        profileImageUrl: 'https://example.com/profile.jpg',
        friendCount: 0,
        followerCount: 0,
        postCount: 0,
        friendIdList: [],
        followerIdList: [],
        roles: []
    } })
    user: {
        id: string;
        email: string;
        nickName: string;
        profileImageUrl: string;
        friendCount: number;
        followerCount: number;
        postCount: number;
        friendIdList: string[];
        followerIdList: string[];
        roles: string[];
    };

    static fromDomainResponse(domainResponse: LoginResponseInterface): LoginResponseDto {
        return {
            accessToken: domainResponse.accessToken,
            refreshToken: domainResponse.refreshToken,
            user: {
                id: domainResponse.user.id,
                email: domainResponse.user.email,
                nickName: domainResponse.user.nickName,
                profileImageUrl: domainResponse.user.profileImageUrl,
                friendCount: domainResponse.user.friendCount,
                followerCount: domainResponse.user.followerCount,
                postCount: domainResponse.user.postCount,
                friendIdList: [],
                followerIdList: [],
                roles: []
            }
        };
    }
}