import type { PostStatus } from "../enums/PostStatus";

export type PostData = {
      id: string;
      title: string;
      slug: string;
      content: string;
      coverImage?: string;
      createdAt: string;
      updatedAt: string;
      status: string;
      statusLabel: PostStatus;
      author: {
        id: string;
        firstName: string;
        lastName?: string;
        email: string;
      };
      category: {
        id: string;
        name: string;
        description?: string;
      };
      tags: {
        id: string;
        name: string;
      }[]
      ;
}