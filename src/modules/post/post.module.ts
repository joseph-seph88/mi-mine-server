import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './presentation/controllers/post.controller';
import { PostService } from './application/services/post.service';
import { PostEntity } from './infrastructure/entities/post.entity';
import { GetAllPostsUseCase } from './domain/usecases/get-all-post.usecase';
import { CreatePostUseCase } from './domain/usecases/create-post.usecase';
import { GetPostByUserIdUseCase } from './domain/usecases/get-post-by-user-id.usecase';
import { GetPostByIdUseCase } from './domain/usecases/get-post-by-id.usecase';
import { DeletePostUseCase } from './domain/usecases/delete-post.usecase';
import { UpdatePostUseCase } from './domain/usecases/update-post.usecase';
import { PostRepositoryImpl } from './infrastructure/repositories/post.repository.impl';
import { PostRepository } from './domain/repositories/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  controllers: [PostController],
  providers: [
    PostService,

    CreatePostUseCase,
    GetAllPostsUseCase,
    GetPostByUserIdUseCase,
    GetPostByIdUseCase,
    UpdatePostUseCase,
    DeletePostUseCase,

    {
      provide: PostRepository,
      useClass: PostRepositoryImpl,
    },
    
  ],
  exports: [PostService],
})
export class PostModule { }
