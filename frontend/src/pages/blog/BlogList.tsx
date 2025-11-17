import { useState, useEffect } from "react";
import ArticleCard from "../../components/blog/ArticleCard";
import { useParams } from "react-router-dom";

interface ArticleCards {
    id: number;
    title: string;
    image: string;
    content: string;
    author: string;
    date: string;
    category: string;
}

const articles: ArticleCards[] = [
  {
    id: 1,
    title: "Les secrets du développement durable",
    image: "https://picsum.photos/600/400?random=1",
    content:
      "Découvre comment les entreprises réinventent leurs modèles pour un avenir plus vert.",
    author: "Marie Dupont",
    date: "2025-10-29",
    category: "Écologie",
  },
  {
    id: 2,
    title: "L'intelligence artificielle dans le quotidien",
    image: "https://picsum.photos/600/400?random=2",
    content:
      "Comment l'IA transforme nos habitudes et nos outils du quotidien.",
    author: "Alexandre Morel",
    date: "2025-10-20",
    category: "Technologie",
  },
  {
    id: 3,
    title: "Voyager autrement : le slow travel",
    image: "https://picsum.photos/600/400?random=3",
    content: "Prendre son temps pour redécouvrir le plaisir de voyager.",
    author: "Sarah Benali",
    date: "2025-10-15",
    category: "Voyage",
  },
  {
    id: 4,
    title: "Le design éthique et responsable",
    image: "https://picsum.photos/600/400?random=4",
    content:
      "Comment penser le design en respectant l'environnement et les utilisateurs.",
    author: "Léo Bernard",
    date: "2025-10-10",
    category: "Design",
  },
  {
    id: 5,
    title: "Les métiers du web en 2025",
    image: "https://picsum.photos/600/400?random=5",
    content:
      "Une exploration des compétences les plus recherchées dans le monde numérique.",
    author: "Claire Rousseau",
    date: "2025-10-05",
    category: "Carrière",
  },
  {
    id: 6,
    title: "L'économie circulaire : un modèle d'avenir",
    image: "https://picsum.photos/600/400?random=6",
    content:
      "L'économie circulaire s'impose comme une alternative durable au modèle linéaire traditionnel.",
    author: "Julien Caron",
    date: "2025-09-30",
    category: "Écologie",
  }
];

export default function BlogList() {
  const { id } = useParams<{ id: string }>();
  const [listArticles, setListArticles] = useState<ArticleCards | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    if (id) {
      const foundArticle = articles.find(article => article.id === parseInt(id));
      setListArticles(foundArticle || null);
    }

    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100;

      if (bottom && visibleCount < articles.length) {
        setVisibleCount((prev) => prev + 3);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, id]);

  return (
    <>
      <section
        className="w-full max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <div className="flex flex-col justify-center space-y-6">
          <h1
            className="text-5xl font-extrabold text-gray-900 leading-tight"
          >
            {listArticles?.title}
          </h1>
          <p
            className="text-gray-600 text-base leading-relaxed max-w-xl"
          >
            {listArticles?.content}
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <img
            src={listArticles?.image}
            alt={listArticles?.title}
            className="object-cover w-[400px] h-[500px] rounded-none"
          />
        </div>
      </section>

      <section className="w-full max-w-7xl mx-auto px-6 pb-20">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center"
        >
          {articles.slice(0, visibleCount).map((article) => (
            <ArticleCard key={article.id} {...article} />
          ))}
        </div>
      </section>
     </>
  );
}
