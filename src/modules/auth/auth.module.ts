import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { TokenService } from './application/services/token.service';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { RegisterUseCase } from './domain/usecases/register.usecase';
import { RefreshTokenUseCase } from './domain/usecases/refresh-token.usecase';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { UserModule } from '../user/user.module';

@Module({
    imports: [
        ConfigModule,
        JwtModule.register({}), 
        UserModule, 
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokenService,

        LoginUseCase,
        RegisterUseCase,
        RefreshTokenUseCase,

        {
            provide: 'AuthRepository',
            useClass: AuthRepository,
        },
    ],
    exports: [AuthService],
})
export class AuthModule { }
