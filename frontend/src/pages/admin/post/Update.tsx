import { useMutation, useQuery } from "@apollo/client/react";
import { DashboardLayout } from "../../../components/dashboard/DashboardLayout";
import { PostForm } from "../../../forms/PostForm";
import type { PostData } from "../../../types/PostData";
import { UPDATE_POST } from "../../../gql/posts/updatePost";
import { GET_POST_BY_ID } from "../../../gql/posts/getPostById";
import { useNavigate, useParams } from "react-router-dom";

interface GetPostByIdResponse {
  getPostById: {
    id: number;
    title: string;
    coverImage?: string;
    content: string;
    category: { id: number; name: string };
    publicationStartDate?: string | null;
    publicationEndDate?: string | null;
  };
}

export function Update() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data, loading, error } = useQuery<GetPostByIdResponse>(GET_POST_BY_ID, {
    variables: { id: id ? Number(id) : -1 },
    skip: !id,  // skip la query si id manquant
    fetchPolicy: "network-only"
  });

  const [updatePost, { loading: updating, error: updateError }] = useMutation<PostData>(UPDATE_POST);
  
  if (!id) return <p>Article introuvable</p>;
  if (loading) return <p>Chargement du post...</p>;
  if (error) return <p>Erreur lors du chargement : {error.message}</p>;

  const post = data!.getPostById;

  return (
    <DashboardLayout>
      <section className="container">
        <h2>Modifier l'article</h2>
      </section>

      <PostForm
        initialValues={{
          title: post.title,
          coverImage: post.coverImage,
          categoryId: Number(post.category.id),
          content: post.content,
          publicationStartDate: post.publicationStartDate ? new Date(post.publicationStartDate) : undefined,
          publicationEndDate: post.publicationEndDate ? new Date(post.publicationEndDate) : undefined,
        }}
        onSubmit={async (values) => {
          try {
            await updatePost({
              variables: {
                id: Number(id),
                data: values,
                refetchQueries: [
                  { query: GET_POST_BY_ID, variables: { id: Number(id) } },
                ],
                awaitRefetchQueries: true,
              },
            });
            navigate("/admin/articles/mes-articles");

          } catch (error) {
            if (error instanceof Error) {
              console.error("Erreur lors de la mise à jour :", error.message);
            } else {
              console.error("Erreur inconnue lors de la mise à jour :", error);
            }
        }
      }}
      />
      {updating && <p>Mise à jour en cours...</p>}
      {updateError && <p>Erreur lors de la mise à jour : {updateError.message}</p>}
    </DashboardLayout>
  );
}
