import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepositoryInterface } from "../repositories/user.repository.interface";
import { User } from "../entities/user.entity";
import { UpdateUserRequest } from "../interfaces/request/update-request.interface";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UserRepository')
        private readonly userRepository: UserRepositoryInterface,
    ) { }

    async updateProfile(userId: string, request: UpdateUserRequest): Promise<User> {
        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        const updatedUser = existingUser.updateProfile(request);
        const result = await this.userRepository.update(userId, updatedUser);

        if (!result) {
            throw new NotFoundException(`사용자 업데이트에 실패했습니다. ID: ${userId}`);
        }

        return result;
    }

    async updateCounts(userId: string, request: UpdateUserRequest): Promise<User> {
        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        const updatedUser = existingUser.updateCounts(request);
        const result = await this.userRepository.update(userId, updatedUser);

        if (!result) {
            throw new NotFoundException(`사용자 업데이트에 실패했습니다. ID: ${userId}`);
        }

        return result;
    }

    async updatePassword(userId: string, newPassword: string): Promise<User> {
        const existingUser = await this.userRepository.findById(userId);

        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        const updatedUser = existingUser.updatePassword(newPassword);
        const result = await this.userRepository.update(userId, updatedUser);

        if (!result) {
            throw new NotFoundException(`비밀번호 업데이트에 실패했습니다. ID: ${userId}`);
        }

        return result;
    }
}