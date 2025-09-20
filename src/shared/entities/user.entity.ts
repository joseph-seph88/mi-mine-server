import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { UserRole } from '../enums/common/user-role.enum';
import { TABLE_NAMES } from '../constants/table.constants';

@Entity(TABLE_NAMES.USER)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  nickName: string;

  @Column()
  password: string;

  @Column({ default: '' })
  profileImageUrl: string;

  @Column({ default: 0 })
  friendCount: number;

  @Column({ default: 0 })
  followerCount: number;

  @Column({ default: 0 })
  postCount: number;

  @Column('simple-array')
  friendIdList: string[];

  @Column('simple-array')
  followerIdList: string[];

  @Column('simple-array')
  roles: UserRole[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  static create(
    email: string,
    nickName: string,
    password: string,
    profileImageUrl: string = '',
    friendCount: number = 0,
    followerCount: number = 0,
    postCount: number = 0,
    roles: UserRole[] = [UserRole.USER],
  ): User {
    const user = new User();
    user.email = email;
    user.nickName = nickName;
    user.password = password;
    user.profileImageUrl = profileImageUrl;
    user.friendCount = friendCount;
    user.followerCount = followerCount;
    user.postCount = postCount;
    user.friendIdList = [];
    user.followerIdList = [];
    user.roles = roles;
    return user;
  }
}
