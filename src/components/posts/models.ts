import { UserModel } from "../users/models";

export enum PostType {
  Post = "POST",
  Poll = "POLL",
}

export type PostModel = {
  id: number;
  authorId: Pick<UserModel, "id">;
  PostType: PostType.Post;
  title?: string;
  content: string;
  createdAt: Date;
  isEdited: boolean;
  media?: string;
};

export type PollModel = {
  id: number;
  authorId: Pick<UserModel, "id">;
  PostType: PostType.Poll;
  title?: string;
  content: string;
  createdAt: Date;
  media?: string;
  isEdited: boolean;
  options: Option[];
};

export type Option = {
  id: number;
  content: string;
  media?: string;
};
