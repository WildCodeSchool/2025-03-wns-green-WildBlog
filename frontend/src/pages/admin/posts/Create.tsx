import { Button } from "../../../components/dashboard/Button";
import { DashboardLayout } from "../../../components/dashboard/DashboardLayout";
import { TipTapEditor } from "../../../components/dashboard/TipTapEditor";
import { CreatePostForm } from "../../../forms/CreatePostForm";

export function Create() {

    return (
        <DashboardLayout>
            <section className="container">
                <h2>Nouvel article</h2>  
                <p className="text-sm text-wild-text-grey my-3">
                    Remplissez les champs et commencez à créer votre article.
                </p>  
            </section> 

            <CreatePostForm/>

            {/* <form action="" method="POST">
                <div>
                    <label htmlFor="name">Titre de l'article</label>
                    <input type="text" name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="email">Enter your email: </label>
                        <select name="catégorie" id="categoryId">
                        <option value="">--Please choose an option--</option>
                        <option value="dog">Dog</option>
                        <option value="cat">Cat</option>
                        <option value="hamster">Hamster</option>
                        <option value="parrot">Parrot</option>
                        <option value="spider">Spider</option>
                        <option value="goldfish">Goldfish</option>
                        </select>
                    </div>

                <TipTapEditor/>

                <div className="flex flex-row gap-3 ml-auto justify-end mt-5">
                    <Button label="Enregistrer comme brouillon"></Button>
                    <Button label="Publier"></Button>
                </div>
            </form> */}

        </DashboardLayout>
    )
}