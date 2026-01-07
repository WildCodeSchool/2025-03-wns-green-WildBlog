import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Category } from "../entities/Category";
import { CategoryInput } from "../inputs/category/CategoryInput";
import { UpdateCategoryInput } from "../inputs/category/UpdateCategoryInput";
import dataSource from "../config/data-source";
import { CategoryService } from "../services/CategoryService";

@Resolver(Category)
  export class CategoryResolver {

  private categoryService = new CategoryService();

  @Mutation(() => Category)
  async createCategory(
    @Arg("data") data: CategoryInput
  ): Promise<Category> {
    return this.categoryService.createCategory(data);
  }

  @Mutation(() => Category)
    async updateCategory(
      @Arg("id") id: number,
      @Arg("blogId") blogId: number,
      @Arg("data", () => UpdateCategoryInput) data: UpdateCategoryInput
    ): Promise<Category> {
      return this.categoryService.updateCategory(id, data, blogId);
  }

  @Mutation(() => ID)
  async deleteCategory(
    @Arg("id") id: number,
    @Arg("blogId") blogId:number 
  ) {
    return this.categoryService.deleteCategory(id, blogId);
  }

  @Query(() => [Category])
  async getAllCategoriesByBlog(
    @Arg("blogId") blogId: number
  ): Promise<Category[]> {
    return this.categoryService.getAllCategoriesByBlog(blogId);
  }

  @Query(() => Category)
  async getCategoryById(
    @Arg('id') id: number,
    @Arg('blogId') blogId: number
  ) {
    return await Category.findOne({
      where: { 
        id: id,
        blog: { id: blogId} },
      relations: ["posts", "blog"]
    });
  }

}
