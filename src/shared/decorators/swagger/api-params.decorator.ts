import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

interface ParamConfig {
    name: string;
    description: string;
    example?: any;
    type?: 'string' | 'number' | 'boolean';
    required?: boolean;
}

/**
 * ID 파라미터 데코레이터
 * @param name 파라미터 이름 (기본값: 'id')
 * @param description 파라미터 설명
 * @param example 예시 값
 */
export const ApiIdParam = (
    name = 'id',
    description = '리소스 ID',
    example: number | string = 1
) => {
    return ApiParam({
        name,
        description,
        example,
        type: typeof example === 'number' ? Number : String,
    });
};

/**
 * 다중 파라미터 데코레이터
 * @param params 파라미터 설정 배열
 */
export const ApiMultipleParams = (...params: ParamConfig[]) => {
    return applyDecorators(
        ...params.map(param => {
            // 타입에 따른 기본 예시값 설정
            let example = param.example;
            if (!example) {
                switch (param.type) {
                    case 'number':
                        example = 1;
                        break;
                    case 'boolean':
                        example = true;
                        break;
                    default:
                        example = 'example';
                }
            }

            return ApiParam({
                name: param.name,
                description: param.description,
                example,
                required: param.required ?? true,
                type: param.type === 'number' ? Number :
                    param.type === 'boolean' ? Boolean : String,
            });
        })
    );
};