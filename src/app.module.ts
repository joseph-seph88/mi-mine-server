import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggingMiddleware } from './shared/middlewares/logging.middleware';
import { appConfig } from './shared/config/app.config';
import { typeOrmConfigFactory } from './shared/config/typeorm.config';
import { JwtAuthGuard } from './shared/security/guards/jwt-auth.guard';
import { RolesGuard } from './shared/security/guards/roles.guard';
import { PostModule } from './modules/post/post.module';
import { CommunityModule } from './modules/community/community.module';
import { DatabaseModule } from './shared/modules/database.module';
import { RedisModule } from './shared/modules/redis.module';
import { JwtAuthModule } from './shared/modules/jwt-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(appConfig),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfigFactory,
      inject: [ConfigService],
    }),

    JwtAuthModule,
    DatabaseModule,
    RedisModule,
    AuthModule,
    UserModule,
    PostModule,
    CommunityModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
