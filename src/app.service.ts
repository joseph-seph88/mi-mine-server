import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppHealthResponseDto } from './shared/dtos/response/app-health-response.dto';
import { AppInfoResponseDto } from './shared/dtos/response/app-info-response.dto';
@Injectable()
export class AppService {
  constructor(private configService: ConfigService) { }

  async getHealth():Promise<AppHealthResponseDto> {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: Math.floor(process.uptime()),
      memory: process.memoryUsage().heapUsed / 1024 / 1024
    };
  }

  async getInfo():Promise<AppInfoResponseDto> {
    return {
      name: 'MiMine Server',
      version: process.env.npm_package_version || '1.0.0',
      environment: this.configService.get('NODE_ENV') || 'development',
      port: this.configService.get('BASE_PORT') || 3001
    };
  }
}