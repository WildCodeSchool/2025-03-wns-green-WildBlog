import type { PostData } from "./PostData";

export type CategoryData = {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt?: Date;
    posts: PostData[]
}