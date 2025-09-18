export interface UpdateUserRequest {
  nickName?: string;
  password?: string;
  profileImageUrl?: string;
  friendCount?: number;
  followerCount?: number;
  postCount?: number;
}