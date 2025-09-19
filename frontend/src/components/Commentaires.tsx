import { useState } from "react";
import img1 from "../assets/femme1.jpg";
import img2 from "../assets/homme1.jpg";
import img3 from "../assets/homme2.jpg";
import img from "../assets/avatar_base.jpg";

export default function Commentaires() { 
    
type profile = {
        id: number;
        name: string;
        avatarUrl: string | typeof img;
    };

type Commentaire = {
        id: number;
        profile: profile | null;
        text: string;
        date: string;
    };


const [profile] = useState<profile | null>({
    id: 0,
    name: "Anonyme",
    avatarUrl: img
});
const [commentaire, setCommentaire] = useState<Commentaire[]>([
    { id: 1, profile: {
        id: 1,
        name: "John Doe",
        avatarUrl: img2
    }, text: "Ceci est un commentaire exemple.", date: "2023-10-01" },
    { id: 2, profile: {
        id: 1,
        name: "Jane Smith",
        avatarUrl: img1
    }, text: "Voici un autre commentaire.", date: "2023-10-02" },
    { id: 3, profile: {
        id: 1,
        name: "Toto Dupont",
        avatarUrl: img3
    }, text: "Nouveau commentaire.", date: "2023-10-10" }
]);

    const [newComment, setNewComment] = useState<string>("");

    const handleAddComment = () => {
        if (newComment.trim() !== "") {
            setCommentaire([
                ...commentaire,
                {
                    id: commentaire.length + 1,
                    profile: profile ? profile : { id: 0, name: "Anonyme", avatarUrl: img },
                    text: newComment,
                    date: new Date().toISOString().split("T")[0],
                },
            ]);
            setNewComment("");
        }
    };

    return (      
        <div className="p-8 commentaire-container col-start-1 col-end-7 bg-wild-grey rounded-lg shadow-md">
            <h1 className="commentaire-title mb-6" style={{ color: "#0034AE" }}>Commentaires</h1>
            <textarea
                className="mb-4 w-full h-15 border rounded-lg p-2"
                style={{ color: "bg-wild-text-grey" }}
                placeholder="écrivez votre commentaire ici..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button
                className="mb-4 px-4 py-2 bg-wild-blue text-white rounded-lg"
                onClick={handleAddComment}
            >
                Ajouter un commentaire
            </button>
                {commentaire.map((c) => (
                    <li key={c.id} className="mb-2 p-2 border-b flex items-center">
                        {c.profile && (
                            <img
                                src={c.profile.avatarUrl}
                                alt={c.profile.name}
                                className="w-8 h-8 rounded-full mr-2"
                            />
                        )}
                        <div>
                            <span className="font-semibold">{c.profile?.name ?? "Anonyme"}</span>{" "}
                            <span className="text-gray-500">{c.date}:</span> {c.text}
                        </div>
                    </li>
                ))}
        </div>
    );
}