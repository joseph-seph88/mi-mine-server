import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../user/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../../../../shared/enums/common/user-role.enum';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async findUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async validateUserCredentials(email: string, password: string): Promise<User> {
        const user = await this.findUserByEmail(email);
        if (!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        return user;
    }

    async createUserForAuth(email: string, password: string, nickName: string): Promise<User> {
        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = User.create(
            email,
            nickName,
            hashedPassword,
            '',
            0,
            0,
            0,
            [UserRole.USER]
        );

        return await this.userRepository.save(user);
    }
}
