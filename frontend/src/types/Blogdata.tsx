import type { CategoryData } from "./CategoryData";
import type { PostData } from "./PostData";
import type { UserData } from "./UserData";

export type BlogData = {
      id: string;
      author: UserData;
      name: string;
      description: string;
      slug: string;
      categories: CategoryData[];
      posts: PostData[];
      logo: string | null;
};