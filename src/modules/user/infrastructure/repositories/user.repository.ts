import { Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user.entity';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository.interface';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  private users: Map<string, User> = new Map();

  async findById(id: string): Promise<User | null> {
    const user = this.users.get(id);
    return user && !user.isDeleted() ? user : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email && !user.isDeleted()) {
        return user;
      }
    }
    return null;
  }

  async save(user: User): Promise<User> {
    this.users.set(user.id, user);
    return user;
  }

  async update(id: string, user: User): Promise<User | null> {
    const existingUser = this.users.get(id);

    if (!existingUser || existingUser.isDeleted()) {
      return null;
    }

    this.users.set(id, user);
    return user;
  }

  async delete(id: string): Promise<void> {
    this.users.delete(id);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async findAllActive(): Promise<User[]> {
    return Array.from(this.users.values()).filter(user => !user.isDeleted());
  }

  async softDelete(id: string): Promise<User | null> {
    const user = this.users.get(id);
    if (!user || user.isDeleted()) {
      return null;
    }

    const deletedUser = user.softDelete();
    this.users.set(id, deletedUser);
    return deletedUser;
  }
}
