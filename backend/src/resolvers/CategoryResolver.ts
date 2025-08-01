import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Category } from "../entities/Category";
import { CategoryInput } from "../inputs/category/CategoryInput";

@Resolver(Category)
export class CategoryResolver {

  @Mutation(() => Category)
  async createCategory(@Arg("data") data: CategoryInput): Promise<Category> {
    const isExisting = await Category.findOneBy({ name: data.name });

    if (isExisting) {
      throw new Error("Cette catégorie existe déjà.")
    }

    const category = Category.create({
      name: data.name,
      description: data.description,
    });

    await category.save();
    return category;
}

  @Query(() => [Category])
  async getAllCategories(): Promise<Category[]> {
    return Category.find({ order: { createdAt: "DESC" } });
  }
}