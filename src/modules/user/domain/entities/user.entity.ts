import { UserRole } from '../../../../shared/enums/common/user-role.enum';

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
    public readonly roles: UserRole[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) { }

  static create(
    id: string,
    email: string,
    name: string,
    password?: string,
    roles?: UserRole[],
  ): User {
    const now = new Date();
    return new User(
      id,
      email,
      name,
      password || '',
      roles || [UserRole.USER],
      now,
      now
    );
  }

  updateName(name: string): User {
    return new User(
      this.id,
      this.email,
      name,
      this.password,
      this.roles,
      this.createdAt,
      new Date(),
    );
  }

  updatePassword(password: string): User {
    return new User(
      this.id,
      this.email,
      this.name,
      password,
      this.roles,
      this.createdAt,
      new Date(),
    );
  }
}
