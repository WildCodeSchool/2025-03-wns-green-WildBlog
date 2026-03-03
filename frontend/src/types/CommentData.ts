import { UserData } from "./UserData";

export interface CommentData {
  id: number;
  content: string;
  createdAt: string;
  author: UserData;
}

export interface CommentInput {
  content: string;
  postId: number;
}