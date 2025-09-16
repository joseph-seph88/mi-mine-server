import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('app-info')
  getInfo() {
    return this.appService.getInfo();
  }

  @Get('app-health')
  getHealth() {
    return this.appService.getHealth();
  }
}
