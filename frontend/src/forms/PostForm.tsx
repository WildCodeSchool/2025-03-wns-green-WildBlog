
import { HelperText, Label, Select, TextInput } from "flowbite-react";
import { Button } from "../components/dashboard/Button";
import { TipTapEditor } from "../components/dashboard/TipTapEditor";
import { useState } from "react";
import { Datepicker } from "flowbite-react";
import { GET_CATEGORIES } from "../gql/categories/getCategories";
import type { CategoryData } from "../types/CategoryData";
import { useQuery } from "@apollo/client/react";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PostFormValues {
  title: string;
  categoryId: number | string | null;
  content: string;
  coverImage?: string | null;
  publicationStartDate?: Date | null;
  publicationEndDate?: Date | null;
}

interface PostFormProps {
  initialValues?: Partial<PostFormValues>;
  onSubmit: (values: PostFormValues) => void; 
}

export function PostForm({initialValues, onSubmit}: PostFormProps) {

    const blogId = useAuth();
    const {data, loading, error} = useQuery<{ getAllCategoriesByBlog: CategoryData[]}>(GET_CATEGORIES,{
        variables: blogId,
        skip: !blogId, 
    });
    const categories = data?.getAllCategoriesByBlog;
    const navigate = useNavigate()

    const defaultContent =  `
        <h2>Titre</h2>
        <p>Contenu de l'article ici...</p>
        Wow, that’s amazing. Good work, boy! 👏
    `
    const initialContent = initialValues?.content || defaultContent;
    const [content, setContent] = useState(initialContent); // contenu TipTap

    const [startDate, setStartDate] = useState<Date | null>(
        initialValues?.publicationStartDate ?? null    
    );
    const [endDate, setEndDate] = useState<Date | null>(
        initialValues?.publicationEndDate ?? null
    );

    //{FIXME : Gérer plus tard le bouton PUBLIER }
    // // const canPublish = startDate !== null && (endDate === null || startDate <= endDate);

    // console.log(canPublish);
    // console.log("date de debut:", startDate)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        onSubmit({
            title: formData.get("title") as string,
            categoryId: formData.get("category") ? Number(formData.get("category")) : null,
            content, 
            coverImage: formData.get("coverImage") as string | null, 
            publicationStartDate: startDate ?? null,
            publicationEndDate: endDate ?? null        
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div className="flex max-w-md flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="coverImage">Image de couverture</Label>
                        <div>
                            <TextInput 
                                type="url" 
                                id="coverImage" 
                                name="coverImage" 
                                placeholder="Image de couverture" 
                                defaultValue={initialValues?.coverImage ?? ""}
                                required />
                            <HelperText className="mt-2 text-xs">Veuillez saisir une url pour votre image de couverture</HelperText>
                        </div>

                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="title">Titre</Label>
                        <TextInput 
                            id="title" 
                            name="title" 
                            placeholder="Titre de l'article" 
                            defaultValue={initialValues?.title}
                            required />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label htmlFor="category">Catégorie</Label>
                            <div className="relative">
                                <Select 
                                    id="category" 
                                    name="category" 
                                    defaultValue={(initialValues?.categoryId) || ""}
                                    >
                                    <option value="" disabled hidden>
                                        Sélectionner une catégorie 
                                    </option>
                                    {categories?.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>                            
                                    ))}
                                </Select>
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <RiArrowDownWideFill />
                                </span>
                            </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="publicationStartDate">Date de début de publication</Label>
                            <Datepicker 
                                key={startDate?.toString() ?? "start-null"}
                                minDate={new Date()}
                                language="fr" labelTodayButton="Aujourd'hui" labelClearButton="Annuler"
                                id="publicationStartDate" name="publicationStartDate" 
                                value={startDate}
                                onChange={date => setStartDate(date ?? null)}
                            />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            <Label htmlFor="publicationEndDate">Date de fin de publication</Label>
                            <Datepicker
                                key={endDate?.toString() ?? "end-null"}
                                minDate={new Date()}
                                language="fr" 
                                labelTodayButton="Aujourd'hui" 
                                labelClearButton="Annuler"
                                id="publicationEndDate" name="publicationEndDate" 
                                value={endDate}
                                onChange={ date => setEndDate(date ?? null )}
                            />
                        </div>
                    </div>
                </div>

                {/* {FIXME} : Aperçu live */}
                {/* <div className="p-4 rounded bg-gray-50  overflow-auto">
                    <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: content }}
                    />
                </div> */}
            </div>
            <TipTapEditor onChangeContent={setContent} defaultContent={initialContent}  />      

            <div className="flex flex-row gap-3 ml-auto justify-end mt-5">
                <Button
                    type="button"
                    label="Annuler"
                    onClick={() => navigate(-1)}
                    >
                </Button>
                <Button 
                    type="submit" 
                    label={initialValues ? "Mettre à jour" : "Enregistrer"} 
                ></Button>
                {/* <Button 
                    label="Publier" 
                    className="bg-wild-orange" 
                    disabled={!canPublish}
                    ></Button> */}
            </div>    
        </form>
  );
}
