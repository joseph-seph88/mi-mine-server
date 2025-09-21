import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { RegisterUseCase } from './domain/usecases/register.usecase';
import { RefreshTokenUseCase } from './domain/usecases/refresh-token.usecase';
import { JwtAuthModule } from '../../shared/modules/jwt-auth.module';
import { AuthTokenRepositoryImpl } from './infrastructure/repositories/auth-token.repository.impl';
import { AuthUserRepositoryImpl } from './infrastructure/repositories/auth-user.repository.impl';
import { DeleteTokenUseCase } from './domain/usecases/delete-token.usecase';
import { AuthTokenRepository } from './domain/repositories/auth-token.repository';
import { AuthUserRepository } from './domain/repositories/auth-user.repository';
@Module({
    imports: [
        ConfigModule,
        JwtAuthModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,

        LoginUseCase,
        RegisterUseCase,
        RefreshTokenUseCase,
        DeleteTokenUseCase,

        {
            provide: AuthTokenRepository,
            useClass: AuthTokenRepositoryImpl,
        },
        {
            provide: AuthUserRepository,
            useClass: AuthUserRepositoryImpl,
        },
    ],
    exports: [AuthService],
})
export class AuthModule { }
