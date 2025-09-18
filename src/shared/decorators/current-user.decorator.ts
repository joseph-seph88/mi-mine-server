import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserInfo } from '../../modules/user/domain/interfaces/user-info.interface';

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserInfo => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    },
);
