import { UserRole } from '../enums/common/user-role.enum';

export interface JwtPayload {
    sub: string;
    email: string;
    name?: string;
    roles?: UserRole[];
    iat?: number;
    exp?: number;
}
