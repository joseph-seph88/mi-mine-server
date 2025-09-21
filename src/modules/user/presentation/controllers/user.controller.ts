import { Controller, Body, Get, HttpStatus, HttpCode, Patch, Delete } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UserResponseDto } from '../dtos/user-response.dto';
import { API_TAGS, CONTROLLERS } from '../../../../shared/constants/api.constants';
import { ApiTags } from '@nestjs/swagger';
import { ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { UserRequestDto } from 'src/shared/dtos/request/user-request.dto';
import { AppRoute } from 'src/shared/enums/common';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@ApiTags(API_TAGS.USER)
@Controller(CONTROLLERS.USER)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(AppRoute.USER_GET_BY_ID)
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('사용자 조회', UserResponseDto)
  async getUserById(@CurrentUser() tokenData: JwtPayload): Promise<UserResponseDto> {
    return await this.userService.getUserById(tokenData.sub);
  }

  @Patch(AppRoute.USER_UPDATE)
  @HttpCode(HttpStatus.OK)
  @ApiUpdateResponse('사용자 수정', UserResponseDto)
  async updateUser(@CurrentUser() tokenData: JwtPayload, @Body() userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    return await this.userService.updateUser(tokenData.sub, userRequestDto);
  }

  @Delete(AppRoute.USER_DELETE)
  @HttpCode(HttpStatus.OK)
  @ApiDeleteResponse('사용자 삭제')
  async deleteUser(@CurrentUser() tokenData: JwtPayload): Promise<void> {
    return await this.userService.deleteUser(tokenData.sub);
  }
}
