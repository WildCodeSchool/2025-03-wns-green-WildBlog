import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { useQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { GET_POSTS } from "../../gql/posts/getPosts";
import { GET_CATEGORIES } from "../../gql/categories/getCategories";
import { GET_ALL_TAGS } from "../../gql/tags/getAllTags";

interface Post {
  id: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  coverImage?: string;
}

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export function Home() {
  const { user, blogId } = useAuth();
  const navigate = useNavigate();

  // Récupérer les articles
  const { data: postsData, loading: postsLoading } = useQuery<{
    getPosts: Post[];
  }>(GET_POSTS);

  // Récupérer les catégories
  const { data: categoriesData, loading: categoriesLoading } = useQuery<{
    getAllCategoriesByBlog: Category[];
  }>(GET_CATEGORIES, {
    variables: { blogId: blogId || 0 },
    skip: !blogId,
  });

  // Récupérer les tags
  const { data: tagsData, loading: tagsLoading } = useQuery<{
    getAllTags: Tag[];
  }>(GET_ALL_TAGS);

  const posts = postsData?.getPosts || [];
  const categories = categoriesData?.getAllCategoriesByBlog || [];
  const tags = tagsData?.getAllTags || [];

  // Extraire les images uniques
  const mediaImages = posts
    .filter((post) => post.coverImage)
    .map((post) => post.coverImage as string)
    .filter((url, index, self) => self.indexOf(url) === index);

  // Calculer les statistiques
  const totalPosts = posts.length;
  const totalCategories = categories.length;
  const totalTags = tags.length;
  const totalLikes = posts.reduce(
    (sum, post) => sum + (post.likesCount || 0),
    0,
  );
  const totalComments = posts.reduce(
    (sum, post) => sum + (post.commentsCount || 0),
    0,
  );
  const totalMedias = mediaImages.length;

  const isLoading = postsLoading || categoriesLoading || tagsLoading;

  return (
    <>
      <DashboardLayout>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-wild-text-grey">
              Bienvenue{" "}
              {user?.firstName
                ? user.firstName.charAt(0).toUpperCase() +
                  user.firstName.slice(1)
                : ""}
              !
            </h1>
            <p className="text-gray-600 mt-2">Voici un aperçu de votre blog</p>
          </div>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wild-orange"></div>
              <p className="mt-2 text-gray-600">
                Chargement des statistiques...
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {/* Card Articles */}
                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-wild-orange hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Articles
                      </p>
                      <p className="text-3xl font-bold text-wild-text-grey mt-2">
                        {totalPosts}
                      </p>
                    </div>
                    <div className="bg-wild-light-orange rounded-full p-3">
                      <span className="text-2xl">📝</span>
                    </div>
                  </div>
                </div>

                {/* Card Catégories */}
                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-wild-blue hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Catégories
                      </p>
                      <p className="text-3xl font-bold text-wild-text-grey mt-2">
                        {totalCategories}
                      </p>
                    </div>
                    <div className="bg-wild-light-blue rounded-full p-3">
                      <span className="text-2xl">📂</span>
                    </div>
                  </div>
                </div>

                {/* Card Tags */}
                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-wild-green hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">Tags</p>
                      <p className="text-3xl font-bold text-wild-text-grey mt-2">
                        {totalTags}
                      </p>
                    </div>
                    <div className="bg-green-100 rounded-full p-3">
                      <span className="text-2xl">🏷️</span>
                    </div>
                  </div>
                </div>

                {/* Card Likes */}
                <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-red-400 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Total Likes
                      </p>
                      <p className="text-3xl font-bold text-wild-text-grey mt-2">
                        {totalLikes}
                      </p>
                    </div>
                    <div className="bg-red-100 rounded-full p-3">
                      <span className="text-2xl">💙</span>
                    </div>
                  </div>
                </div>

                {/* Card Commentaires */}
                <button
                  onClick={() => navigate("/admin/commentaires")}
                  className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-400 hover:shadow-lg transition-shadow cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Commentaires
                      </p>
                      <p className="text-3xl font-bold text-wild-text-grey mt-2">
                        {totalComments}
                      </p>
                    </div>
                    <div className="bg-purple-100 rounded-full p-3">
                      <span className="text-2xl">💬</span>
                    </div>
                  </div>
                </button>

                {/* Card Média */}
                <button
                  onClick={() => navigate("/admin/medias")}
                  className="bg-white rounded-lg shadow-md p-6 border-t-4 border-cyan-400 hover:shadow-lg transition-shadow cursor-pointer text-left"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm font-medium">
                        Médias
                      </p>
                      <p className="text-3xl font-bold text-wild-text-grey mt-2">
                        {totalMedias}
                      </p>
                    </div>
                    <div className="bg-cyan-100 rounded-full p-3">
                      <span className="text-2xl">🖼️</span>
                    </div>
                  </div>
                </button>
              </div>
            </>
          )}
          </div>
      </DashboardLayout>
    </>
  );
}
