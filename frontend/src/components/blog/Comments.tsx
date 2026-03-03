import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { v4 as uuidv4 } from "uuid";
import {
  GET_COMMENTS_BY_POST,
  CREATE_COMMENT,
  DELETE_COMMENT,
} from "../../gql/comments/comments";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/date";

// Gestion de l'ID anonyme (réutilise la même logique que les likes)
const ANONYMOUS_ID_KEY = "wildblog_anonymous_id";

const getAnonymousId = (): string => {
  let anonymousId = localStorage.getItem(ANONYMOUS_ID_KEY);
  if (!anonymousId) {
    anonymousId = uuidv4();
    localStorage.setItem(ANONYMOUS_ID_KEY, anonymousId);
  }
  return anonymousId;
};

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author?: {
    id: number;
    firstName: string;
    lastName: string;
  };
  anonymousId?: string;
  anonymousName?: string;
}

interface GetCommentsByPostData {
  getCommentsByPost: Comment[];
}

interface CreateCommentData {
  createComment: Comment;
}

interface CommentsProps {
  postId: number;
  commentsCount?: number;
}

export default function Comments({ postId, commentsCount }: CommentsProps) {
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");
  const [anonymousName, setAnonymousName] = useState("");

  // Fonction pour générer l'avatar avec les initiales
  const getAvatar = (
    firstName?: string,
    lastName?: string,
    anonymousName?: string,
  ) => {
    if (firstName && lastName) {
      return (
        firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase()
      );
    } else if (anonymousName) {
      return anonymousName.charAt(0).toUpperCase();
    }
    return "A";
  };

  // Fonction pour obtenir le nom d'affichage
  const getDisplayName = (
    firstName?: string,
    lastName?: string,
    anonymousName?: string,
  ) => {
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (anonymousName) {
      return "Utilisateur anonyme";
    }
    return "Utilisateur anonyme";
  };

  // Query pour récupérer les commentaires
  const { data, loading, error, refetch } = useQuery<GetCommentsByPostData>(
    GET_COMMENTS_BY_POST,
    {
      variables: { postId },
      skip: !postId,
    },
  );

  // Mutation pour créer un commentaire
  const [createComment, { loading: isCreating }] =
    useMutation<CreateCommentData>(CREATE_COMMENT, {
      onCompleted: () => {
        setCommentText("");
        setAnonymousName("");
        refetch(); // Recharger les commentaires après création
      },
      onError: (error) => {
        console.error("Erreur lors de la création du commentaire:", error);
        alert("Erreur lors de la publication du commentaire");
      },
    });

  // Mutation pour supprimer un commentaire
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    onCompleted: () => {
      refetch(); // Recharger les commentaires après suppression
    },
    onError: (error) => {
      console.error("Erreur lors de la suppression du commentaire:", error);
      alert("Erreur lors de la suppression du commentaire");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentText.trim()) {
      alert("Veuillez écrire un commentaire");
      return;
    }

    try {
      if (user) {
        // Utilisateur connecté
        await createComment({
          variables: {
            data: {
              content: commentText.trim(),
              postId: postId,
            },
          },
        });
      } else {
        // Utilisateur anonyme
        const storedAnonymousId = getAnonymousId();

        await createComment({
          variables: {
            data: {
              content: commentText.trim(),
              postId: postId,
              anonymousId: storedAnonymousId,
              anonymousName: anonymousName.trim() || null,
            },
          },
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleDelete = async (commentId: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      return;
    }

    try {
      if (user) {
        // Utilisateur connecté
        await deleteComment({
          variables: { id: commentId },
        });
      } else {
        // Utilisateur anonyme
        const storedAnonymousId = getAnonymousId();
        await deleteComment({
          variables: {
            id: commentId,
            anonymousId: storedAnonymousId,
          },
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const comments = data?.getCommentsByPost || [];

  return (
    <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        Commentaires ({commentsCount ?? comments.length})
      </h3>

      {/* Formulaire d'ajout de commentaire */}
      <form onSubmit={handleSubmit} className="mb-8">
        {/* Affichage du profil utilisateur */}
        <div className="mb-4 flex items-center space-x-3">
          <div className="w-10 h-10 bg-wild-orange rounded-full flex items-center justify-center text-white text-sm font-bold">
            {user ? getAvatar(user.firstName, user.lastName) : "A"}
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {user
                ? `${user.firstName} ${user.lastName}`
                : "Utilisateur anonyme"}
            </p>
            {!user && (
              <p className="text-xs text-gray-500">
                Vous commentez en tant qu'invité
              </p>
            )}
          </div>
        </div>

        {/* Champ nom pour les utilisateurs anonymes */}
        {!user && (
          <div className="mb-4">
            <label
              htmlFor="anonymousName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Votre nom (optionnel)
            </label>
            <input
              id="anonymousName"
              type="text"
              value={anonymousName}
              onChange={(e) => setAnonymousName(e.target.value)}
              placeholder="Laissez vide pour rester anonyme"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wild-orange focus:border-wild-orange"
              maxLength={50}
            />
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {user ? "Ajouter un commentaire" : "Votre commentaire"}
          </label>
          <textarea
            id="comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Partagez votre avis..."
            disabled={isCreating}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-wild-orange focus:border-wild-orange resize-none"
            rows={3}
            maxLength={1000}
            required
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {commentText.length}/1000 caractères
          </div>
        </div>

        <button
          type="submit"
          disabled={!commentText.trim() || isCreating}
          className="primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isCreating ? "Publication..." : "Publier le commentaire"}
        </button>
      </form>

      {/* Liste des commentaires */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-wild-orange"></div>
          <p className="mt-2 text-gray-600">Chargement des commentaires...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-500">
          <p>Erreur lors du chargement des commentaires</p>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>Aucun commentaire pour le moment.</p>
          <p className="text-sm">Soyez le premier à commenter !</p>
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="border-l-4 border-wild-light-blue pl-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-wild-orange rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                    {getAvatar(
                      comment.author?.firstName,
                      comment.author?.lastName,
                      comment.anonymousName,
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {getDisplayName(
                        comment.author?.firstName,
                        comment.author?.lastName,
                        comment.anonymousName,
                      )}
                      {!comment.author && (
                        <span className="text-xs text-gray-500 ml-2 font-normal">
                          (Invité)
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Bouton de suppression pour l'auteur ou pour l'utilisateur anonyme qui a écrit le commentaire */}
                {((user &&
                  comment.author &&
                  Number(user.id) === comment.author.id) ||
                  (!user && comment.anonymousId === getAnonymousId())) && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                    title="Supprimer le commentaire"
                  >
                    🗑️
                  </button>
                )}
              </div>

              <div className="mt-3 ml-13">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {comment.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
