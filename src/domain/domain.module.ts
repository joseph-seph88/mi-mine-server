import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './usecases/create-user.usecase';
import { UserRepository } from '../infrastructure/repositories/user.repository';

@Module({
    providers: [
        CreateUserUseCase,
        UserRepository,
        {
            provide: 'UserRepository',
            useExisting: UserRepository,
        },
    ],
    exports: [CreateUserUseCase],
})
export class DomainModule { }
