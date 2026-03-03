import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client/react";
import { useState, useEffect } from "react";
import Comments from "./Comments";
import { GET_POST_BY_ID } from "../gql/posts/getPostById";
import { LIKE_POST } from "../gql/likes/likes";

interface Post {
  id: number;
  title: string;
  content: string;
  coverImage: string;
  publicationStartDate: string;
  publicationEndDate: string;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  likes: number;
  createdAt?: string;
}

interface GetPostByIdData {
  getPostById: Post;
}

interface LikePostData {
  likePost: {
    likes: number;
  };
}

export default function ArticleDetails() {
  const { id } = useParams<{ id: string }>();
  const [likesCount, setLikesCount] = useState<number>(0);
  const [isLiking, setIsLiking] = useState<boolean>(false);

  const { data, loading, error } = useQuery<GetPostByIdData>(GET_POST_BY_ID, {
    variables: { id: parseInt(id || "0") },
    skip: !id,
    errorPolicy: "all",
  });

  // Update likes count when data changes
  useEffect(() => {
    if (data?.getPostById) {
      setLikesCount(data.getPostById.likes);
    }
  }, [data]);

  const [likePost] = useMutation<LikePostData>(LIKE_POST, {
    onCompleted: (data) => {
      setLikesCount(data.likePost.likes);
    },
    onError: (error) => {
      console.error("Erreur lors du like:", error);
    }
  });
  
  const handleLike = async () => {
    if (isLiking) return; // Empêche les clics multiples
    setIsLiking(true);
    setLikesCount((prev) => prev + 1); // Mise à jour optimiste
    try {
      await likePost({
        variables: { postId: post.id }
      });
      

      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (error) {
      console.error("Erreur lors du like:", error);
      // En cas d'erreur, on remet l'ancien nombre
      setLikesCount((prev) => prev - 1);
    } finally {
      setIsLiking(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wild-orange"></div>
        <p className="mt-2 text-wild-text-grey">Chargement de l'article...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">
        <p>Erreur lors du chargement de l'article</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );
  }

  if (!data?.getPostById) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600">Article introuvable</p>
      </div>
    );
  }

  const post = data.getPostById;

  function renderContent(content: string | undefined): { __html: string | TrustedHTML; } | undefined {
    if (!content) return undefined;
    return { __html: content };
  }

  return (
    <div className="article-container flex:auto flex-col m-10 p-20 max-w-700 md:auto">
      <img
        className="article-image block mx-auto w-150 max-w-200 h-150 mb-10 rounded-lg shadow-lg"
        src={post.coverImage}
        alt={post.title}
      />
      <h2 className="text-3xl font-bold mb-4 text-wild-text-grey">
        {post.title}
      </h2>
      <div className="article-meta mb-6 text-sm text-gray-600">
        <p>
          Par {post.author?.firstName} {post.author?.lastName}
        </p>
        <p>
          Publié le{" "}
          {new Date(
            post.createdAt || post.publicationStartDate || new Date(),
          ).toLocaleDateString("fr-FR")}
        </p>
        <p>Catégorie: {post.category?.name || "Non définie"}</p>
      </div>
      <div
        className="article-text text-start mb-10 prose prose-lg max-w-none"
        dangerouslySetInnerHTML={renderContent(post.content)}
      />
      {post.id && <Comments postId={post.id} />}
      <div className="flex space-x-4">
        <button
          className={`primary ${isLiking ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleLike}
          disabled={isLiking}
        >
          {isLiking ? "💙" : "🤍"} J'aime ({likesCount})
        </button>
      </div>
    </div>
  );
}
