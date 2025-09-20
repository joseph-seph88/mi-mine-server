import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "../../../../shared/entities/user.entity";
import { UpdateUserRequest } from "../interfaces/request/update-request.interface";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async updateProfile(userId: string, request: UpdateUserRequest): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });

        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        existingUser.updateProfile(request);
        await this.userRepository.save(existingUser);

        return existingUser;
    }

    async updateCounts(userId: string, request: UpdateUserRequest): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });

        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        existingUser.updateCounts(request);
        await this.userRepository.save(existingUser);

        return existingUser;
    }

    async updatePassword(userId: string, newPassword: string): Promise<User> {
        const existingUser = await this.userRepository.findOne({ where: { id: userId } });

        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }

        existingUser.updatePassword(newPassword);
        await this.userRepository.save(existingUser);

        return existingUser;
    }
}