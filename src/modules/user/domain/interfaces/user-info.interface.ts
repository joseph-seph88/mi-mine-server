export interface UserInfo {
    id: string;
    email: string;
    nickName: string;
    profileImageUrl: string;
    friendCount: number;
    followerCount: number;
    postCount: number;
    roles?: string[];
}
