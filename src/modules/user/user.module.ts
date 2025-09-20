import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { EntitiesModule } from '../../shared/database/entities/entities.module';
import { CreateUserUseCase } from './domain/usecases/create-user.usecase';
import { UpdateUserUseCase } from './domain/usecases/update-user.usecase';
import { GetUserUseCase } from './domain/usecases/get-user.usecase';
import { DeleteUserUseCase } from './domain/usecases/delete-user.usecase';

@Module({
    imports: [EntitiesModule],
    controllers: [UserController],
    providers: [
        UserService,
        CreateUserUseCase,
        UpdateUserUseCase,
        GetUserUseCase,
        DeleteUserUseCase,
    ],
    exports: [UserService],
})
export class UserModule { }
