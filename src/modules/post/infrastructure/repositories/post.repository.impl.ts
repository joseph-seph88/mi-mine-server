import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getDistance } from 'geolib';
import { PostEntity } from '../entities/post.entity';
import { PostRepository } from '../../domain/repositories/post.repository';
import { PostRequestInterface } from '../../domain/interfaces/post-request.interface';
import { PostResponseInterface } from '../../domain/interfaces/post-response.interface';
import { PostRadiusRequestInterface } from '../../domain/interfaces/post-radius-request.interface';

@Injectable()
export class PostRepositoryImpl implements PostRepository {
    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ) { }

    async createPost(data: PostRequestInterface): Promise<PostResponseInterface> {
        const entity = PostEntity.fromRequestData(data);
        const savedEntity = await this.postRepository.save(entity);
        return savedEntity.toInterface();
    }

    async getAllPosts(page?: number, limit?: number): Promise<PostResponseInterface[]> {
        const actualPage = page ?? 1;
        const actualLimit = limit ?? 10;
        const entities = await this.postRepository.find({
            order: { createdAt: 'DESC' },
            skip: (actualPage - 1) * actualLimit,
            take: limit,
        });
        return entities.map(entity => entity.toInterface());
    }

    async getPostsByUserId(userId: string, page?: number, limit?: number): Promise<PostResponseInterface[]> {
        const actualPage = page ?? 1;
        const actualLimit = limit ?? 10;
        const entities = await this.postRepository.find({
            where: { userId },
            order: { createdAt: 'DESC' },
            skip: (actualPage - 1) * actualLimit,
            take: actualLimit,
        });
        return entities.map(entity => entity.toInterface());
    }

    async getPostById(postId: number, includeComments?: boolean, commentLimit?: number): Promise<PostResponseInterface> {
        const postEntity = await this.postRepository.findOne({ where: { postId: postId } });

        if (!postEntity) {
            throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${postId}`);
        }

        return postEntity.toInterface();
    }

    async updatePost(postId: number, postData: PostRequestInterface): Promise<PostResponseInterface> {
        const postEntity = await this.postRepository.findOne({ where: { postId: postId } });

        if (!postEntity) {
            throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${postId}`);
        }

        if (postData.title !== undefined) postEntity.title = postData.title;
        if (postData.content !== undefined) postEntity.content = postData.content;
        if (postData.imageUrl !== undefined) postEntity.imageUrl = postData.imageUrl;


        const updatedEntity = await this.postRepository.save(postEntity);
        return updatedEntity.toInterface();
    }

    async deletePost(postId: number): Promise<void> {
        const result = await this.postRepository.softDelete(postId);

        if (result.affected === 0) {
            throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${postId}`);
        }
    }

    async getPostsByRadius(postRadiusRequestInterface: PostRadiusRequestInterface, page?: number, limit?: number): Promise<PostResponseInterface[]> {
        const { latitude, longitude, zoom, searchRadius } = postRadiusRequestInterface;
        const actualPage = page ?? 1;
        const actualLimit = limit ?? 10;

        const nearbyPosts = await this.postRepository
            .createQueryBuilder('post')
            .where('post.latitude IS NOT NULL AND post.longitude IS NOT NULL')
            .skip((actualPage - 1) * actualLimit)
            .take(actualLimit)
            .getMany();

        const postsWithDistance = nearbyPosts
            .map(post => {
                let distance = Infinity;

                if (post.latitude && post.longitude) {
                    distance = getDistance(
                        { latitude, longitude },
                        { latitude: post.latitude, longitude: post.longitude }
                    );
                }

                return { post, distance };
            })
            .filter(item => item.distance <= searchRadius)
            .sort((a, b) => a.distance - b.distance);

        return postsWithDistance.map(item => item.post.toInterface());
    }
}
