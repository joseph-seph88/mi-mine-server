import { Module } from '@nestjs/common';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { UpdateUserUseCase } from './domain/usecases/update-user.usecase';
import { GetUserUseCase } from './domain/usecases/get-user.usecase';
import { DeleteUserUseCase } from './domain/usecases/delete-user.usecase';
import { UserRepository } from './domain/repositories/user.repository';
import { UserRepositoryImpl } from './infrastructure/repositories/user.repository.impl';
@Module({
    imports: [],
    controllers: [UserController],
    providers: [
        UserService,

        UpdateUserUseCase,
        GetUserUseCase,
        DeleteUserUseCase,

        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },
    ],
    exports: [UserService],
})
export class UserModule { }
