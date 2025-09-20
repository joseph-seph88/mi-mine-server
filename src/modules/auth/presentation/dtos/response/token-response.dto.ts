import { UserTokenInterface } from "src/modules/auth/domain/interfaces/types/user-token.interface";

export class TokenResponseDto {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;

    static fromDomainToken(domainToken: UserTokenInterface): TokenResponseDto {
        return {
            accessToken: domainToken.accessToken,
            refreshToken: domainToken.refreshToken,
            expiresIn: domainToken.expiresIn
        };
    }
}