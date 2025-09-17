import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { AuthResponseDto, RefreshTokenDto } from '../../application/dtos/auth-response.dto';
import { Public } from '../../../../shared/decorators/public.decorator';
import { ApiCreateResponse, ApiCommonResponses } from '../../../../shared/decorators/swagger/api-response.decorator';
import { AppRoute } from '../../../../shared/enums/common/app-route.enum';
import { API_TAGS, CONTROLLERS } from '../../../../shared/constants/api.constants';

@ApiTags(API_TAGS.AUTH)
@Controller(CONTROLLERS.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post(AppRoute.AUTH_REGISTER)
    @Public()
    @HttpCode(HttpStatus.CREATED)
    @ApiCreateResponse('회원가입', AuthResponseDto)
    async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
        const result = await this.authService.register(registerDto);
        return {
            accessToken: result.token.accessToken,
            refreshToken: result.token.refreshToken,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                roles: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        };
    }

    @Post(AppRoute.AUTH_LOGIN)
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('로그인', AuthResponseDto)
    async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
        const result = await this.authService.login(loginDto);
        return {
            accessToken: result.token.accessToken,
            refreshToken: result.token.refreshToken,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                roles: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        };
    }

    @Post(AppRoute.AUTH_REFRESH)
    @Public()
    @HttpCode(HttpStatus.OK)
    @ApiCommonResponses('토큰 갱신', AuthResponseDto)
    async refresh(@Body() refreshTokenDto: RefreshTokenDto): Promise<AuthResponseDto> {
        const result = await this.authService.refreshToken({ refreshToken: refreshTokenDto.refreshToken });
        return {
            accessToken: result.token.accessToken,
            refreshToken: result.token.refreshToken,
            user: {
                id: result.user.id,
                email: result.user.email,
                name: result.user.name,
                roles: undefined,
                createdAt: undefined,
                updatedAt: undefined,
            },
        };
    }
}
