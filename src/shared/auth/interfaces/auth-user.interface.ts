import { UserRole } from '../../enums/common/user-role.enum';

export interface AuthUser {
    id: string;
    email: string;
    name: string;
    roles?: UserRole[];
    createdAt?: Date;
    updatedAt?: Date;
}
