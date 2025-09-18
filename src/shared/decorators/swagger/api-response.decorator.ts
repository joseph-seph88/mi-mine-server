import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiExtraModels, getSchemaPath } from '@nestjs/swagger';
import { RESPONSE_MESSAGES } from '../../constants/messages.constants';
import { ApiResponseDto } from '../../dtos/api-response.dto';

interface ApiResponseOptions {
    includeAuth?: boolean;
    includeNotFound?: boolean;
    customErrors?: { status: number; description: string }[];
    wrapWithApiResponse?: boolean;
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
    const finalOptions = { wrapWithApiResponse: true, ...options };
    const decorators = [
        ApiOperation({ summary })
    ];

    if (finalOptions.wrapWithApiResponse) {
        if (responseType) {
            decorators.push(
                ApiExtraModels(ApiResponseDto, responseType),
                ApiResponse({
                    status: 200,
                    description: RESPONSE_MESSAGES.SUCCESS,
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(ApiResponseDto) },
                            {
                                properties: {
                                    data: { $ref: getSchemaPath(responseType) }
                                }
                            }
                        ]
                    }
                })
            );
        } else {
            decorators.push(
                ApiExtraModels(ApiResponseDto),
                ApiResponse({
                    status: 200,
                    description: RESPONSE_MESSAGES.SUCCESS,
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(ApiResponseDto) },
                            {
                                properties: {
                                    data: { type: 'null' }
                                }
                            }
                        ]
                    }
                })
            );
        }
    } else {
        decorators.push(
            ApiResponse({
                status: 200,
                description: RESPONSE_MESSAGES.SUCCESS,
                type: responseType,
            })
        );
    }

    decorators.push(
        ApiResponse({
            status: 400,
            description: RESPONSE_MESSAGES.BAD_REQUEST
        }),
        ApiResponse({
            status: 500,
            description: RESPONSE_MESSAGES.INTERNAL_ERROR
        })
    );

    if (finalOptions.includeAuth) {
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

    if (finalOptions.includeNotFound) {
        decorators.push(
            ApiResponse({
                status: 404,
                description: RESPONSE_MESSAGES.NOT_FOUND
            })
        );
    }

    if (finalOptions.customErrors) {
        decorators.push(
            ...finalOptions.customErrors.map(error =>
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
    const finalOptions = { wrapWithApiResponse: true, ...options };
    const decorators = [
        ApiOperation({ summary })
    ];

    if (finalOptions.wrapWithApiResponse) {
        if (responseType) {
            decorators.push(
                ApiExtraModels(ApiResponseDto, responseType),
                ApiResponse({
                    status: 201,
                    description: RESPONSE_MESSAGES.CREATED,
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(ApiResponseDto) },
                            {
                                properties: {
                                    data: { $ref: getSchemaPath(responseType) }
                                }
                            }
                        ]
                    }
                })
            );
        } else {
            decorators.push(
                ApiExtraModels(ApiResponseDto),
                ApiResponse({
                    status: 201,
                    description: RESPONSE_MESSAGES.CREATED,
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(ApiResponseDto) },
                            {
                                properties: {
                                    data: { type: 'null' }
                                }
                            }
                        ]
                    }
                })
            );
        }
    } else {
        decorators.push(
            ApiResponse({
                status: 201,
                description: RESPONSE_MESSAGES.CREATED,
                type: responseType,
            })
        );
    }

    decorators.push(
        ApiResponse({
            status: 400,
            description: RESPONSE_MESSAGES.BAD_REQUEST
        }),
        ApiResponse({
            status: 500,
            description: RESPONSE_MESSAGES.INTERNAL_ERROR
        })
    );

    if (finalOptions.includeAuth) {
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

    if (finalOptions.customErrors) {
        decorators.push(
            ...finalOptions.customErrors.map(error =>
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
    const finalOptions = { wrapWithApiResponse: true, ...options };
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

    if (finalOptions.includeNotFound) {
        decorators.push(
            ApiResponse({
                status: 404,
                description: RESPONSE_MESSAGES.NOT_FOUND
            })
        );
    }

    if (finalOptions.includeAuth) {
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

    if (finalOptions.customErrors) {
        decorators.push(
            ...finalOptions.customErrors.map(error =>
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
