export interface UserResponseInterface {
    id: string;
    email: string;
    nickName: string;
    profileImageUrl: string;
    friendCount: number;
    followerCount: number;
    postCount: number;
    roles?: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    friendIdList: string[];
    followerIdList: string[];
}