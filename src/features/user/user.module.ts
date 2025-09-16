import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { CreateUserUsecase } from './domain/usecases/create-user.usecase';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UserRepositoryInterface } from './domain/repositories/user.repository.interface';

@Module({
    controllers: [UserController],
    providers: [
        UserService,
        CreateUserUsecase,
        {
            provide: UserRepositoryInterface,
            useClass: UserRepository,
        },
    ],
    exports: [UserService],
})
export class UserModule { }
