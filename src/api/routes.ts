import { CommentUserAssignedModel } from "@/components/posts/models";
import { UserModel } from "@/components/users/models";
import { pollFormSchema, postFormSchema } from "@/validation/post.validation";
import { z } from "zod";

/**
 * A fake function that returns an empty object casted to type T
 * @returns Empty object as type T
 */
export function Type<T>(): T {
  return {} as T;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface JwtTokenObtainPair {
  access: string;
  refresh: string;
}

const routes = {
  // Auth Endpoints
  login: {
    path: "/api/v1/auth/login",
    method: "POST",
    noAuth: true,
    TRes: Type<JwtTokenObtainPair>(),
    TBody: Type<LoginCredentials>(),
  },
  tokenRefresh: {
    path: "/api/v1/auth/refresh-tokens",
    method: "POST",
    TRes: Type<JwtTokenObtainPair>(),
    TBody: Type<{ refreshToken: JwtTokenObtainPair["refresh"] }>(),
  },
  currentUser: {
    path: "/api/v1/user/current-user",
    method: "GET",
    TRes: Type<UserModel>(),
  },
  sendVerificationEmail: {
    path: "/api/v1/auth/send-verification-email",
    method: "POST",
    TRes: Type<string>(),
  },
  verifyEmail: {
    path: "/api/v1/auth/verify-email",
    method: "POST",
    TRes: Type<string>(),
    TBody: Type<{ token: string }>(),
  },
  createPost: {
    path: "/api/v1/post/create-post",
    method: "POST",
    TRes: Type<string>(),
    TBody: Type<z.infer<typeof postFormSchema>>(),
  },
  createPoll: {
    path: "/api/v1/post/create-poll",
    method: "POST",
    TRes: Type<string>(),
    TBody: Type<z.infer<typeof pollFormSchema>>(),
  },
  uploadMedia: {
    path: "/api/v1/post/upload-media",
    method: "POST",
    TRes: Type<string>(),
    TBody: Type<{ media: File }>(),
  },
  queryPosts: {
    path: "/api/v1/post",
    method: "GET",
    TRes:
      Type<z.infer<typeof postFormSchema>[]>() ||
      Type<z.infer<typeof pollFormSchema>[]>(),
  },
  createComment: {
    path: "/api/v1/comment/create",
    method: "POST",
    TRes: Type<CommentUserAssignedModel>(),
    TBody: Type<{ postId: number; content: string }>(),
  },
  queryCommentsForPost: {
    path: "/api/v1/comment",
    method: "GET",
    TRes: Type<CommentUserAssignedModel[]>(),
  },
};

export default routes;
