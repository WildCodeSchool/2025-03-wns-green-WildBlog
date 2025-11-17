import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Comments from "./Comments.tsx";
import img from "../assets/image_IT.jpg";

interface Article {
    id: number;
    title: string;
    content: string;
    status?: string;
    scheduledAt?: string;
    publishedAt?: string;
    updatedAt?: string;
    createdAt?: string;
    img?: string;
}

export default function ArticleDetails() {    
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                setLoading(true);
                

            await new Promise(resolve => setTimeout(resolve, 500));
                
            // Données temporaires (à remplacer par un appel API vers le backend)
            const articles: Article[] = [
                 {
                        id: 1,
                        title: "L'IA : entre révolution technologique et défi humain",
                        content: "Paris, 2025 – Longtemps cantonnée aux laboratoires de recherche et aux récits de science-fiction, l'intelligence artificielle (IA) est désormais partout : dans nos téléphones, nos voitures, nos hôpitaux, et même nos foyers. Elle façonne une nouvelle ère, pleine de promesses… mais aussi de questions. Une révolution silencieuse mais omniprésente. Que l'on demande à son assistant vocal de régler le chauffage, qu'un médecin analyse un scanner avec l'aide d'un algorithme, ou qu'un agriculteur optimise l'irrigation de ses champs grâce à des capteurs connectés, l'IA agit déjà en coulisses.",
                        status: "published",
                        publishedAt: "2025-11-15",
                        createdAt: "2025-11-10",
                        img: img
                    },
                    {
                        id: 2,
                        title: "Les défis de la cybersécurité en 2025",
                        content: "La cybersécurité est devenue un enjeu majeur pour les entreprises et les particuliers. Avec l'augmentation des cyberattaques, il est essentiel de mettre en place des mesures de protection efficaces.",
                        status: "published",
                        publishedAt: "2025-11-10",
                        createdAt: "2025-11-05",
                        img: img
                    },
                    {
                        id: 3,
                        title: "Le cloud computing : avenir de l'informatique",
                        content: "Le cloud computing révolutionne la manière dont les entreprises stockent et traitent leurs données. Cette technologie offre flexibilité, scalabilité et économies substantielles.",
                        status: "published",
                        publishedAt: "2025-11-05",
                        createdAt: "2025-11-01",
                        img: img
                    }
                ];
                
                const foundArticle = articles.find(a => a.id === parseInt(id || "0"));
                
                if (foundArticle) {
                    setArticle(foundArticle);
                } else {
                    setError("Article non trouvé");
                }
            } catch (err) {
                setError("Erreur lors du chargement de l'article");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticle();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl">Chargement...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl text-red-500">{error}</p>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-xl">Article non trouvé</p>
            </div>
        );
    }

    return (      
        <div className="article-container flex flex-col m-10 p-20 max-w-[800px] mx-auto">
            <img className="article-image block mx-auto w-[200px] max-w-[300px] h-[200px] mb-10 rounded-lg shadow-lg object-cover"
                src={article.img}
                alt={article.title} />
            <h1 className="text-3xl font-bold text-center mb-6">{article.title}</h1>
            {article.publishedAt && (
                <p className="text-gray-500 text-center mb-4">
                    Publié le {new Date(article.publishedAt).toLocaleDateString('fr-FR')}
                </p>
            )}
            <p className="article-text text-justify mb-10 whitespace-pre-line">
                {article.content}
            </p>
            {/* <Comments articleId={article.id} /> */}
            <Comments />
        </div>
    );
};