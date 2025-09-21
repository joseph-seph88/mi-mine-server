import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRequestDto } from '../dtos/request/user-request.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SharedUserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async createUser({
        email,
        password,
        nickName,
    }): Promise<Boolean> {
        const existingUser = await this.userRepository.existsBy({ email: email });
        if (existingUser) {
            throw new ConflictException('이미 존재하는 이메일입니다.');
        }

        const existingNickName = await this.userRepository.existsBy({ nickName: nickName });
        if (existingNickName) {
            throw new ConflictException('이미 존재하는 닉네임입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = User.create(email, nickName, hashedPassword);
        const savedUser = await this.userRepository.save(user);
        if (!savedUser) {
            throw new Error('사용자 생성에 실패했습니다.');
        }

        return true;
    }

    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findOneBy({ id: parseInt(id) });
    }

    async updateUser(id: number, userData: UserRequestDto): Promise<User> {
        const existingUser = await this.userRepository.existsBy({ id: id });
        if (!existingUser) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${id}`);
        }

        await this.userRepository.update(id, userData);
        const updatedUser = await this.userRepository.findOneBy({ id: id });
        if (!updatedUser) {
            throw new NotFoundException(`사용자 데이터가 없습니다.`);
        }

        return updatedUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        const result = await this.userRepository.softDelete(parseInt(id));
        if (result.affected === 0) {
            throw new NotFoundException(`사용자를 찾을 수 없습니다. ID: ${id}`);
        }

        return true;
    }


    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOneBy({ email: email });
        if (!user) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('이메일 또는 비밀번호가 잘못되었습니다.');
        }

        return user;
    }
}