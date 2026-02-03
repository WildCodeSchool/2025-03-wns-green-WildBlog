import { createContext } from "react";
import type { PublicBlogContextType } from "../types/PublicBlogContextType";

export const PublicBlogContext = createContext<PublicBlogContextType | null>(null);



