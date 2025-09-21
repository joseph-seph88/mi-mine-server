export class PostResponseDto {
    postId: string;
    userId: string;
    userNickName: string;
    userProfileImageUrl: string;
    title: string;  
    content: string;
    image?: string;
    likeCount: number;
    commentCount: number;    
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;

}
