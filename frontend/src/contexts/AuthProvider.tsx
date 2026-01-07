import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { UserData } from "../types/UserData";
import type { BlogData } from "../types/Blogdata";
import { CURRENT_USER } from "../gql/auth/context";
import { useQuery } from "@apollo/client/react";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER);

  const [user, setUser] = useState<UserData | null>(null);
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [blogId, setBlogId] = useState<number | null>(null);

  useEffect(() => {
    if (loading) return;

    const currentUser = data?.currentUser ?? null;
    const currentBlog = currentUser?.blogs?.[0] ?? null;

    setUser(currentUser);
    setBlog(currentBlog);
    setBlogId(currentBlog?.id ? Number(currentBlog.id) : null);
  }, [loading, data]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        blog,
        blogId,
        loading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
