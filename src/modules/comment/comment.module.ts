import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './presentation/controllers/comment.controller';
import { CommentService } from './application/services/comment.service';
import { CommentEntity } from './infrastructure/entities/comment.entity';
import { CreateCommentUseCase } from './domain/usecases/create-comment.usecase';
import { GetCommentsByPostIdUseCase } from './domain/usecases/get-comments-by-post-id.usecase';
import { GetCommentsByUserIdUseCase } from './domain/usecases/get-comments-by-user-id.usecase';
import { GetCommentByIdUseCase } from './domain/usecases/get-comment-by-id.usecase';
import { UpdateCommentUseCase } from './domain/usecases/update-comment.usecase';
import { DeleteCommentUseCase } from './domain/usecases/delete-comment.usecase';
import { GetRepliesByCommentIdUseCase } from './domain/usecases/get-replies-by-comment-id.usecase';
import { CommentRepositoryImpl } from './infrastructure/repositories/comment.repository.impl';
import { CommentRepository } from './domain/repositories/comment.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CommentEntity])],
    controllers: [CommentController],
    providers: [
        CommentService,

        CreateCommentUseCase,
        GetCommentsByPostIdUseCase,
        GetCommentsByUserIdUseCase,
        GetCommentByIdUseCase,
        UpdateCommentUseCase,
        DeleteCommentUseCase,
        GetRepliesByCommentIdUseCase,

        {
            provide: CommentRepository,
            useClass: CommentRepositoryImpl,
        },
    ],
    exports: [CommentService],
})
export class CommentModule { }
