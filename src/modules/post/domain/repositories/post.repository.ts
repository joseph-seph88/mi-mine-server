import { PostRadiusRequestInterface } from '../interfaces/post-radius-request.interface';
import { PostRequestInterface } from '../interfaces/post-request.interface';
import { PostResponseInterface } from '../interfaces/post-response.interface';

export abstract class PostRepository {
    abstract createPost(data: PostRequestInterface): Promise<PostResponseInterface>;
    abstract getAllPosts(page?: number, limit?: number): Promise<PostResponseInterface[]>;
    abstract getPostsByUserId(userId: string, page?: number, limit?: number): Promise<PostResponseInterface[]>;
    abstract getPostById(postId: number): Promise<PostResponseInterface>;
    abstract updatePost(id: number, data: PostRequestInterface): Promise<PostResponseInterface>;
    abstract deletePost(postId: number): Promise<void>;
    abstract getPostsByRadius(postRadiusRequestInterface: PostRadiusRequestInterface): Promise<PostResponseInterface[]>;
}
