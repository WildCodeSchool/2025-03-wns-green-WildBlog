import { Category } from "../entities/Category";
import dataSource from "../config/data-source";
import { CategoryInput } from "../inputs/category/CategoryInput";
import { UpdateCategoryInput } from "../inputs/category/UpdateCategoryInput";
import { Blog } from "../entities/Blog";

export class CategoryService {
    private categoryRepository = dataSource.getRepository(Category);
    private blogRepository = dataSource.getRepository(Blog);

    async createCategory(data: CategoryInput): Promise<Category> {
        const blog = await this.blogRepository.findOneBy({
            id: data.blogId,
        });

        if (!blog) {
            throw new Error("Blog introuvable");
        }

        const existing = await this.categoryRepository.findOneBy({ name : data.name, blog: {id: blog.id} });
        if (existing) throw new Error("Une catégorie portant ce nom existe déjà.");

        const category = this.categoryRepository.create({ 
            name: data.name, 
            description: data.description ,
            blog,
        });
        return await this.categoryRepository.save(category);
    }

    async updateCategory(id: number, data: UpdateCategoryInput, blogId: number): Promise<Category> {
        try {
            const category = await this.categoryRepository.findOne({
                where: {
                id,
                blog: { id: blogId },
                },
                relations: ["blog"],
            });
            Object.assign(category, data);
            await this.categoryRepository.save(category);
            return category;
            } catch (err) {
                console.error("❌ Erreur lors de la modification de la catégorie:", err);
                throw new Error("Impossible de modifier la catégorie");
            }
    }

    async deleteCategory(id: number, blogId: number) {
        try {
            const category = await this.categoryRepository.findOne({
                where: {
                id,
                blog: { id: blogId },
                },
            });            
            await this.categoryRepository.delete({ id });

            return id;
            } catch (err) {
                console.error("❌ Erreur lors de la suppression de la catégorie:", err);
                throw new Error("Impossible de supprimer la catégorie");
            }
    }

    async getAllCategoriesByBlog(blogId: number): Promise<Category[]> {
        return this.categoryRepository.find({
            where: {
            blog: { id: blogId },
            },
            relations: ["posts"],
            order: { name: "ASC" },
        });
    }
}
