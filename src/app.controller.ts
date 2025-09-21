import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './shared/decorators/public.decorator';
import { Roles } from './shared/decorators/roles.decorator';
import { UserRole, AppRoute } from './shared/enums/common';
import { API_TAGS, CONTROLLERS } from './shared/constants/api.constants';
import { ApiGetResponse } from './shared/decorators/swagger/api-response.decorator';

@ApiTags(API_TAGS.APP)
@Controller(CONTROLLERS.APP)
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get(AppRoute.INFO)
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('사용자 조회')
  getInfo() {
    return this.appService.getInfo();
  }

  @Get(AppRoute.HEALTH)
  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('서버 상태 조회')
  getHealth() {
    return this.appService.getHealth();
  }
}
