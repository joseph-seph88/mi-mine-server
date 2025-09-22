export interface LoginResponseInterface {
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
}