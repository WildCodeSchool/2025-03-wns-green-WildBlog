import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Category } from "../entities/Category";
import { CategoryInput } from "../inputs/category/CategoryInput";
import { UpdateCategoryInput } from "../inputs/category/UpdateCategoryInput";


@Resolver(Category)
  export class CategoryResolver {

    @Mutation(() => Category)
    async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
      const isExisting = await Category.findOneBy({ name: data.name });

      if (isExisting) {
        throw new Error("Une catégorie portant ce nom existe déjà.")
      }

      const category = Category.create({
        name: data.name,
        description: data.description
      });

      await category.save();
      return category;
  }

  @Mutation(() => Category)
    async updateCategory(
      @Arg("id") id: number,
      @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput
    ): Promise<Category> {
      try {
        const category = await Category.findOneByOrFail({ id });
        Object.assign(category, data);
        await category.save();
        return category;
      } catch (err) {
        console.error("❌ Erreur lors de la modification de la catégorie:", err);
        throw new Error("Impossible de modifier la catégorie");
      }
  }

  @Mutation(() => ID)
  async deleteCategory(@Arg("id") id: number) {
    try {
      await Category.findOneByOrFail({ id });
      await Category.delete({ id });

      return id;
    } catch (err) {
      console.error("❌ Erreur lors de la suppression de la catégorie:", err);
      throw new Error("Impossible de supprimer la catégorie");
    }
  }

  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    return Category.find({ order: { name: "ASC" } });
  }
}
