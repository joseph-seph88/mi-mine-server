import * as Joi from 'joi';

export const validationSchema = Joi.object({
    BASE_PORT: Joi.number()
        .min(1)
        .max(65535)
        .default(3001),
});
