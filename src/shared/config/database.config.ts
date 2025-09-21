import { DatabaseConfig } from '../interfaces/database.interface';
import { ConfigService } from '@nestjs/config';

export const databaseConfigFactory = (configService: ConfigService): DatabaseConfig => ({
  host: configService.get<string>('DB_HOST', 'localhost'),
  port: configService.get<number>('DB_PORT', 5432),
  username: configService.get<string>('DB_USER', 'joseph'),
  password: configService.get<string>('DB_PASS', ''),
  database: configService.get<string>('DB_NAME', ''),
});
