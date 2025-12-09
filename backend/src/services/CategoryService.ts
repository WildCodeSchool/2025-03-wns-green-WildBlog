import { Category } from "../entities/Category";
import dataSource from "../config/data-source";
import { CategoryInput } from "../inputs/category/CategoryInput";
import { UpdateCategoryInput } from "../inputs/category/UpdateCategoryInput";

export class CategoryService {
    private categoryRepository = dataSource.getRepository(Category);

    async createCategory(data: CategoryInput): Promise<Category> {
        const existing = await this.categoryRepository.findOneBy({ name : data.name });
        if (existing) throw new Error("Une catégorie portant ce nom existe déjà.");

        const category = this.categoryRepository.create({ 
            name: data.name, 
            description: data.description 
        });
        return await this.categoryRepository.save(category);
    }

    async updateCategory(id: number, data: UpdateCategoryInput): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOneByOrFail({ id });
            Object.assign(category, data);
            await this.categoryRepository.save(category);
            return category;
            } catch (err) {
                console.error("❌ Erreur lors de la modification de la catégorie:", err);
                throw new Error("Impossible de modifier la catégorie");
            }
    }

    async deleteCategory(id: number) {
        try {
            await this.categoryRepository.findOneByOrFail({ id });
            await this.categoryRepository.delete({ id });

            return id;
            } catch (err) {
                console.error("❌ Erreur lors de la suppression de la catégorie:", err);
                throw new Error("Impossible de supprimer la catégorie");
            }
    }

    async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: ["posts"],
            order: { name: "ASC" }
        });   
    }
}
