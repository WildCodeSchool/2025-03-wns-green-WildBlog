import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import type { PostData } from "../../types/PostData";
import { GET_PUBLIC_POSTS_BY_BLOG } from "../../gql/posts/getPublicPostsByBlog";
import PostCard from "../../components/blog/PostCard";

interface GetPublicPostsByBlogData {
  getPublicPostsByBlog: PostData[];
}

export function PublicBlog() {
    const { blogSlug } = useParams<{ blogSlug: string; postSlug: string }>();
    const { data, loading, error } = useQuery<GetPublicPostsByBlogData>(GET_PUBLIC_POSTS_BY_BLOG, {
        variables: { blogSlug },
    });

    const publishedpostsByBlog = data?.getPublicPostsByBlog || null;

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur serveur : {error.message}</p>;

    if (!data?.getPublicPostsByBlog || data?.getPublicPostsByBlog.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <h2>Oups…</h2>
                <p>
                Aucun article publié pour ce blog pour le moment.<br />
                Revenez un peu plus tard, il pourrait y avoir du nouveau !
                </p>
            </div>
            );
    }    

    return (
        <>
            <section className="w-full max-w-7xl mx-auto px-6 pb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
                {publishedpostsByBlog?.map((post) => (
                <PostCard
                    key={post.id}
                    post={post}
                    blogSlug={blogSlug}
                />
                ))}
            </div>
            </section>


        </>
    )
}