import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../domain/entities/post.entity';
import { CreatePostDto } from '../../presentation/dtos/create-post.dto';
import { UpdatePostDto } from '../../presentation/dtos/update-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async create(createPostDto: CreatePostDto, userId: string): Promise<Post> {
    const post = Post.create(
      createPostDto.title,
      createPostDto.content,
      userId,
    );
    return await this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${id}`);
    }
    return post;
  }

  async findByUserId(userId: string): Promise<Post[]> {
    return await this.postRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' }
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.findOne(id);

    if (updatePostDto.title !== undefined && updatePostDto.content !== undefined) {
      post.updateContent(updatePostDto.title, updatePostDto.content);
    }

    return await this.postRepository.save(post);
  }

  async remove(id: string): Promise<void> {
    const result = await this.postRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`게시글을 찾을 수 없습니다. ID: ${id}`);
    }
  }

  async getPostCount(): Promise<number> {
    return await this.postRepository.count();
  }
}
