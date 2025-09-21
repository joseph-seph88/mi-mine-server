export enum AppRoute {
    // App Routes
    INFO = 'app/info',
    HEALTH = 'app/health',

    // Auth Routes
    AUTH_LOGIN = 'login',
    AUTH_REGISTER = 'register',
    AUTH_REFRESH = 'refresh',

    // User Routes
    USER_GET_BY_ID = 'user/me',
    USER_UPDATE = 'user/me',
    USER_DELETE = 'user/me',

    // Post Routes
    POST_CREATE = 'post',
    POST_GET_ALL = 'post',
    POST_GET_BY_USER_ID = 'post/user/:userId',
    POST_GET_BY_ID = 'post/:id',
    POST_UPDATE = 'post/:id',
    POST_DELETE = 'post/:id',
}
