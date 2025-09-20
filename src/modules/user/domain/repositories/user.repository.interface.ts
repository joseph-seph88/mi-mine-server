import { User } from '../../../../shared/entities/user.entity';

export interface UserRepositoryInterface {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(id: string, user: User): Promise<User | null>;
  delete(id: string): Promise<void>;
  softDelete(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findAllActive(): Promise<User[]>;
}
