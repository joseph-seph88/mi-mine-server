export enum AppRoute {
    // App Routes
    INFO = 'info',
    HEALTH = 'health',

    // Auth Routes
    AUTH_LOGIN = 'login',
    AUTH_REGISTER = 'register',
    AUTH_REFRESH = 'refresh',

    // Post Routes
    POST_GET_BY_USER_ID = 'user/:userId',
    POST_GET_BY_POST_ID = 'detail/:postId',
    POST_UPDATE = ':postId',
    POST_DELETE = ':postId',
    POST_GET_BY_RADIUS = 'radius',

    // Comment Routes
    COMMENT_GET_BY_POST_ID = 'post/:postId',
    COMMENT_GET_BY_USER_ID = 'user',
    COMMENT_GET_BY_COMMENT_ID = ':commentId',
    COMMENT_GET_BY_COMMENT_ID_REPLIES = ':commentId/replies',
    COMMENT_UPDATE = ':commentId',
    COMMENT_DELETE = ':commentId',
}
