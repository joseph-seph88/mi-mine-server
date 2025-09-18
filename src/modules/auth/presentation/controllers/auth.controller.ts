import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../dtos/request/login.dto';
import { RegisterDto } from '../dtos/request/register.dto';
import { LoginResponseDto } from '../dtos/response/login-response.dto';
import { Public } from '../../../../shared/decorators/public.decorator';
import { ApiCreateResponse, ApiCommonResponses } from '../../../../shared/decorators/swagger/api-response.decorator';
import { AppRoute } from '../../../../shared/enums/common/app-route.enum';
import { API_TAGS, CONTROLLERS } from '../../../../shared/constants/api.constants';
import { RefreshResponseDto } from '../dtos/response/refresh-response.dto';
import { RefreshTokenDto } from '../dtos/request/refresh-token.dto';

@ApiTags(API_TAGS.AUTH)
@Controller(CONTROLLERS.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(AppRoute.AUTH_REGISTER)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateResponse('회원가입')
    async register(@Body() registerDto: RegisterDto): Promise<void> {
        await this.authService.register(registerDto);
    }

    @Post(AppRoute.AUTH_LOGIN)
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('로그인', LoginResponseDto)
    async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
        return await this.authService.login(loginDto);
    }

    @Post(AppRoute.AUTH_REFRESH)
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('토큰 갱신', RefreshResponseDto)
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto): Promise<RefreshResponseDto> {
        return await this.authService.refreshToken({ refreshToken: refreshTokenDto.refreshToken });
    };
}
