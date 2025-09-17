import { HttpStatus } from '@nestjs/common';
import { RESPONSE_MESSAGES } from '../constants/messages.constants';


export function convertStatusCodeToMessage(statusCode: number): string {
    const statusMessages: { [key: number]: string } = {
        200: 'OK',
        201: 'Created',
        202: 'Accepted',
        204: 'No Content',
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
    };

    return statusMessages[statusCode] || 'Unknown Status';
}


export function isSuccessStatusCode(statusCode: number): boolean {
    return statusCode >= 200 && statusCode < 300;
}


export function convertMethodToResponseMessage(method: string, statusCode: number): string {
    if (statusCode >= 400) {
        return RESPONSE_MESSAGES.BAD_REQUEST;
    }

    switch (method) {
        case 'POST':
            return RESPONSE_MESSAGES.CREATED;
        case 'PUT':
        case 'PATCH':
            return RESPONSE_MESSAGES.UPDATED;
        case 'DELETE':
            return RESPONSE_MESSAGES.DELETED;
        default:
            return RESPONSE_MESSAGES.SUCCESS;
    }
}


export function convertStatusCodeToErrorMessage(statusCode: number): string {
    switch (statusCode) {
        case HttpStatus.BAD_REQUEST:
            return RESPONSE_MESSAGES.BAD_REQUEST;
        case HttpStatus.UNAUTHORIZED:
            return RESPONSE_MESSAGES.UNAUTHORIZED;
        case HttpStatus.FORBIDDEN:
            return RESPONSE_MESSAGES.FORBIDDEN;
        case HttpStatus.NOT_FOUND:
            return RESPONSE_MESSAGES.NOT_FOUND;
        case HttpStatus.INTERNAL_SERVER_ERROR:
            return RESPONSE_MESSAGES.INTERNAL_ERROR;
        default:
            return RESPONSE_MESSAGES.BAD_REQUEST;
    }
}
