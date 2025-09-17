
/**
 * 성공 응답 타입
 */
export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    statusMessage: string;
    message: string;
    data: T;
    timestamp: string;
}

/**
 * 에러 응답 타입
 */
export interface ApiError {
    success: false;
    statusCode: number;
    statusMessage: string;
    message: string;
    error: string;
    timestamp: string;
}

/**
 * 페이지네이션 정보
 */
export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

/**
 * 페이지네이션 데이터
 */
export interface PaginatedData<T> {
    items: T[];
    pagination: PaginationInfo;
}

/**
 * 페이지네이션 응답 인터페이스
 */
export interface PaginatedResponse<T> extends ApiResponse<PaginatedData<T>> { }
