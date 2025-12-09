import { useEffect, useState, useRef } from "react";
import { useMutation } from "@apollo/client/react";
import type { CategoryData } from "../types/CategoryData";
import { CREATE_CATEGORY } from "../gql/categories/createCategory";
import { GET_CATEGORIES } from "../gql/categories/getCategories";
import { Label, Textarea, TextInput } from "flowbite-react";
import { Button } from "../components/dashboard/Button";
import type { GraphQLErrorType } from "../types/GraphQlErrorType";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { UPDATE_CATEGORY } from "../gql/categories/updateCategory";


type CategoryFormProps = {
    selectedCategory?: CategoryData;
    onSuccess?: () => void; 
}


export function CategoryForm({selectedCategory, onSuccess }: CategoryFormProps) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const nameInputRef = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [createCategory, { loading }] = useMutation<CategoryData>(CREATE_CATEGORY);
    const [updateCategory] = useMutation(UPDATE_CATEGORY);

    useEffect(() => {
        if (selectedCategory) {
            setName(selectedCategory.name);
            setDescription(selectedCategory.description ?? "");
            setTimeout(() => {
                nameInputRef.current?.focus();
            }, 50);
        } else {
            setName("");
            setDescription("");
        }
    }, [selectedCategory]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null); 

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const description = (formData.get("description") as string) || null; 

        try {
            if (selectedCategory) {
                await updateCategory({
                    variables: { id: Number(selectedCategory.id), data: { name, description } },
                    refetchQueries: [{ query: GET_CATEGORIES}],
                    awaitRefetchQueries: true
                });
            } else {
                await createCategory({
                    variables: { data: { name, description } },
                    refetchQueries: [{ query: GET_CATEGORIES }],
                    awaitRefetchQueries: true,
                });
            }
        
            form.reset();
            console.log(selectedCategory? "Catégorie mise à jour !" :  "Catégorie créée");
            setName("");
            setDescription("");
            if (onSuccess) onSuccess();
        } catch (err) {
            const error = err as GraphQLErrorType;
            if (error.graphQLErrors?.length) {
                setErrorMessage(error.graphQLErrors[0].message);
            } else if (error.message) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("Erreur inconnue lors de la création");
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>                
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8 gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nom de la catégorie</Label>
                    <TextInput
                        id="name"
                        name="name"
                        placeholder="Nom de la catégorie"
                        value= {name}
                        ref={nameInputRef}
                        required
                        color={errorMessage ? "failure" : "gray"}
                        onChange={(e) => { setName(e.currentTarget.value); setErrorMessage(null); }}
                    />
                    {errorMessage && (
                        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e) => { setDescription(e.currentTarget.value); setErrorMessage(null); }}
                        placeholder="Description ici"
                    />
                </div>
            </div>
            <div className="flex flex-row gap-3 ml-auto justify-end mt-5">
                <Button 
                    type="submit" 
                    label={loading ? "Enregistrement..." : selectedCategory ? "Modifier" : "Enregistrer"} 
                    icon={HiOutlinePlusSmall}
                    disabled={loading}/>
            </div>
        </form>
    );
}
