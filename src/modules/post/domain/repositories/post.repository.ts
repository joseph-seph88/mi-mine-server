import { Post } from '../entities/post.entity';

export abstract class PostRepository {
    abstract createPost(post: Post): Promise<Post>;
    abstract getAllPosts(page: number, limit: number): Promise<Post[]>;
    abstract getPostsByUserId(userId: string, page?: number, limit?: number): Promise<Post[]>;
    abstract getPostById(postId: number): Promise<Post>;
    abstract updatePost(id: number, post: Partial<Post>): Promise<Post | null>;
    abstract deletePost(id: number): Promise<boolean>;
}
