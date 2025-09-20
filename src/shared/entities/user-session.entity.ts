export class UserSession {
    userId: string;
    accessToken: string;
    refreshToken: string;
    expiresAt: Date;
    createdAt: Date;

    constructor(
        userId: string,
        accessToken: string,
        refreshToken: string,
        expiresAt: Date,
    ) {
        this.userId = userId;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.expiresAt = expiresAt;
        this.createdAt = new Date();
    }

    static fromTokens(userId: string, tokens: { accessToken: string; refreshToken: string; expiresIn: number }): UserSession {
        return new UserSession(
            userId,
            tokens.accessToken,
            tokens.refreshToken,
            new Date(Date.now() + tokens.expiresIn * 1000)
        );
    }

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    refresh(newAccessToken: string, newRefreshToken: string, newExpiresAt: Date): void {
        this.accessToken = newAccessToken;
        this.refreshToken = newRefreshToken;
        this.expiresAt = newExpiresAt;
    }
}
