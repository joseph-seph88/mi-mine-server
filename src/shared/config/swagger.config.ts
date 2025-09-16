import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
    .setTitle('MiMine API')
    .setDescription('MiMine Server API Documentation')
    .setVersion('1.0')
    .addTag('mimine')
    .build();