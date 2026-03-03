import { Resolver, Mutation, Arg, Query, Ctx, Int } from 'type-graphql';
import { Comment } from '../entities/Comment';
import { CommentInput } from '../inputs/comment/CommentInput';
import { Post } from '../entities/Post';
import { v4 as uuidv4 } from 'uuid';

interface Context {
  currentUser?: any;
}

@Resolver(Comment)
export class CommentResolver {

  @Mutation(() => Comment)
  async createComment(
    @Ctx() ctx: Context,
    @Arg("data") data: CommentInput
  ): Promise<Comment> {
    const post = await Post.findOne({ where: { id: data.postId } });
    if (!post) {
      throw new Error("Article introuvable");
    }

    const comment = new Comment();
    comment.content = data.content;
    comment.post = post;

    if (ctx.currentUser) {
      // Utilisateur connecté
      comment.author = ctx.currentUser;
    } else {
      // Utilisateur anonyme
      if (!data.anonymousName) {
        throw new Error("Un nom est requis pour commenter en tant qu'invité");
      }
      comment.anonymousId = data.anonymousId || uuidv4();
      comment.anonymousName = data.anonymousName;
    }

    return await comment.save();
  }

  @Query(() => [Comment])
  async getCommentsByPost(
    @Arg("postId", () => Int) postId: number
  ): Promise<Comment[]> {
    return await Comment.find({
      where: { post: { id: postId } },
      relations: ["author"],
      order: { createdAt: "ASC" }
    });
  }

  @Mutation(() => Boolean)
  async deleteComment(
    @Ctx() ctx: Context,
    @Arg("id", () => Int) id: number,
    @Arg("anonymousId", () => String, { nullable: true }) anonymousId?: string
  ): Promise<boolean> {
    const comment = await Comment.findOne({ 
      where: { id },
      relations: ["author"]
    });

    if (!comment) {
      throw new Error("Commentaire introuvable");
    }

    // Vérifier les permissions
    if (ctx.currentUser) {
      // Utilisateur connecté - peut supprimer ses propres commentaires
      if (comment.author && comment.author.id !== ctx.currentUser.id) {
        throw new Error("Vous n'avez pas le droit de supprimer ce commentaire");
      }
    } else {
      // Utilisateur anonyme - peut supprimer ses propres commentaires avec l'anonymousId
      if (!anonymousId || comment.anonymousId !== anonymousId) {
        throw new Error("Vous n'avez pas le droit de supprimer ce commentaire");
      }
    }

    await comment.remove();
    return true;
  }
}