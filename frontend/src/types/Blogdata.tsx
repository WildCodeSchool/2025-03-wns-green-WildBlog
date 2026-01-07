import type { CategoryData } from "./CategoryData";
import type { UserData } from "./UserData";

export type BlogData = {
      id: string;
      author: UserData;
      name: string;
      description: string;
      slug: BlogData;
      categories: CategoryData[];
};