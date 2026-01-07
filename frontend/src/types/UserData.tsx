import type { BlogData } from "./Blogdata";

export type UserData = {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      blogs: BlogData[];
};