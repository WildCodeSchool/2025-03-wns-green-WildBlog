import {
  Footer,
  FooterCopyright,
  FooterDivider,
} from "flowbite-react";
import { useBlog } from "../../hooks/useBlog";

export function BlogFooter() {
    const { blog } = useBlog();
    const year = new Date().getFullYear();

    const authorName = blog?.author
    ? `${blog.author.firstName} ${blog.author.lastName}`
    : "";

    return (
    <Footer container>
        <div className="w-full text-center">

        <FooterDivider />

        <FooterCopyright
            by={authorName}
            year={year}
        />

        <p className="mt-2 text-sm text-gray-500">
            Powered and secured by{" "}
            <a
            href="/"
            className="hover:underline font-bold"
            >
            WILDBLOG
            </a>
        </p>
        </div>
    </Footer>
    );
}
