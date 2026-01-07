import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";
import { CategoryForm } from "../../forms/CategoryForm";
import type { CategoryData } from "../../types/CategoryData";
import { GET_CATEGORIES } from "../../gql/categories/getCategories";
import { CategoriesTable } from "../../components/dashboard/tables/CategoriesTable";
import { useAuth } from "../../hooks/useAuth";

export function Categories() {

  const { blogId } = useAuth();

  const { data, loading, error } = useQuery<{ getAllCategoriesByBlog: CategoryData[] }>(GET_CATEGORIES, {
    variables: { blogId },
    skip: !blogId,
  });

  console.log(data?.getAllCategoriesByBlog);
  const categories = data?.getAllCategoriesByBlog || [];
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | undefined>(undefined);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(categories);
  
  return (
    <DashboardLayout>
      <section className="container">
        <h2>Catégories</h2>  
        <h3 className="text-sm text-wild-text-grey my-3">
          {selectedCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
        </h3>  
      </section> 

      <section className="container">
        <div className="flex-col gap-5 p-6 bg-white rounded-lg border border-wild-border-grey">
          <CategoryForm selectedCategory={selectedCategory} 
            onSuccess={() => setSelectedCategory(undefined)} />
        </div>
      </section>
      
      <section className="mt-10 p-6 bg-white rounded-lg">
        <h3 className="text-sm text-wild-text-grey my-3">Toutes les catégories</h3>  
        <CategoriesTable categories={categories} onEdit={setSelectedCategory} />
      </section>
    </DashboardLayout>
  );
}
