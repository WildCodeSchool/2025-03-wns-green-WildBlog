import { Resolver, Mutation, Arg, Query, Ctx, ID, Int } from 'type-graphql';
import { Post } from '../entities/Post';
import { PostInput } from '../inputs/post/PostInput';
import { User } from '../entities/User';
import { Category } from '../entities/Category';
import { Tag } from '../entities/Tag';
import { FindOptionsWhere, In } from 'typeorm';
import { Context } from 'vm';
import { UpdatePostInput } from '../inputs/post/UpdatePostInput';
import { PostService } from '../services/PostService';
import { PostStatus } from '../enums/PostStatus';


@Resolver(Post)
export class PostResolver {
    private postService = new PostService;

    @Mutation(() => Post)
    async createPost( @Ctx() ctx: Context, @Arg("data") data: PostInput
    ): Promise<Post> {
      if(!ctx.currentUser) throw new Error("Utilisateur non connecté");
      return this.postService.createPost(ctx.currentUser.id, data);
    }

    @Mutation(() => Post)
    async updatePost(
      @Arg("id", () => Int) id: number,
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
    async getPostById(@Arg('id', () => Int) postId: number) {
      const post = await Post.findOne({
        where: { id: postId },
        relations: ["author", "category", "tags"]
      });

      if (!post) {
        throw new Error("Article introuvable");
      }

      // Vérifier si le post est publié et accessible publiquement
      const now = new Date();
      const isStarted = !post.publicationStartDate || post.publicationStartDate <= now;
      const isNotFinished = !post.publicationEndDate || post.publicationEndDate >= now;
      
      if (!isStarted || !isNotFinished) {
        throw new Error("Cet article n'est pas disponible publiquement");
      }

      return post;
    }

    @Query(()=> [Post])
    async getPosts(
      @Ctx() ctx: Context, 
      @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
      @Arg("take", () => Int, { defaultValue: 20 }) take: number,
      @Arg("categoryId", () => Int, { nullable: true }) categoryId?: number, 
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

    @Query(() => [Post])
    async getPublicPosts(
      @Arg("skip", () => Int, { defaultValue: 0 }) skip: number,
      @Arg("take", () => Int, { defaultValue: 50 }) take: number,
      @Arg("categoryId", () => Int, { nullable: true }) categoryId?: number,
    ) {
      const now = new Date();
      const where: FindOptionsWhere<Post> = {};
      
      if (categoryId) {
        where.category = { id: categoryId };
      }

      // Récupérer tous les posts avec les relations
      const posts = await Post.find({
        skip,
        take: take * 2, // Prendre plus de posts pour compenser le filtrage
        where,
        order: { createdAt: "DESC" },
        relations: ["author", "category", "tags"]
      });

      // Filtrer manuellement les posts publiés
      const publishedPosts = posts.filter(post => {
        const isStarted = !post.publicationStartDate || post.publicationStartDate <= now;
        const isNotFinished = !post.publicationEndDate || post.publicationEndDate >= now;
        return isStarted && isNotFinished;
      });

      // Retourner seulement le nombre demandé après filtrage
      return publishedPosts.slice(0, take);
    }

      @Mutation(() => ID)
      async deletePost(@Arg("id", () => Int) id: number) {
        try {
          const post = await Post.findOneBy({ id });
          if (!post) throw new Error("Article introuvable.");
    
          await Post.delete(id);
          return id;
        } catch (err) {
          throw new Error(`Erreur lors de la suppression de l'article ${err instanceof Error ? ` : ${err.message}` : ''}`);
        }
      }

      @Query(() => Post, { nullable: true })
      async getPublicPost(
        @Arg("blogSlug") blogSlug: string,
        @Arg("postSlug") postSlug: string
      ): Promise<Post | null> {
        try {
          const post = await Post.findOne({
            where: {
              slug: postSlug,
              status: PostStatus.PUBLISHED,
              blog: {
                slug: blogSlug,
              },
            },
            relations: ["blog", "author", "category", "tags"],
          });

          return post;
        } catch (err) {
          console.error("❌ Erreur lors de la récupération des articles:", err);
          return null;
        }
      }

      @Query(() => [Post])
      async getPublicPostsByBlog(
        @Arg("blogSlug") blogSlug: string
      ): Promise<Post[]> {
        return await Post.find({
          where: {
            status: PostStatus.PUBLISHED,
            blog: { slug: blogSlug },
          },
          order: { createdAt: "DESC" },
          relations: ["blog", "author", "category", "tags", "blog.author"],
        });
      }

}
