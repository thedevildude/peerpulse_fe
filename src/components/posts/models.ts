import { UserModel } from "../users/models";

export enum PostType {
  Post = "POST",
  Poll = "POLL",
}

export type PostModel = {
  id: number;
  authorId: UserModel["id"];
  PostType: PostType.Post;
  title?: string;
  content: string;
  createdAt: string;
  isEdited: boolean;
  media?: string;
};

export type PollModel = {
  id: number;
  authorId: UserModel["id"];
  PostType: PostType.Poll;
  title?: string;
  content: string;
  createdAt: string;
  media?: string;
  isEdited: boolean;
  options: Option[];
};

export type Option = {
  id: number;
  content: string;
  media?: string;
};

export type PostAssignedModel = PostModel & {
  Author: UserModel;
};

export type PollAssignedModel = PollModel & {
  Author: UserModel;
};
