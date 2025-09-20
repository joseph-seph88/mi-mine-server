import { LoginResponseInterface } from "src/modules/auth/domain/interfaces/response/login-response.interface";
export class LoginResponseDto {
    accessToken: string;
    refreshToken: string;
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