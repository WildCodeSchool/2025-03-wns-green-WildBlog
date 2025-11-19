
import { Checkbox, Label, Select, TextInput } from "flowbite-react";
import { Button } from "../components/dashboard/Button";
import { TipTapEditor } from "../components/dashboard/TipTapEditor";

export function CreatePostForm() {
    return (
        <form>
            <div className="flex max-w-md flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        <Label htmlFor="email2">Titre de l'article</Label>
                    </div>
                    <TextInput id="email2" type="email" placeholder="name@flowbite.com" required  />
                </div>
                <div> 
                    <div className="mb-2 block">
                        <Label htmlFor="countries">Catégorie</Label>
                    </div>
                    <Select id="categories" required>
                        <option>Catégorie 1</option>
                        <option>Catégorie 2</option>
                        <option>Catégorie 3</option>
                        <option>Catégorie 4</option>
                    </Select>
                </div>
            </div>
                <TipTapEditor/>
                <div className="flex flex-row gap-3 ml-auto justify-end mt-5">
                    <Button label="Enregistrer comme brouillon"></Button>
                    <Button label="Publier"></Button>
                </div>    
        </form>
  );
}
