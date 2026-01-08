import { useQuery } from "@apollo/client/react";
import { useParams } from "react-router-dom";
import type { PostData } from "../../types/PostData";
import { formatDate } from "../../utils/date";
import { GET_PUBLIC_POST } from "../../gql/posts/getPublicPost";

interface GetPublicPostData {
  getPublicPost: PostData;
}

export function PublicPostDetails() {
    const { blogSlug, postSlug } = useParams<{ blogSlug: string; postSlug: string }>();
    const { data, loading, error } = useQuery<GetPublicPostData>(GET_PUBLIC_POST, {
        variables: { blogSlug, postSlug },
    });

    console.log(blogSlug, postSlug);
    const post = data?.getPublicPost || null;
    console.log(post);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Erreur serveur : {error.message}</p>;

    if (!post) {
        return (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <h2>😅 Oups…</h2>
                <p>
                Aucun article ici...
                Revenez un peu plus tard, il pourrait y avoir du nouveau !
                </p>
            </div>
            );
    }    

    return (
        <>
            <section className="w-full max-w-7xl mx-auto px-6 pb-20">
                        <article className="mx-auto max-w-3xl py-8">
            <h1 className="mb-4 pb-4 text-3xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
                {post.title}
            </h1>
            <p className="text-xs text-wild-text-grey mb-1">
                Auteur: <span className="font-semibold">{post.author.firstName} {post.author.lastName}</span>
            </p>
            <p className="text-xs text-wild-text-grey mb-4">
                {post.updatedAt && post.updatedAt !== post.createdAt
                    ? `Dernière mise à jour le ${formatDate(post.updatedAt)}`
                    : `Créé le ${formatDate(post.createdAt)}`
                }
            </p>
            {post.coverImage && (
            <img
                src={post.coverImage}
                alt={post.title}
                className="mb-8 h-100 w-full object-cover shadow"
            />
            )}
            <div className="prose lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
        </article>
            </section>

        </>
    )
}