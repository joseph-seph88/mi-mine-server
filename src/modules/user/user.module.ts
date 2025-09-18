import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { CreateUserUseCase } from './domain/usecases/create-user.usecase';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserRepositoryInterface } from './domain/repositories/user.repository.interface';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        CreateUserUseCase,
        {
            provide: 'UserRepository',
            useClass: UserRepository,
        },
    ],
    exports: [
        UserService,
    ],
})
export class UserModule { }
