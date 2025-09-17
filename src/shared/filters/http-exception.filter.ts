import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiError } from '../interfaces/api.interface';
import { convertStatusCodeToMessage, convertStatusCodeToErrorMessage } from '../utils/http.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const statusCode = exception.getStatus();

        const errorResponse: ApiError = {
            success: false,
            statusCode,
            statusMessage: convertStatusCodeToMessage(statusCode),
            error: exception.message || 'Internal server error',
            message: convertStatusCodeToErrorMessage(statusCode),
            timestamp: new Date().toISOString(),
        };

        response.status(statusCode).json(errorResponse);
    }

}
