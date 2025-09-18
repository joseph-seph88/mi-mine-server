import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserRole } from '../../../../shared/enums/common/user-role.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public nickName: string;

  @Column()
  public password: string;

  @Column({ default: '' })
  public profileImageUrl: string;

  @Column({ default: 0 })
  public friendCount: number;

  @Column({ default: 0 })
  public followerCount: number;

  @Column({ default: 0 })
  public postCount: number;

  @Column('simple-array')
  public roles: UserRole[];

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date | null;

  constructor() {
    // TypeORM will handle initialization
  }

  static create(
    email: string,
    nickName: string,
    password: string,
    profileImageUrl?: string,
    friendCount?: number,
    followerCount?: number,
    postCount?: number,
    roles?: UserRole[],
  ): User {
    const user = new User();
    user.email = email;
    user.nickName = nickName;
    user.password = password;
    user.profileImageUrl = profileImageUrl || '';
    user.friendCount = friendCount || 0;
    user.followerCount = followerCount || 0;
    user.postCount = postCount || 0;
    user.roles = roles || [UserRole.USER];
    return user;
  }

  updateNickName(nickName: string): void {
    this.nickName = nickName;
  }

  updatePassword(password: string): void {
    this.password = password;
  }

  softDelete(): void {
    this.deletedAt = new Date();
  }
  isDeleted(): boolean {
    return this.deletedAt !== null;
  }

  updateProfile(updates: {
    nickName?: string;
    profileImageUrl?: string;
  }): void {
    if (updates.nickName !== undefined) {
      this.nickName = updates.nickName;
    }
    if (updates.profileImageUrl !== undefined) {
      this.profileImageUrl = updates.profileImageUrl;
    }
  }

  updateCounts(updates: {
    friendCount?: number;
    followerCount?: number;
    postCount?: number;
  }): void {
    if (updates.friendCount !== undefined) {
      this.friendCount = updates.friendCount;
    }
    if (updates.followerCount !== undefined) {
      this.followerCount = updates.followerCount;
    }
    if (updates.postCount !== undefined) {
      this.postCount = updates.postCount;
    }
  }

  updateRoles(roles: UserRole[]): void {
    this.roles = roles;
  }
}
