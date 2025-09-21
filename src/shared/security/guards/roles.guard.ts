import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../../decorators/roles.decorator';
import { UserRole } from '../../enums/common/user-role.enum';
import { JwtPayload } from 'src/shared/interfaces/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requiredRoles) {
            return true;
        }

        const { user }: { user: JwtPayload } = context.switchToHttp().getRequest();

        if (!user || !user.roles) {
            return false;
        }

        return requiredRoles.some((role) => user.roles?.includes(role));
    }
}
