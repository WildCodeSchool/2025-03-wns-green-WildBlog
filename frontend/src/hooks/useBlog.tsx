import { useContext } from "react";
import { PublicBlogContext } from "../contexts/PublicBlogContext";

export const useBlog = () => {
  const ctx = useContext(PublicBlogContext);
  if (!ctx) {
    throw new Error("useBlog must be used inside a <PublicBlogProvider>");
  }
  return ctx;
};
