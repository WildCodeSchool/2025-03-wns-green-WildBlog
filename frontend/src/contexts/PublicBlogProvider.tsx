import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { PublicBlogContext } from "./PublicBlogContext";
import { GET_PUBLIC_BLOG } from "../gql/blog/getPublicBlog";
import { GET_PUBLIC_POSTS_BY_BLOG } from "../gql/posts/getPublicPostsByBlog";
import type { BlogData } from "../types/Blogdata";
import type { PostData } from "../types/PostData";
import type { ReactNode } from "react";

interface GetPublicBlogData {
  getPublicBlog: BlogData;
}

interface GetPublicPostsByBlogData {
  getPublicPostsByBlog: PostData[];
}

interface PublicBlogProviderProps {
  children: ReactNode;
}

export function PublicBlogProvider({ children }: PublicBlogProviderProps) {
  const { blogSlug } = useParams<{ blogSlug: string }>();

  const { data: blogData, loading: blogLoading, error: blogError } = useQuery<GetPublicBlogData>(
    GET_PUBLIC_BLOG,
    {
      variables: { slug: blogSlug },
      skip: !blogSlug,
    }
  );

  const { data: postsData, loading: postsLoading, error: postsError } = useQuery<GetPublicPostsByBlogData>(
    GET_PUBLIC_POSTS_BY_BLOG,
    {
      variables: { blogSlug },
      skip: !blogSlug,
    }
  );

  const blog = blogData?.getPublicBlog ?? null;
  const posts = postsData?.getPublicPostsByBlog ?? [];

  const loading = blogLoading || postsLoading;
  const error = blogError || postsError || null;

  return (
    <PublicBlogContext.Provider
      value={{
        blog,
        posts,
        loading,
        error,
      }}
    >
      {children}
    </PublicBlogContext.Provider>
  );
}
