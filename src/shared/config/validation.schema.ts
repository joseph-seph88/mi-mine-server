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

    // Database configuration
    DB_HOST: Joi.string()
        .default('localhost')
        .description('Database host'),

    DB_PORT: Joi.number()
        .min(1)
        .max(65535)
        .default(5432)
        .description('Database port'),

    DB_USER: Joi.string()
        .required()
        .description('Database user'),

    DB_PASS: Joi.string()
        .allow('')
        .default('')
        .description('Database password'),

    DB_NAME: Joi.string()
        .required()
        .description('Database name'),

    // Redis configuration
    REDIS_HOST: Joi.string()
        .default('localhost')
        .description('Redis host'),

    REDIS_PORT: Joi.number()
        .min(1)
        .max(65535)
        .default(6379)
        .description('Redis port'),

    REDIS_PASSWORD: Joi.string()
        .allow('')
        .default('')
        .description('Redis password'),

    REDIS_DB: Joi.number()
        .min(0)
        .max(15)
        .default(0)
        .description('Redis database number'),
});
