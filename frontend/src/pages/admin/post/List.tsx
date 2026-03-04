import { HiOutlinePlusSmall } from "react-icons/hi2";
import { Button } from "../../../components/dashboard/Button";
import { DashboardLayout } from "../../../components/dashboard/DashboardLayout";
import { PostsTable } from "../../../components/dashboard/tables/PostsTable";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS } from "../../../gql/posts/getPosts";
import type { PostData } from "../../../types/PostData";
import { useNavigate } from "react-router-dom";

export function List() {
  const navigate = useNavigate();

  const { data, loading, error } = useQuery<{ getPosts: PostData[] }>(
    GET_POSTS,
  );
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const posts = data?.getPosts || [];
  const postsCount = posts.length;
  const publishedCount = posts.filter(
    (post: PostData) => post.status === "PUBLISHED",
  ).length;

  return (
    <DashboardLayout>
      <section className="container ">
        <h2>Mes articles</h2>
        <p className="text-sm text-wild-text-grey my-3">
          Bienvenue dans votre tableau de bord des articles. Ici, vous pouvez
          consulter tous vos articles, voir leur statut de publication, et
          suivre leur évolution dans le temps. <br />
          Utilisez le bouton " Créer un article" pour ajouter de nouveaux
          contenus et gérer facilement vos publications.
        </p>
      </section>
      <section>
        <div className="flex flex-row justify-between items-center mt-10">
          <span className="text-xs text-wild-text-grey">
            Tous : {postsCount} | Publiés : {publishedCount}{" "}
          </span>
          <Button
            label="Créer un article"
            icon={HiOutlinePlusSmall}
            onClick={() => navigate("/admin/articles/creer")}
          ></Button>
        </div>
      </section>

      <section className="mt-10 p-6 bg-white rounded-lg">
        <PostsTable posts={posts}></PostsTable>
      </section>
    </DashboardLayout>
  );
}
