import { Injectable } from "@nestjs/common";
import { SharedUserService } from "src/shared/services/shared-user.service";
import { AuthUserRepository } from "../../domain/repositories/auth-user.repository";
import { RegisterRequestInterface } from "../../domain/interfaces/request/register-request.interface";
import { LoginRequestInterface } from "../../domain/interfaces/request/login-request.interface";
import { UserInfoInterface } from "../../domain/interfaces/types/user-info.interface";


@Injectable()
export class AuthUserRepositoryImpl extends AuthUserRepository {
    constructor(private userService: SharedUserService) {
        super();
    }


    async registerUser(userData: RegisterRequestInterface): Promise<Boolean> {
        return await this.userService.createUser({
            email: userData.email,
            password: userData.password,
            nickName: userData.nickName,
        });
    }

    async loginUser(userData: LoginRequestInterface): Promise<UserInfoInterface> {
        const user = await this.userService.validateUser(userData.email, userData.password);
        return {
            id: user.id.toString(),
            email: user.email,
            nickName: user.nickName,
            profileImageUrl: user.profileImageUrl,
            friendCount: user.friendCount,
            followerCount: user.followerCount,
            postCount: user.postCount,
            friendIdList: user.friendIdList,
            followerIdList: user.followerIdList,
            roles: user.roles,

        };
    }

    // async findPasswordByEmail(email: string): Promise<string | null> {
    //     return await this.userService.findPasswordByEmail(email);
    // }

    // async findPasswordByPhone(email: string): Promise<User | null> {
    //     return await this.userService.findPasswordByPhone(email);
    // }

    // async findEmailByPhone(email: string): Promise<User | null> {
    //     return await this.userService.findUserByEmail(email);
    // }
}