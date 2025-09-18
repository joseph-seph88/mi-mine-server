import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryInterface } from "../repositories/user.repository.interface";
import { User } from "../entities/user.entity";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepositoryInterface,
    ) { }

    async execute(userId: string): Promise<User> {
        const deletedUser = await this.userRepository.softDelete(userId);

        if (!deletedUser) {
            throw new NotFoundException(`사용자를 찾을 수 없거나 이미 삭제된 사용자입니다. ID: ${userId}`);
        }

        return deletedUser;
    }
}