export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly name: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static create(
    id: string,
    email: string,
    name: string,
  ): User {
    const now = new Date();
    return new User(id, email, name, now, now);
  }

  updateName(name: string): User {
    return new User(
      this.id,
      this.email,
      name,
      this.createdAt,
      new Date(),
    );
  }
}
