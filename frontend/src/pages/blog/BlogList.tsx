import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_PUBLIC_POSTS } from "../../gql/posts/getPublicPosts";
import ArticleCard from "../../components/blog/ArticleCard";

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
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

interface GetPublicPostsData {
  getPublicPosts: Post[];
}

export default function BlogList() {
  const [visibleCount, setVisibleCount] = useState(6);

  const { data, loading, error } = useQuery<GetPublicPostsData>(
    GET_PUBLIC_POSTS,
    {
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      variables: {
        skip: 0,
        take: 50,
      },
    },
  );

  const posts = data?.getPublicPosts || [];

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (bottom && visibleCount < posts.length) {
        setVisibleCount((prev) => prev + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, posts.length]);


  if (loading)
    return (
      <div className="text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-wild-orange"></div>
        <p className="mt-2 text-wild-text-grey">Chargement des articles...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500">
        <p>Impossible de charger les articles</p>
        <p className="text-sm mt-2">{error.message}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">
              Aucun article disponible pour le moment.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-wild-text-grey mb-4">
                Blog WildBlog
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Découvrez nos derniers articles sur divers thématiques.
              </p>
              <div className="mt-6">
                <span className="bg-wild-light-blue text-wild-blue px-4 py-2 rounded-full text-sm font-medium">
                  {posts.length} articles disponibles
                </span>
              </div>
            </div>

            {/* Grille des articles */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(0, visibleCount).map((post) => (
                <ArticleCard post={post} key={post.id} />
              ))}
            </div>

            {/* Infinite scroll indicator */}
            {visibleCount < posts.length && (
              <div className="text-center mt-12">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <div className="w-2 h-2 bg-wild-orange rounded-full animate-pulse"></div>
                  <p>Faites défiler pour voir plus d'articles...</p>
                </div>
              </div>
            )}

            {/* Fin des articles */}
            {visibleCount >= posts.length && posts.length > 6 && (
              <div className="text-center mt-12 p-6 bg-wild-beige rounded-lg">
                <p className="text-wild-text-grey font-medium">
                  Vous avez vu tous nos articles !
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Revenez bientôt pour découvrir de nouveaux contenus.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
