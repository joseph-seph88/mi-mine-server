export class UserResponseDto {
  id: string;
  email: string;
  nickName: string;
  profileImageUrl: string;
  friendCount: number;
  followerCount: number;
  postCount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    nickName: string,
    profileImageUrl: string,
    friendCount: number,
    followerCount: number,
    postCount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.email = email;
    this.nickName = nickName;
    this.profileImageUrl = profileImageUrl;
    this.friendCount = friendCount;
    this.followerCount = followerCount;
    this.postCount = postCount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
