import { ConfigModuleOptions } from '@nestjs/config';
import { validationSchema } from './validation.schema';

export const appConfig: ConfigModuleOptions = {
    isGlobal: true,
    envFilePath: '.env',
    cache: true,
    expandVariables: true,
    validationSchema: validationSchema,
    validationOptions: {
        allowUnknown: true,
        abortEarly: false,
    },
};
