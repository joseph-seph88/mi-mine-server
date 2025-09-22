import { Controller, Body, Get, HttpStatus, HttpCode, Patch, Delete } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UserResponseDto } from '../dtos/user-response.dto';
import { API_TAGS, CONTROLLERS } from '../../../../shared/constants/api.constants';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { UserRequestDto } from 'src/shared/dtos/request/user-request.dto';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@ApiTags(API_TAGS.USER)
@ApiBearerAuth()
@Controller(CONTROLLERS.USER)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('사용자 조회', UserResponseDto)
  async getUserById(@CurrentUser() tokenData: JwtPayload){
    return await this.userService.getUserById(tokenData.sub);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiUpdateResponse('사용자 수정', UserResponseDto)
  async updateUser(
    @CurrentUser() tokenData: JwtPayload, 
    @Body() userRequestDto: UserRequestDto
  ) {
    return await this.userService.updateUser(tokenData.sub, userRequestDto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @ApiDeleteResponse('사용자 삭제')
  async deleteUser(@CurrentUser() tokenData: JwtPayload) {
    return await this.userService.deleteUser(tokenData.sub);
  }
}
