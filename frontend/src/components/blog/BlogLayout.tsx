import { BlogNavbar } from "./BlogNavBar";
import { PublicBlogProvider } from "../../contexts/PublicBlogProvider";
import { Outlet } from "react-router-dom";
import { BlogFooter } from "./BlogFooter";


export function BlogLayout() {
  return (
    <PublicBlogProvider>
        <BlogNavbar/>
        <main className="pt-16 min-h-screen" id="scroll-to-top">
          <Outlet />
        </main>
        <BlogFooter/>
    </PublicBlogProvider>  );
}



