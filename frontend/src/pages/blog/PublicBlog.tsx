import { useQuery } from "@apollo/client/react";
import { Link, useParams } from "react-router-dom";
import type { PostData } from "../../types/PostData";
import { GET_PUBLIC_POSTS_BY_BLOG } from "../../gql/posts/getPublicPostsByBlog";
import ArticleCard from "../../components/blog/ArticleCard";
import { formatDate } from "../../utils/date";

interface GetPublicPostsByBlogData {
  getPublicPostsByBlog: PostData[];
}

export function PublicBlog() {
    const { blogSlug } = useParams<{ blogSlug: string; postSlug: string }>();
    const { data, loading, error } = useQuery<GetPublicPostsByBlogData>(GET_PUBLIC_POSTS_BY_BLOG, {
        variables: { blogSlug },
    });

    const publishedpostsByBlog = data?.getPublicPostsByBlog || null;
    console.log(publishedpostsByBlog);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur serveur : {error.message}</p>;

    if (!data?.getPublicPostsByBlog || data?.getPublicPostsByBlog.length === 0) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <h2>😅 Oups…</h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {publishedpostsByBlog?.map((post) => (
                    <div key={post.id} 
                        className="bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-md transition-all w-full overflow-hidden">
                        <div className="px-4 pt-3">
                        <p className="text-sm font-medium text-gray-800">
                            {post.author.lastName}
                        </p>
                        <p className="text-xs text-gray-500">
                            {post.category.name} — {formatDate(post.updatedAt)}
                        </p>
                        </div>

                        {post.coverImage && (
                        <div className="px-4 mt-2">
                            <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-44 rounded-lg object-cover"
                            />
                        </div>
                        )}

                        <Link to={`/blog/${blogSlug}/${post.slug}`}>
                        <div className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-all">
                            <p className="font-semibold text-gray-900 text-[15px] line-clamp-2">
                            {post.title}
                            </p>
                            <div className="text-gray-600 text-xs mt-1 line-clamp-3"
                                dangerouslySetInnerHTML={{ __html: post.content }}>
                            </div>
                        </div>
                        </Link>
                    </div>
                    ))}
                </div>
            </section>

        </>
    )
}