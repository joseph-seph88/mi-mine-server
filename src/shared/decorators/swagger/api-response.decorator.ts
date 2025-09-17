import { applyDecorators, Type } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

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
            description: '요청이 성공적으로 처리되었습니다.',
            type: responseType,
        }),
        ApiResponse({
            status: 400,
            description: '잘못된 요청 데이터입니다.'
        }),
        ApiResponse({
            status: 500,
            description: '서버 내부 오류가 발생했습니다.'
        })
    ];

    if (options.includeAuth) {
        decorators.push(
            ApiResponse({
                status: 401,
                description: '인증이 필요합니다.'
            }),
            ApiResponse({
                status: 403,
                description: '권한이 없습니다.'
            })
        );
    }

    if (options.includeNotFound) {
        decorators.push(
            ApiResponse({
                status: 404,
                description: '리소스를 찾을 수 없습니다.'
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
            description: '리소스가 성공적으로 생성되었습니다.',
            type: responseType,
        }),
        ApiResponse({
            status: 400,
            description: '잘못된 요청 데이터입니다.'
        }),
        ApiResponse({
            status: 500,
            description: '서버 내부 오류가 발생했습니다.'
        })
    ];

    if (options.includeAuth) {
        decorators.push(
            ApiResponse({
                status: 401,
                description: '인증이 필요합니다.'
            }),
            ApiResponse({
                status: 403,
                description: '권한이 없습니다.'
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
            description: '리소스가 성공적으로 삭제되었습니다.',
        }),
        ApiResponse({
            status: 400,
            description: '잘못된 요청 데이터입니다.'
        }),
        ApiResponse({
            status: 500,
            description: '서버 내부 오류가 발생했습니다.'
        })
    ];

    if (options.includeNotFound) {
        decorators.push(
            ApiResponse({
                status: 404,
                description: '리소스를 찾을 수 없습니다.'
            })
        );
    }

    if (options.includeAuth) {
        decorators.push(
            ApiResponse({
                status: 401,
                description: '인증이 필요합니다.'
            }),
            ApiResponse({
                status: 403,
                description: '권한이 없습니다.'
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
