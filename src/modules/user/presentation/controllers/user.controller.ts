import { Controller, Body, Get, Param, HttpException, HttpStatus, HttpCode, Patch, Delete } from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import { UserResponseDto } from '../dtos/user-response.dto';
import { API_TAGS, CONTROLLERS } from '../../../../shared/constants/api.constants';
import { ApiTags } from '@nestjs/swagger';
import { ApiDeleteResponse, ApiGetResponse, ApiUpdateResponse } from 'src/shared/decorators/swagger/api-response.decorator';
import { UserRequestDto } from '../dtos/user-request.dto';

@ApiTags(API_TAGS.USER)
@Controller(CONTROLLERS.USER)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiGetResponse('사용자 조회', UserResponseDto)
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiUpdateResponse('사용자 수정', UserResponseDto)
  async updateUser(@Param('id') id: string, @Body() userRequestDto: UserRequestDto): Promise<UserResponseDto> {
    return await this.userService.updateUser(id, userRequestDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiDeleteResponse('사용자 삭제')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
