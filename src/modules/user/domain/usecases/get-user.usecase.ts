import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryInterface } from "../repositories/user.repository.interface";
import { User } from "../entities/user.entity";

@Injectable()
export class GetUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepositoryInterface,
    ) { }

    async execute(userId: string): Promise<User> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        return user;
    }
}