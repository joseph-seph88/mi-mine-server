export class UserResponseDto {
  id: string;
  email: string;
  nickName: string;
  profileImageUrl: string;
  friendCount: number;
  followerCount: number;
  postCount: number;
  roles?: string[];
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  friendIdList: string[];
  followerIdList: string[];

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
    deletedAt: Date | null = null,
    roles: string[] = [],
    friendIdList: string[] = [],
    followerIdList: string[] = [],
  ) {
    this.id = id;
    this.email = email;
    this.nickName = nickName;
    this.profileImageUrl = profileImageUrl;
    this.friendCount = friendCount;
    this.followerCount = followerCount;
    this.postCount = postCount;
    this.roles = roles;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
    this.friendIdList = friendIdList;
    this.followerIdList = followerIdList;
  }
}
