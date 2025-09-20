import { RegisterRequestInterface } from "../interfaces/request/register-request.interface";
import { LoginRequestInterface } from "../interfaces/request/login-request.interface";
import { UserInfoInterface } from "../interfaces/types/user-info.interface";

export interface AuthUserRepository {
    registerUser(userData: RegisterRequestInterface): Promise<Boolean>;
    loginUser(userData: LoginRequestInterface): Promise<UserInfoInterface>;
}
