import { ApiResponse } from './api.interface';

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedData<T> {
    items: T[];
    pagination: PaginationInfo;
}

/**
 * 페이지네이션 응답 인터페이스
 */
export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> { }
