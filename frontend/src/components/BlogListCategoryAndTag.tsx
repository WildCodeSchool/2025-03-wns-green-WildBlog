import React, { useState } from "react";

type Category = {
    id: number;
    name: string;
    description: string;
};

type Tag = {
    id: number;
    name: string;
};

export default function BlogListCategoryAndTag() {
const [categories] = useState<Category[]>([
    { id: 1, name: "Technologie", description: "Articles sur les dernières avancées technologiques." },
    { id: 2, name: "Santé", description: "Conseils et informations sur la santé et le bien-être." },
    { id: 3, name: "Voyage", description: "Récits et guides de voyage à travers le monde." },
    { id: 4, name: "Sport", description: "Analyses sur divers sports." },
    { id: 5, name: "Beauté", description: "Les derniers produits de beauté." },
    { id: 6, name: "Cuisine", description: "Recettes et astuces culinaires." },
    { id: 7, name: "Finance", description: "Conseils financiers et actualités économiques." },
    { id: 8, name: "Éducation", description: "Ressources et conseils éducatifs." },
    { id: 9, name: "Mode", description: "Tendances et conseils de mode." },
    { id: 10, name: "Art", description: "Explorations artistiques et critiques." }
]);

const [tags] = useState<Tag[]>([
    { id: 1, name: "Itech" },
    { id: 2, name: "Fitness" },
    { id: 3, name: "Voyage" },
    { id: 4, name: "Sport" },
    { id: 5, name: "Beauté" },
    { id: 6, name: "Cuisine" },
    { id: 7, name: "Finance" },
    { id: 8, name: "Éducation" },
    { id: 9, name: "Mode" },
    { id: 10, name: "Art" }
]);

    return (
        <div className="flex:auto flex-col items-center p-20 max-w-800 md:auto">
            <h2 className="text-center text-3 flex-2">Hello, je m'appelle Christophe!</h2>
        <div className="text-center categories-section p-50 mb-8">
                <h3 className="text-1.4 mb-4">Catégories</h3>
                <div className="flex flex-wrap gap-4">
                    {categories.map((category) => (
                        <li key={category.id} className="bg-gray-200 font-bold rounded-full px-3 py-1 text-sm">
                            <span>{category.name}:</span> {category.description}
                        </li>
                    ))}
                </div>
            </div>
            <div className="text-center tags-section p-50 mb-8">
                <h3 className="text-1.4 mb-4">Tags</h3>
                <div className=" flex flex-wrap gap-4">
                    {tags.map((tag) => (
                        <span key={tag.id} className="bg-gray-200 rounded-full px-3 py-1 text-sm">
                            {tag.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}   