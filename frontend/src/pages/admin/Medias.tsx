import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../../gql/posts/getPosts";

interface Post {
  id: string;
  title: string;
  coverImage?: string;
}

export function Medias() {
  const {
    data: postsData,
    loading,
    error,
  } = useQuery<{
    getPosts: Post[];
  }>(GET_POSTS);

  const posts = postsData?.getPosts || [];

  // Extraire les images uniques avec le titre de l'article associé
  const mediaImagesWithInfo = posts
    .filter((post) => post.coverImage)
    .map((post) => ({
      url: post.coverImage as string,
      title: post.title,
      postId: post.id,
    }))
    .filter(
      (media, index, self) =>
        self.findIndex((m) => m.url === media.url) === index,
    );

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copiée dans le presse-papiers!");
  };

  const handleDownload = (url: string, title: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-wild-text-grey">Médias</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos images uploadées ({mediaImagesWithInfo.length})
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wild-orange"></div>
            <p className="mt-4 text-gray-600">Chargement des médias...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>Erreur lors du chargement des médias</p>
          </div>
        ) : mediaImagesWithInfo.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
            <p className="text-gray-600 text-lg">
              Aucune image n'a été uploadée
            </p>
            <p className="text-gray-500 mt-2">
              Les images de vos articles s'afficheront ici
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mediaImagesWithInfo.map((media, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image Preview */}
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={media.url}
                    alt={media.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>

                {/* Image Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-wild-text-grey truncate mb-2">
                    {media.title}
                  </h3>
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">URL:</p>
                    <p className="text-xs text-gray-600 truncate bg-gray-50 p-2 rounded font-mono">
                      {media.url}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleCopyUrl(media.url)}
                      className="flex-1 bg-wild-blue text-white py-2 px-3 rounded text-sm hover:bg-wild-dark-blue transition-colors font-medium"
                    >
                      📋 Copier
                    </button>
                    <button
                      onClick={() => handleDownload(media.url, media.title)}
                      className="flex-1 bg-wild-orange text-white py-2 px-3 rounded text-sm hover:opacity-90 transition-opacity font-medium"
                    >
                      ⬇️ Télécharger
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
