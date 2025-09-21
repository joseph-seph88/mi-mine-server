import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('MiMine API')
    .setDescription('MiMine Server API Documentation')
    .setVersion('0.1.0')
    .addBearerAuth()  // ← Bearer Auth 스키마 정의
    .build();