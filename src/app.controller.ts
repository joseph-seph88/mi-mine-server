import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './shared/auth/decorators/public.decorator';
import { Roles } from './shared/auth/decorators/roles.decorator';
import { UserRole, AppRoute } from './shared/enums/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(AppRoute.INFO)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  getInfo() {
    return this.appService.getInfo();
  }

  @Get(AppRoute.HEALTH)
  @Public()
  getHealth() {
    return this.appService.getHealth();
  }
}
