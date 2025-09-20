import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from "../../../../shared/entities/user.entity";

@Injectable()
export class DeleteUserUseCase {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async execute(userId: string): Promise<User> {
        const result = await this.userRepository.softDelete(userId);
        if (result.affected === 0) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${userId}`);
        }
        const deletedUser = await this.userRepository.findOne({ where: { id: userId }, withDeleted: true });

        if (!deletedUser) {
            throw new NotFoundException(`사용자를 찾을 수 없거나 이미 삭제된 사용자입니다. ID: ${userId}`);
        }

        return deletedUser;
    }
}