import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) { }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { id }
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOne({
      where: { email }
    });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async update(id: string, user: User): Promise<User | null> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return null;
    }

    await this.repository.update(id, user);
    return await this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findAll(): Promise<User[]> {
    return await this.repository.find({
      withDeleted: true
    });
  }

  async findAllActive(): Promise<User[]> {
    return await this.repository.find();
  }

  async softDelete(id: string): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }

    await this.repository.softDelete(id);
    return await this.repository.findOne({
      where: { id },
      withDeleted: true
    });
  }
}
