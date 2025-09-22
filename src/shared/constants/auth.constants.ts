export const JWT_CONSTANTS = {
    SECRET_KEY: 'JWT_SECRET',
    EXPIRES_IN: 'JWT_EXPIRES_IN',
    ACCESS_SECRET_KEY: 'JWT_ACCESS_SECRET',
    REFRESH_SECRET_KEY: 'JWT_REFRESH_SECRET',
    ACCESS_EXPIRES_IN: 'JWT_ACCESS_EXPIRES_IN',
    REFRESH_EXPIRES_IN: 'JWT_REFRESH_EXPIRES_IN',
} as const;

export const AUTH_MESSAGES = {
    INVALID_TOKEN: '유효하지 않은 토큰입니다.',
    TOKEN_EXPIRED: '토큰이 만료되었습니다.',
    TOKEN_NOT_FOUND: '토큰이 없습니다.',
    INVALID_PAYLOAD: '유효하지 않은 토큰 페이로드입니다.',
    UNAUTHORIZED: '인증이 필요합니다.',
} as const;
