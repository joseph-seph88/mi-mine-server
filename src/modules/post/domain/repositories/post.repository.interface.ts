import { Post } from '../entities/post.entity';

export interface PostRepositoryInterface {
    save(post: Post): Promise<Post>;
    findById(id: string): Promise<Post | null>;
    findAll(): Promise<Post[]>;
    findByUserId(userId: string): Promise<Post[]>;
    update(id: string, post: Partial<Post>): Promise<Post | null>;
    softDelete(id: string): Promise<boolean>;
    count(): Promise<number>;
}
