export interface PostResponseInterface {
    postId: number;
    title: string;
    content: string;
    imageUrl: string;
    userId: string;
    likeCount: number;
    commentCount: number;
    createdAt: Date;
    updatedAt: Date;
    latitude?: number;
    longitude?: number;
    comments?: any[];
}