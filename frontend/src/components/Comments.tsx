import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { GET_COMMENTS_BY_POST, CREATE_COMMENT } from "../gql/comments/comments";
import type { CommentData, CommentInput } from "../types/CommentData";
import { formatDate } from "../utils/date";
import { useAuth } from "../hooks/useAuth";
//import img from "../assets/avatar_base.jpg";

interface GetCommentsData {
  getCommentsByPost: CommentData[];
}

interface CreateCommentData {
  createComment: CommentData;
}

interface CreateCommentVariables {
  data: CommentInput;
}

interface CommentsProps {
  postId: number;
}

export default function Comments({ postId }: CommentsProps) {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState<string>("");

  const { data, loading, error, refetch } = useQuery<GetCommentsData>(GET_COMMENTS_BY_POST, {
    variables: { postId },
    errorPolicy: 'all'
  });

  const [createComment, { loading: createLoading }] = useMutation<CreateCommentData, CreateCommentVariables>(
    CREATE_COMMENT,
    {
      onCompleted: () => {
        setNewComment("");
        refetch();
      },
      onError: (error) => {
        console.error("Erreur lors de la création du commentaire:", error);
      }
    }
  );

  const handleAddComment = async () => {
    if (!user) {
      alert("Vous devez être connecté pour commenter");
      return;
    }

    if (newComment.trim() !== "") {
      try {
        await createComment({
          variables: {
            data: {
              content: newComment,
              postId: postId
            }
          }
        });
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
      }
    }
  };

  if (loading) return <p>Chargement des commentaires...</p>;
  if (error) return <p>Erreur lors du chargement des commentaires : {error.message}</p>;

  const comments = data?.getCommentsByPost || [];

const defaultAvatar = "https://via.placeholder.com/32x32/4A90E2/FFFFFF?text=U";

  return (
    <div className="p-8 m-50 col-start-1 col-end-7 bg-wild-grey rounded-lg shadow-md">
      <h2 className=" mb-6 bg-wild-blue text-white p-2 rounded-lg">
        Commentaires ({comments.length})
      </h2>
      
      {user ? (
        <>
          <textarea
            className="mb-4 w-full h-20 border bg-wild-grey rounded-lg p-2"
            placeholder="Écrivez votre commentaire ici..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="mb-4 px-4 py-2 bg-wild-blue text-white rounded-lg disabled:opacity-50"
            onClick={handleAddComment}
            disabled={createLoading || newComment.trim() === ""}
          >
            {createLoading ? "Ajout en cours..." : "Ajouter un commentaire"}
          </button>
        </>
      ) : (
        <p className="mb-4 text-gray-600">Vous devez être connecté pour commenter.</p>
      )}

      {comments.length === 0 ? (
        <p className="text-gray-500">Aucun commentaire pour le moment. Soyez le premier à commenter !</p>
      ) : (
        <ul>
          {comments.map((comment) => (
            <li key={comment.id} className="mb-2 p-2 border-b flex items-start">
              <img
                src={defaultAvatar}
                alt={`${comment.author.firstName} ${comment.author.lastName}`}
                className="w-8 h-8 rounded-full mr-2 mt-1"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">
                    {comment.author.firstName} {comment.author.lastName}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

