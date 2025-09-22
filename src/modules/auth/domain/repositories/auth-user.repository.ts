import { RegisterRequestInterface } from "../interfaces/request/register-request.interface";
import { LoginRequestInterface } from "../interfaces/request/login-request.interface";
import { UserInfoInterface } from "../interfaces/types/user-info.interface";

export abstract class AuthUserRepository {
    abstract registerUser(userData: RegisterRequestInterface): Promise<Boolean>;
    abstract loginUser(userData: LoginRequestInterface): Promise<UserInfoInterface>;
}
