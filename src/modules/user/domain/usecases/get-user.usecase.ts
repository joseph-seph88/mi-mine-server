import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { UserResponseInterface } from "../interfaces/response/user-response.interface";

@Injectable()
export class GetUserUseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    async execute(userId: string): Promise<UserResponseInterface> {
        const user = await this.userRepository.getUserById(userId);

        if (!user) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        return user;
    }
}