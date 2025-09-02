import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { LoggingMiddleware } from './middlewares/logging.middleware';
import { ApplicationModule } from '../application/application.module';

@Module({
  imports: [ApplicationModule],
  controllers: [UserController],
})
export class PresentationModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes('*');
  }
}
