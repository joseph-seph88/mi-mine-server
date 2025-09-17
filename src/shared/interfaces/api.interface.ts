export interface ApiResponse<T = any> {
    success: boolean;
    statusCode: number;
    statusMessage: string;
    message: string;
    data: T;
    timestamp: string;
}

export interface ApiError {
    success: false;
    statusCode: number;
    statusMessage: string;
    message: string;
    error: string;
    timestamp: string;
}

