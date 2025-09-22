export interface UpdateUserRequestInterface {
  nickName?: string;
  profileImageUrl?: string;
  friendCount?: number;
  followerCount?: number;
  postCount?: number;
  friendIdList?: string[];
  followerIdList?: string[];
}