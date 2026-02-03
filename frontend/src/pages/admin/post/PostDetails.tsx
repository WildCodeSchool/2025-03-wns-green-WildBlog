import { useQuery } from "@apollo/client/react";
import { GET_POST_BY_ID } from "../../../gql/posts/getPostById";
import type { PostData } from "../../../types/PostData";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "../../../components/dashboard/DashboardLayout";
import { formatDate } from "../../../utils/date";


export function PostDetails() {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<{ getPostById: PostData }>(GET_POST_BY_ID, {
    variables: { id: Number(id) },
    skip: !id,
    fetchPolicy: "network-only"
  });

  const post = data?.getPostById;
  if (!post) return null;

  console.log(post);

  return (

    <DashboardLayout>
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
    </DashboardLayout>
    
  );
}
