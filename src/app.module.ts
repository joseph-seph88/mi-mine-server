import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { JwtAuthModule } from './shared/auth/jwt-auth.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggingMiddleware } from './shared/middlewares/logging.middleware';
import { appConfig } from './shared/config/app.config';
import { typeOrmConfig } from './shared/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRoot(typeOrmConfig),

    JwtAuthModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
