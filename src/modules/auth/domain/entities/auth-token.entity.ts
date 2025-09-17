export class AuthToken {
    constructor(
        public readonly accessToken: string,
        public readonly refreshToken: string,
        public readonly expiresIn: number,
    ) { }

    static create(
        accessToken: string,
        refreshToken: string,
        expiresIn: number,
    ): AuthToken {
        return new AuthToken(accessToken, refreshToken, expiresIn);
    }
}
