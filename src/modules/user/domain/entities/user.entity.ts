import { UserRole } from '../../../../shared/enums/common/user-role.enum';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly nickName: string,
    public readonly password: string,
    public readonly profileImageUrl: string,
    public readonly friendCount: number,
    public readonly followerCount: number,
    public readonly postCount: number,
    public readonly roles: UserRole[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) { }

  static create(
    id: string,
    email: string,
    nickName: string,
    password: string,
    profileImageUrl?: string,
    friendCount?: number,
    followerCount?: number,
    postCount?: number,
    roles?: UserRole[],
  ): User {
    const now = new Date();
    return new User(
      id,
      email,
      nickName,
      password || '',
      profileImageUrl || '',
      friendCount || 0,
      followerCount || 0,
      postCount || 0,
      roles || [UserRole.USER],
      now,
      now
    );
  }

  updateNickName(nickName: string): User {
    return new User(
      this.id,
      this.email,
      nickName,
      this.password,
      this.profileImageUrl,
      this.friendCount,
      this.followerCount,
      this.postCount,
      this.roles,
      this.createdAt,
      new Date(),
    );
  }

  updatePassword(password: string): User {
    return new User(
      this.id,
      this.email,
      this.nickName,
      password,
      this.profileImageUrl,
      this.friendCount,
      this.followerCount,
      this.postCount,
      this.roles,
      this.createdAt,
      new Date(),
    );
  }
}
