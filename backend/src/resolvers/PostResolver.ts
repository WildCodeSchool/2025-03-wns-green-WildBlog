import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Post } from '../entities/Post';
import { PostInput } from '../inputs/post/PostInput';
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { Tag } from '../entities/Tag';
import { In } from 'typeorm';


@Resolver(Post)
export class PostResolver {

    @Mutation(() => Post)
    async createPost(@Arg("data") data: PostInput): Promise<Post> {
        try {
            const existing = await Post.findOneBy({ title: data.title });
            if (existing) {
              throw new Error("Un article existe déjà avec ce nom.");
            }
        
            // FIXME: Remplacer ce fakeAuthor par l'utilisateur connecté quand on aura le contexte
            const fakeAuthor = await User.findOneBy({ id: 1 });
            if (!fakeAuthor) {
              throw new Error("Auteur introuvable.");
            }

            const category = await Category.findOneBy({ id: data.categoryId });
            if (!category) {
              throw new Error("Catégorie introuvable.");
            }

            const tags = await Tag.findBy({ id: In(data.tagIds || []) });

            const post = Post.create({
              ...data,
              author: fakeAuthor,
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
      @Arg("data", () => PostInput) data: PostInput
    ): Promise<Post> {
      try {
        const post = await Post.findOneByOrFail({ id });

        if (data.tagIds) {
          const tags = await Tag.findBy({ id: In(data.tagIds) });
          post.tags = tags;
        }

        Object.assign(post, data);
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
      @Arg("skip", { defaultValue: 0 }) skip: number,
      @Arg("take", { defaultValue: 20 }) take: number,
      @Arg("categoryId", { nullable: true }) categoryId?: number, 
      )
    { 
        const where = categoryId ? { category: { id: categoryId } } : {};

        const posts = await Post.find({
            skip,
            take,
            where,
            order: { createdAt: "DESC" },
            relations: ["author", "category", "tags"]
        });
        return posts;
    }


}
