import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

/**
 * 페이징 관련 쿼리 파라미터 데코레이터
 * page, limit 파라미터를 자동으로 추가
 */
export const ApiPaginationQueries = () => {
    return applyDecorators(
        ApiQuery({
            name: 'page',
            required: false,
            type: Number,
            description: '페이지 번호 (1부터 시작)',
            example: 1,
            minimum: 1
        }),
        ApiQuery({
            name: 'limit',
            required: false,
            type: Number,
            description: '페이지당 항목 수',
            example: 10,
            minimum: 1,
            maximum: 100
        })
    );
};

/**
 * 정렬 관련 쿼리 파라미터 데코레이터
 * sort, order 파라미터를 자동으로 추가
 */
export const ApiSortingQueries = () => {
    return applyDecorators(
        ApiQuery({
            name: 'sort',
            required: false,
            type: String,
            description: '정렬 기준 필드',
            example: 'createdAt'
        }),
        ApiQuery({
            name: 'order',
            required: false,
            type: String,
            description: '정렬 순서',
            example: 'DESC',
            enum: ['ASC', 'DESC']
        })
    );
};

/**
 * 댓글 조회 관련 쿼리 파라미터 데코레이터
 * 페이징 + 댓글 특화 파라미터
 */
export const ApiCommentQueries = () => {
    return applyDecorators(
        ApiPaginationQueries(),
        ApiQuery({
            name: 'replyLimit',
            required: false,
            type: Number,
            description: '댓글당 대댓글 개수',
            example: 3,
            minimum: 0,
            maximum: 10
        })
    );
};

/**
 * 기본 목록 조회용 쿼리 파라미터 데코레이터
 * 페이징 + 정렬
 */
export const ApiListQueries = () => {
    return applyDecorators(
        ApiPaginationQueries(),
        ApiSortingQueries()
    );
};

/**
 * 검색 관련 쿼리 파라미터 데코레이터
 */
export const ApiSearchQueries = () => {
    return applyDecorators(
        ApiPaginationQueries(),
        ApiQuery({
            name: 'search',
            required: false,
            type: String,
            description: '검색어',
            example: '검색할 내용'
        }),
        ApiQuery({
            name: 'searchField',
            required: false,
            type: String,
            description: '검색 대상 필드',
            example: 'content'
        })
    );
};
