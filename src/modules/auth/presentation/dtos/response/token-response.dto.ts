import { ApiProperty } from "@nestjs/swagger";
import { UserTokenInterface } from "src/modules/auth/domain/interfaces/types/user-token.interface";

export class TokenResponseDto {
    @ApiProperty({ description: '액세스 토큰', example: 'accessToken' })
    accessToken: string;

    @ApiProperty({ description: '리프레시 토큰', example: 'refreshToken' })
    refreshToken: string;

    @ApiProperty({ description: '만료 시간', example: 3600 })
    expiresIn: number;

    static fromDomainToken(domainToken: UserTokenInterface): TokenResponseDto {
        return {
            accessToken: domainToken.accessToken,
            refreshToken: domainToken.refreshToken,
            expiresIn: domainToken.expiresIn
        };
    }
}