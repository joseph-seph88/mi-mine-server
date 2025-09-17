import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RESPONSE_MESSAGES } from '../../constants/messages.constants';

interface ApiResponseOptions {
    includeAuth?: boolean;
    includeNotFound?: boolean;
    customErrors?: { status: number; description: string }[];
}

/**
 * 공통 API 응답 데코레이터
 * @param summary API 작업 요약
 * @param responseType 응답 타입 클래스
 * @param options 추가 옵션들
 */
export const ApiCommonResponses = <T = any>(
    summary: string,
    responseType?: Type<T>,
    options: ApiResponseOptions = {}
) => {
    const decorators = [
        ApiOperation({ summary }),
        ApiResponse({
            status: 200,
            description: RESPONSE_MESSAGES.SUCCESS,
            type: responseType,
        }),
        ApiResponse({
            status: 400,
            description: RESPONSE_MESSAGES.BAD_REQUEST
        }),
        ApiResponse({
            status: 500,
            description: RESPONSE_MESSAGES.INTERNAL_ERROR
        })
    ];

    if (options.includeAuth) {
        decorators.push(
            ApiResponse({
                status: 401,
                description: RESPONSE_MESSAGES.UNAUTHORIZED
            }),
            ApiResponse({
                status: 403,
                description: RESPONSE_MESSAGES.FORBIDDEN
            })
        );
    }

    if (options.includeNotFound) {
        decorators.push(
            ApiResponse({
                status: 404,
                description: RESPONSE_MESSAGES.NOT_FOUND
            })
        );
    }

    if (options.customErrors) {
        decorators.push(
            ...options.customErrors.map(error =>
                ApiResponse({
                    status: error.status,
                    description: error.description
                })
            )
        );
    }

    return applyDecorators(...decorators);
};

/**
 * 생성 API 응답 데코레이터
 * @param summary API 작업 요약
 * @param responseType 응답 타입 클래스
 * @param options 추가 옵션들
 */
export const ApiCreateResponse = <T = any>(
    summary: string,
    responseType?: Type<T>,
    options: Omit<ApiResponseOptions, 'includeNotFound'> = {}
) => {
    const decorators = [
        ApiOperation({ summary }),
        ApiResponse({
            status: 201,
            description: RESPONSE_MESSAGES.CREATED,
            type: responseType,
        }),
        ApiResponse({
            status: 400,
            description: RESPONSE_MESSAGES.BAD_REQUEST
        }),
        ApiResponse({
            status: 500,
            description: RESPONSE_MESSAGES.INTERNAL_ERROR
        })
    ];

    if (options.includeAuth) {
        decorators.push(
            ApiResponse({
                status: 401,
                description: RESPONSE_MESSAGES.UNAUTHORIZED
            }),
            ApiResponse({
                status: 403,
                description: RESPONSE_MESSAGES.FORBIDDEN
            })
        );
    }

    if (options.customErrors) {
        decorators.push(
            ...options.customErrors.map(error =>
                ApiResponse({
                    status: error.status,
                    description: error.description
                })
            )
        );
    }

    return applyDecorators(...decorators);
};

/**
 * 조회 API 응답 데코레이터
 * @param summary API 작업 요약
 * @param responseType 응답 타입 클래스
 * @param options 추가 옵션들
 */
export const ApiGetResponse = <T = any>(
    summary: string,
    responseType?: Type<T>,
    options: ApiResponseOptions = { includeNotFound: true }
) => {
    return ApiCommonResponses(summary, responseType, options);
};

/**
 * 수정 API 응답 데코레이터
 * @param summary API 작업 요약
 * @param responseType 응답 타입 클래스
 * @param options 추가 옵션들
 */
export const ApiUpdateResponse = <T = any>(
    summary: string,
    responseType?: Type<T>,
    options: ApiResponseOptions = { includeNotFound: true, includeAuth: true }
) => {
    return ApiCommonResponses(summary, responseType, options);
};

/**
 * 삭제 API 응답 데코레이터
 * @param summary API 작업 요약
 * @param options 추가 옵션들
 */
export const ApiDeleteResponse = (
    summary: string,
    options: Omit<ApiResponseOptions, 'includeNotFound'> & { includeNotFound?: boolean } = {
        includeNotFound: true,
        includeAuth: true
    }
) => {
    const decorators = [
        ApiOperation({ summary }),
        ApiResponse({
            status: 204,
            description: RESPONSE_MESSAGES.DELETED,
        }),
        ApiResponse({
            status: 400,
            description: RESPONSE_MESSAGES.BAD_REQUEST
        }),
        ApiResponse({
            status: 500,
            description: RESPONSE_MESSAGES.INTERNAL_ERROR
        })
    ];

    if (options.includeNotFound) {
        decorators.push(
            ApiResponse({
                status: 404,
                description: RESPONSE_MESSAGES.NOT_FOUND
            })
        );
    }

    if (options.includeAuth) {
        decorators.push(
            ApiResponse({
                status: 401,
                description: RESPONSE_MESSAGES.UNAUTHORIZED
            }),
            ApiResponse({
                status: 403,
                description: RESPONSE_MESSAGES.FORBIDDEN
            })
        );
    }

    if (options.customErrors) {
        decorators.push(
            ...options.customErrors.map(error =>
                ApiResponse({
                    status: error.status,
                    description: error.description
                })
            )
        );
    }

    return applyDecorators(...decorators);
};

export const ApiCrudResponses = {
    Create: ApiCreateResponse,
    Read: ApiGetResponse,
    Update: ApiUpdateResponse,
    Delete: ApiDeleteResponse,
} as const;
