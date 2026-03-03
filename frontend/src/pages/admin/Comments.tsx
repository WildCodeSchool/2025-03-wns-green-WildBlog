import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { useQuery } from "@apollo/client/react";
import { GET_MY_COMMENTS } from "../../gql/comments/getMyComments";
import { formatDate } from "../../utils/date";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author?: Author;
  anonymousId?: string;
  anonymousName?: string;
}

interface Post {
  id: string;
  title: string;
  comments: Comment[];
}

export function Comments() {
  const { data, loading, error } = useQuery<{
    getPosts: Post[];
  }>(GET_MY_COMMENTS);

  const posts = data?.getPosts || [];

  // Aplatir les commentaires de tous les posts avec le titre du post
  const comments: Array<Comment & { postTitle: string }> = [];
  posts.forEach((post) => {
    if (post.comments) {
      post.comments.forEach((comment) => {
        comments.push({
          ...comment,
          postTitle: post.title,
        });
      });
    }
  });

  // Trier les commentaires par date (les plus récents en premier)
  comments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const getAuthorName = (comment: Comment) => {
    if (comment.author) {
      return `${comment.author.firstName} ${comment.author.lastName}`;
    }
    return comment.anonymousName || "Utilisateur anonyme";
  };

  const getAuthorEmail = (comment: Comment) => {
    if (comment.author) {
      return comment.author.email;
    }
    return comment.anonymousId || "—";
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-wild-text-grey">
            Commentaires
          </h1>
          <p className="text-gray-600 mt-2">
            Commentaires reçus sur vos articles ({comments.length})
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wild-orange"></div>
            <p className="mt-4 text-gray-600">Chargement des commentaires...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>Erreur lors du chargement des commentaires</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-lg">Aucun commentaire</p>
            <p className="text-gray-500 mt-2">
              Les commentaires publié sur vos articles s'afficheront ici
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Auteur
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Email/ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Article
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Commentaire
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comments.map((comment, index) => (
                    <tr
                      key={`${comment.id}-${index}`}
                      className={`border-b ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-wild-light-orange transition-colors`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {getAuthorName(comment)}
                          </p>
                          {!comment.author && (
                            <p className="text-xs text-gray-500">(Invité)</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {getAuthorEmail(comment)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-sm">
                        <p className="truncate text-wild-blue hover:text-wild-dark-blue">
                          {comments.find((c) => c.id === comment.id)?.postTitle}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <p className="line-clamp-2">{comment.content}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(comment.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
