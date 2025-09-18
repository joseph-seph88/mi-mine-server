export interface LoginResponse {
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
    };
}