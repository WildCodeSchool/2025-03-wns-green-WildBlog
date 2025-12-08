import { Label, TextInput } from "flowbite-react";
import { Button } from "../components/dashboard/Button";
import { CREATE_TAG } from "../gql/tags/createTag";
import type { TagData } from "../types/TagData";
import { useMutation } from "@apollo/client/react";
import { GET_ALL_TAGS } from "../gql/tags/getAllTags";
import { useState } from "react";
import type { GraphQLErrorType } from "../types/GraphQlErrorType";


export function TagForm() {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [createTag, { loading }] = useMutation<TagData>(CREATE_TAG);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage(null);

        const form = event.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;

        try {
            await createTag({
                variables: { data: { name } },
                refetchQueries: [{ query: GET_ALL_TAGS }],
                awaitRefetchQueries: true,
            });

            form.reset();
            console.log("Tag créé !");
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
            <div className="flex max-w-md flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Nom du tag</Label>
                    <TextInput
                        id="name"
                        name="name"
                        placeholder="Nom du tag"
                        required
                        color={errorMessage ? "failure" : "gray"}
                        onChange={() => setErrorMessage(null)}
                    />
                    {errorMessage && (
                        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-row gap-3 ml-auto justify-end mt-5">
                <Button
                    type="submit"
                    disabled={loading}
                    label={loading ? "Enregistrement..." : "Enregistrer"}
                />
            </div>
        </form>
    );
}
