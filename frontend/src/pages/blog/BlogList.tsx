import { useState, useEffect } from "react";
import ArticleCard from "../../components/blog/ArticleCard";
import { useQuery } from "@apollo/client/react";
import { GET_PUBLIC_POSTS } from "../../gql/posts/getPublicPosts";

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
  comments: number;
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
        take: 50, // Récupérer plus d'articles pour permettre le scroll infini
      },
    }
  );
  const posts = data?.getPublicPosts || [];
  console.log("Posts récupérés :", posts);

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
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="mt-2">Chargement des articles...</p>
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
    <>
      <section className="w-full max-w-7xl mx-auto px-6 pb-20">
        {posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-600">
              Aucun article disponible pour le moment.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-10 m-72">
              <h2 className="text-3xl font-bold text-gray-900">
                Tous les articles ({posts.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
              {posts.slice(0, visibleCount).map((post) => (
                <ArticleCard key={post.id} id={post.id} />
              ))}
            </div>

            {visibleCount < posts.length && (
              <div className="text-center mt-10">
                <p className="text-gray-500">
                  Faites défiler pour voir plus d'articles...
                </p>
              </div>
            )}
          </>
        )}
      </section>
    </>
  );
}
