import { useMutation } from "@apollo/client/react";
import { DashboardLayout } from "../../../components/dashboard/DashboardLayout";
import { PostForm } from "../../../forms/PostForm";
import type { PostData } from "../../../types/PostData";
import { CREATE_POST } from "../../../gql/posts/createPost";
import { useNavigate } from "react-router-dom";
import { GET_POSTS } from "../../../gql/posts/getPosts";

export function Create() {
    const [createPost, {loading, error }] = useMutation<PostData>(CREATE_POST);
    const navigate = useNavigate();
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <DashboardLayout>
            <section className="container">
                <h2>Nouvel article</h2>  
                <p className="text-sm text-wild-text-grey my-3">
                    Remplissez les champs et commencez à créer votre article.
                </p>  
            </section> 
            <PostForm
                onSubmit={async (values) => {
                    try{
                        await createPost({ 
                            variables: { data: values },
                            refetchQueries: [{ query: GET_POSTS }],
                            awaitRefetchQueries: true,
                        });
                        navigate("/admin/articles/mes-articles");
                        console.log("Post créé !");
                    } catch (error) {
                        if( error instanceof Error) {
                            console.error("Erreur:", error.message);
                        } else {
                            console.error("Erreur inconnue lors de la crétion :", error);
                        }                    
                    }
                }}
            />        
        </DashboardLayout>
    )
}