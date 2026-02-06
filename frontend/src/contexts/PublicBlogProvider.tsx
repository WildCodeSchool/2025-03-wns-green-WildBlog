import { ReactNode } from "react";
import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import { PublicBlogContext } from "./PublicBlogContext";
import { GET_PUBLIC_POSTS_BY_BLOG } from "../gql/posts/getPublicPostsByBlog";
import { PublicBlogContextType } from "../types/PublicBlogContextType";
import { BlogData } from "../types/Blogdata";
import { PostData } from "../types/PostData";



interface PublicBlogProviderProps {
  children: ReactNode;
}

interface PublicPost {
  id: string;
  author: string;
  name: string;
  description: string;
  slug: string;
  categories: string[];
  posts: string[];
  logo: string | null;
  blog?: BlogData;
}

interface GetPublicPostsByBlogResponse {
  getPublicPostsByBlog: PublicPost[];
}

export function PublicBlogProvider({ children }: PublicBlogProviderProps) {
  const { blogSlug } = useParams<{ blogSlug: string }>();

  const { data, loading, error } = useQuery<GetPublicPostsByBlogResponse>(
    GET_PUBLIC_POSTS_BY_BLOG,
    {
      variables: { blogSlug: blogSlug || "" },
      skip: !blogSlug,
    },
  );

   // Extraction des données avec valeurs par défaut
  const posts = data?.getPublicPostsByBlog ?? [];
  const blog = posts.length > 0 ? posts[0].blog ?? null : null;

  const value: PublicBlogContextType = {
    blog,
    posts: posts as unknown as PostData[],
    loading,
    error: error ?? null,
  };


  return (
    <PublicBlogContext.Provider value={value}>
      {children}
    </PublicBlogContext.Provider>
  );
}
