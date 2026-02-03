import type { BlogData } from "./Blogdata";
import type { PostData } from "./PostData";

export type PublicBlogContextType = {
    blog: BlogData | null;
    posts : PostData[] | null;
    loading: boolean;
    error: Error | null;
}