import { Resolver, Mutation, Arg, Query, Ctx, ID } from 'type-graphql';
import { Post } from '../entities/Post';
import { PostInput } from '../inputs/post/PostInput';
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { Tag } from '../entities/Tag';
import { FindOptionsWhere, In } from 'typeorm';
import { Context } from 'vm';
import { UpdatePostInput } from '../inputs/post/UpdatePostInput';


@Resolver(Post)
export class PostResolver {

    @Mutation(() => Post)
    async createPost(
      @Ctx() ctx: Context,
      @Arg("data") data: PostInput
    ): Promise<Post> {

      if(!ctx.currentUser) {
        throw new Error("Utilisateur non connecté");
      }

        try {
            const existing = await Post.findOneBy({ title: data.title });
            if (existing) {
              throw new Error("Un article existe déjà avec ce nom.");
            }

            const currentUser = await User.findOneBy({ id: ctx.currentUser.id });
            if (!currentUser) {
              throw new Error("Auteur introuvable");
            }

            const category = await Category.findOneBy({ id: data.categoryId });
            if (!category) {
              throw new Error("Catégorie introuvable.");
            }

            const tags = await Tag.findBy({ id: In(data.tagIds || []) });

            const post = Post.create({
              ...data,
              author: currentUser,
              category: category,
              tags:tags
            });
        
            await post.save();
            return post;
        
          } catch (error) {
            throw new Error( "Erreur lors de la création de l'article : " + error.message);
          }
    }

    @Mutation(() => Post)
    async updatePost(
      @Arg("id") id: number,
      @Arg("data", () => UpdatePostInput) data: UpdatePostInput
    ): Promise<Post> {
      try {
        let post = await Post.findOneOrFail({ 
          where: {id},
          relations: ["author", "category", "tags"]
         });

        if (data.categoryId) {
          const category = await Category.findOneByOrFail({ id: data.categoryId });
          post.category = category;
        }

        if (data.tagIds) {
          const tags = await Tag.findBy({ id: In(data.tagIds) });
          post.tags = tags;
        }

        // Object.assign(post, data);
        Post.merge(post, {
          ...data,
          author: post.author,
          category: post.category,
          tags: post.tags
        });

        await post.save();

        return post;
      } catch (err) {
        console.error("❌ Erreur lors de la modification de l\'article:", err);
        throw new Error("Impossible de modifier l\'article");
      }
  }

    @Query(() => Post)
    async getPostById(@Arg('id') postId: number) {
      return await Post.findOne({
        where: { id: postId },
        relations: ["author", "category", "tags"]
      });
    }

    @Query(()=> [Post])
    async getPosts(
      @Ctx() ctx: Context, 
      @Arg("skip", { defaultValue: 0 }) skip: number,
      @Arg("take", { defaultValue: 20 }) take: number,
      @Arg("categoryId", { nullable: true }) categoryId?: number, 
    )
    { 
      if(!ctx.currentUser) {
        throw new Error("Utilisateur non connecté");
      }
      const where: FindOptionsWhere<Post> = {};

      where.author = { id: ctx.currentUser.id };
      if (categoryId) {
        where.category = { id: categoryId };
      }

      const posts = await Post.find({
        skip,
        take,
        where,
        order: { createdAt: "DESC" },
        relations: ["author", "category", "tags"]
      });
      return posts;
    }

      @Mutation(() => ID)
      async deletePost(@Arg("id") id: number) {
        try {
          const post = await Post.findOneBy({ id });
          if (!post) throw new Error("Article introuvable.");
    
          await Post.delete(id);
          return id;
        } catch (err) {
          throw new Error(`Erreur lors de la suppression de l'article ${err instanceof Error ? ` : ${err.message}` : ''}`);
        }
      }
}
