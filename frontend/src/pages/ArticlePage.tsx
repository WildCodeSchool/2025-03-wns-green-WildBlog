import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { GET_POST_BY_ID } from "../gql/posts/getPostById";
import { formatDate } from "../utils/date";
import { useLikes } from "../hooks/useLikes";
import Comments from "../components/blog/Comments";

interface GetPostByIdData {
  getPostById: {
    id: number;
    title: string;
    author: {
      firstName: string;
      lastName: string;
    };
    content: string;
    coverImage: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
    };
    likesCount: number;
    commentsCount: number;
  };
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const numericId = id ? parseInt(id, 10) : 0;

  const { data, loading, error } = useQuery<GetPostByIdData>(GET_POST_BY_ID, {
    variables: { id: numericId },
    skip: !id,
  });

  const post = data?.getPostById;

  // Utiliser le hook useLikes pour gérer les likes
  const { likesCount, isLiked, isLiking, handleLike } = useLikes(
    numericId,
    post?.likesCount || 0,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-wild-orange"></div>
          <p className="mt-4 text-wild-text-grey">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-wild-text-grey mb-4">
            Article introuvable
          </h1>
          <p className="text-gray-600 mb-6">
            {error
              ? error.message
              : "Cet article n'existe pas ou a été supprimé."}
          </p>
          <button className="primary" onClick={() => navigate("/blog")}>
            Retour au blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header avec bouton retour */}
        <div className="mb-8">
          <button className="ghost mb-4" onClick={() => navigate("/blog")}>
            ← Retour au blog
          </button>
        </div>

        {/* Article */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image de couverture */}
          {post.coverImage && (
            <div className="w-full h-64 md:h-96 relative">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 md:p-8">
            {/* Métadonnées */}
            <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-wild-text-grey">
                  {`${post.author.firstName} ${post.author.lastName}`}
                </span>
                <span>•</span>
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
                <span>•</span>
                <span className="bg-wild-light-blue text-wild-blue px-2 py-1 rounded-full text-xs">
                  {post.category.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className={`primary ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={handleLike}
                  disabled={isLiking}
                >
                  {isLiked ? "💙" : "🤍"} J'aime ({likesCount})
                </button>
              </div>
            </div>

            {/* Titre */}
            <h1 className="text-3xl md:text-4xl font-bold text-wild-text-grey mb-8 leading-tight">
              {post.title}
            </h1>

            {/* Contenu */}
            <div
              className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Actions en bas */}
        <div className="mt-8 flex justify-between items-center">
          <button className="outline" onClick={() => navigate("/blog")}>
            ← Articles précédents
          </button>

          <div className="flex space-x-4">
            <button
              className={`primary ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={handleLike}
              disabled={isLiking}
            >
              {isLiked ? "💙" : "🤍"} J'aime ({likesCount})
            </button>
          </div>
        </div>

        {/* Section des commentaires */}
        <Comments postId={numericId} />
      </div>
    </div>
  );
}
