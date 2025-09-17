import { useState } from "react";
import img1 from "../assets/femme1.jpg";
import img2 from "../assets/homme1.jpg";
import img3 from "../assets/homme2.jpg";
import img from "../assets/avatar_base.jpg";

type profile = {
        id: number;
        name: string;
        avatarUrl: string | typeof img;
    };

type Comment = {
        id: number;
        profile: profile | null;
        text: string;
        date: string;
    };

export default function Comments() {

const [profile] = useState<profile | null>({
    id: 0,
    name: "Anonyme",
    avatarUrl: img
});
const [comments, setComments] = useState<Comment[]>([
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
            setComments([
                ...comments,
                {
                    id: comments.length + 1,
                    profile: profile ? profile : { id: 0, name: "Anonyme", avatarUrl: img },
                    text: newComment,
                    date: new Date().toISOString().split("T")[0],
                },
            ]);
            setNewComment("");
        }
    };

    return (      
        <div className="p-8 m-50 col-start-1 col-end-7 bg-wild-grey rounded-lg shadow-md">
            <h2 className=" mb-6 bg-wild-blue text-white p-2 rounded-lg">
                Commentaires</h2>
            <textarea
                className="mb-4 w-full h-15 border bg-wild-grey rounded-lg p-2"
                placeholder="écrivez votre commentaire ici..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button
                className="mb-4 px-4 py-2 bg-wild-blue text-white rounded-lg"
                onClick={handleAddComment}
            >
            <ul> Ajouter un commentaire</ul>
            </button>
                {comments.map((c) => (
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