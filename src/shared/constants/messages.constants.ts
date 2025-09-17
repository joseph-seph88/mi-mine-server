export const RESPONSE_MESSAGES = {
    SUCCESS: '요청이 성공적으로 처리되었습니다',
    CREATED: '리소스가 생성되었습니다',
    UPDATED: '리소스가 수정되었습니다',
    DELETED: '리소스가 삭제되었습니다',

    BAD_REQUEST: '잘못된 요청입니다',
    UNAUTHORIZED: '인증이 필요합니다',
    FORBIDDEN: '권한이 없습니다',
    NOT_FOUND: '리소스를 찾을 수 없습니다',
    INTERNAL_ERROR: '서버 내부 오류가 발생했습니다',
} as const;
