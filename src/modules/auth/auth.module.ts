import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/services/auth.service';
import { JwtTokenGenerator } from './infrastructure/services/jwt-token-generator.service';
import { LoginUseCase } from './domain/usecases/login.usecase';
import { RegisterUseCase } from './domain/usecases/register.usecase';
import { RefreshTokenUseCase } from './domain/usecases/refresh-token.usecase';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { UserAdapter } from './infrastructure/adapters/user.adapter';
import { AuthUserService } from './infrastructure/services/auth-user.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/domain/entities/user.entity';
import { JwtAuthModule } from '../../shared/auth/jwt-auth.module';

@Module({
    imports: [
        ConfigModule,
        JwtAuthModule,
        UserModule,
        TypeOrmModule.forFeature([User]),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthUserService,

        LoginUseCase,
        RegisterUseCase,
        RefreshTokenUseCase,

        {
            provide: 'AuthRepository',
            useClass: AuthRepository,
        },
        {
            provide: 'TokenGenerator',
            useClass: JwtTokenGenerator,
        },
        {
            provide: 'UserPort',
            useClass: UserAdapter,
        },
    ],
    exports: [AuthService],
})
export class AuthModule { }
