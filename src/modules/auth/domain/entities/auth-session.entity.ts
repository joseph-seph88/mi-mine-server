export class AuthSession {
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly accessToken: string,
        public readonly refreshToken: string,
        public readonly expiresAt: Date,
        public readonly createdAt: Date,
    ) { }

    static create(
        id: string,
        userId: string,
        accessToken: string,
        refreshToken: string,
        expiresAt: Date,
    ): AuthSession {
        return new AuthSession(
            id,
            userId,
            accessToken,
            refreshToken,
            expiresAt,
            new Date(),
        );
    }

    isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    refresh(newAccessToken: string, newRefreshToken: string, newExpiresAt: Date): AuthSession {
        return new AuthSession(
            this.id,
            this.userId,
            newAccessToken,
            newRefreshToken,
            newExpiresAt,
            this.createdAt,
        );
    }
}
