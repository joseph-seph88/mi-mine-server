import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
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

@ApiTags(API_TAGS.AUTH)
@Controller(CONTROLLERS.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(AppRoute.AUTH_REGISTER)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateResponse('회원가입')
    async register(@Body() registerRequestDto: RegisterRequestDto): Promise<boolean> {
        return await this.authService.register(registerRequestDto);
    }

    @Post(AppRoute.AUTH_LOGIN)
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('로그인', LoginResponseDto)
    async login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
        return await this.authService.login(loginRequestDto);
    }

    @Post(AppRoute.AUTH_REFRESH)
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('토큰 갱신', TokenResponseDto)
    async refreshToken(@Body() refreshToken: RefreshTokenRequestDto): Promise<TokenResponseDto> {
        return await this.authService.refreshToken(refreshToken);
    };
}
