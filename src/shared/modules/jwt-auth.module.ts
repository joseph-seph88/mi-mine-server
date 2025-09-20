import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_CONSTANTS } from '../constants/auth.constants';
import { JwtAuthGuard } from '../security/guards/jwt-auth.guard';
import { JwtStrategy } from '../security/strategies/jwt.strategy';
import { RolesGuard } from '../security/guards/roles.guard';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>(JWT_CONSTANTS.SECRET_KEY),
                signOptions: {
                    expiresIn: configService.get<string>(JWT_CONSTANTS.EXPIRES_IN, '1h'),
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [JwtStrategy, JwtAuthGuard, RolesGuard],
    exports: [JwtAuthGuard, RolesGuard, JwtModule],
})
export class JwtAuthModule { }
