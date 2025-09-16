import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { swaggerConfig } from './shared/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('BASE_PORT', 3001);

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  const baseUrl = configService.get('BASE_URL', 'http://localhost');
  logger.log(`Server Running :: ${baseUrl}`);
  logger.log(`Swagger Running :: ${baseUrl}/api`);

}
bootstrap();