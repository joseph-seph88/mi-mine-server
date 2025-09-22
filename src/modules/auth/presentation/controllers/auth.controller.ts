import { Controller, Post, Body, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../../../shared/decorators/public.decorator';
import { ApiCreateResponse, ApiCommonResponses } from '../../../../shared/decorators/swagger/api-response.decorator';
import { AppRoute } from '../../../../shared/enums/common/app-route.enum';
import { API_TAGS, CONTROLLERS } from '../../../../shared/constants/api.constants';
import { AuthService } from '../../application/services/auth.service';
import { RegisterRequestDto } from '../dtos/request/register-request.dto';
import { LoginResponseDto } from '../dtos/response/login-response.dto';
import { LoginRequestDto } from '../dtos/request/login-request.dto';
import { TokenResponseDto } from '../dtos/response/token-response.dto';
import { RefreshTokenRequestDto } from '../dtos/request/refresh-token-request.dto';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';
import { CurrentUser } from 'src/shared/decorators/current-user.decorator';

@ApiTags(API_TAGS.AUTH)
@Controller(CONTROLLERS.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(AppRoute.AUTH_REGISTER)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateResponse('회원가입')
    async register(@Body() registerRequestDto: RegisterRequestDto) {
        await this.authService.register(registerRequestDto);
    }

    @Post(AppRoute.AUTH_LOGIN)
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('로그인', LoginResponseDto)
    async login(@Body() loginRequestDto: LoginRequestDto) {
        return await this.authService.login(loginRequestDto);
    }

    @Post(AppRoute.AUTH_REFRESH)
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('토큰 갱신', TokenResponseDto)
    async refreshToken(@Body() refreshToken: RefreshTokenRequestDto) {
        return await this.authService.refreshToken(refreshToken);
    };

    @Delete(AppRoute.AUTH_DELETE_TOKEN)
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('토큰 삭제')
    async deleteToken(@CurrentUser() tokenData: JwtPayload) {
        await this.authService.deleteToken(tokenData.sub);
    }
}
