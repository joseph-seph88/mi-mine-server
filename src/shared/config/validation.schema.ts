import * as Joi from 'joi';

export const validationSchema = Joi.object({
    BASE_PORT: Joi.number()
        .min(1)
        .max(65535)
        .default(3001),

    JWT_SECRET: Joi.string()
        .required()
        .description('JWT 서명을 위한 비밀키'),

    JWT_EXPIRES_IN: Joi.string()
        .default('1h')
        .description('JWT 토큰 만료 시간'),
});
