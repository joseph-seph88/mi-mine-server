// Swagger API 태그 (한국어)
export const API_TAGS = {
    APP: '애플리케이션',
    AUTH: '인증',
    USER: '사용자',
    POST: '게시글',
    COMMUNITY: '커뮤니티',
    MAP: '지도',
    PLACE: '장소',
} as const;

// 컨트롤러 경로 (영어)
export const CONTROLLERS = {
    APP: 'app',
    AUTH: 'auth',
    USER: 'user',
    POST: 'post',
    COMMUNITY: 'community',
    MAP: 'map',
    PLACE: 'place',
} as const;

// API 버전
export const API_VERSION = {
    V1: 'v1',
    V2: 'v2',
} as const;
