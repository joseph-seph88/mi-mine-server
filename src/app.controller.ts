import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './shared/decorators/public.decorator';
import { Roles } from './shared/decorators/roles.decorator';
import { UserRole, AppRoute } from './shared/enums/common';
import { API_TAGS } from './shared/constants/api.constants';

@ApiTags(API_TAGS.APP)
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
