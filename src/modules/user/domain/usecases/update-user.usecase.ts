import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserResponseInterface } from "../interfaces/response/user-response.interface";
import { UpdateUserRequestInterface } from "../interfaces/request/update-request.interface";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async updateProfile(userId: string, request: UpdateUserRequestInterface): Promise<UserResponseInterface> {
        const userData = await this.userRepository.updateUser(userId, request);
        if (!userData) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }
        return userData;
    }
}