import { Resolver, Mutation, Arg, Int, Ctx, ObjectType, Field, Query } from "type-graphql";
import { Post } from "../entities/Post";
import { Like } from "../entities/Like";
import { User } from "../entities/User";
import AppDataSource from "../config/data-source";
import { v4 as uuidv4 } from 'uuid';

interface Context {
  user?: User;
}

@ObjectType()
class LikePostResponse {
  @Field(() => Int)
  id: number;

  @Field(() => Int)
  likesCount: number;

  @Field(() => Boolean)
  isLiked: boolean;

  @Field(() => String, { nullable: true })
  anonymousId?: string; // Retourner l'ID anonyme pour le frontend
}

@Resolver()
export class LikeResolver {
  @Mutation(() => LikePostResponse)
  async likePost(
    @Arg("postId", () => Int) postId: number,
    @Arg("anonymousId", () => String, { nullable: true }) anonymousId?: string,
    @Ctx() context?: Context
  ): Promise<LikePostResponse> {
    const postRepository = AppDataSource.getRepository(Post);
    const likeRepository = AppDataSource.getRepository(Like);

    const post = await postRepository.findOne({
      where: { id: postId },
      relations: ["likes"]
    });

    if (!post) {
      throw new Error("Post introuvable");
    }

    let currentAnonymousId = anonymousId;
    let existingLike;
    
    if (context?.user) {
      // Utilisateur connecté
      existingLike = await likeRepository.findOne({
        where: {
          post: { id: postId },
          user: { id: context.user.id }
        }
      });
    } else {
      // Utilisateur anonyme
      if (!currentAnonymousId) {
        currentAnonymousId = uuidv4();
      }
      existingLike = await likeRepository.findOne({
        where: {
          post: { id: postId },
          anonymousId: currentAnonymousId
        }
      });
    }

    let isLiked = false;

    if (existingLike) {
      // Retirer le like
      await likeRepository.remove(existingLike);
      isLiked = false;
    } else {
      // Ajouter le like
      const newLike = likeRepository.create({
        post: post,
        user: context?.user || undefined,
        anonymousId: context?.user ? undefined : currentAnonymousId
      });
      await likeRepository.save(newLike);
      isLiked = true;
    }

    // Compter les likes après modification
    const likesCount = await likeRepository.count({
      where: { post: { id: postId } }
    });

    return {
      id: postId,
      likesCount,
      isLiked,
      anonymousId: context?.user ? undefined : currentAnonymousId
    };
  }

   @Query(() => Boolean)
  async isPostLikedByUser(
    @Arg("postId", () => Int) postId: number,
    @Arg("anonymousId", () => String, { nullable: true }) anonymousId?: string,
    @Ctx() context?: Context
  ): Promise<boolean> {
    const likeRepository = AppDataSource.getRepository(Like);
    let existingLike;
    
    if (context?.user) {
      // Utilisateur connecté
      existingLike = await likeRepository.findOne({
        where: {
          post: { id: postId },
          user: { id: context.user.id }
        }
      });
    } else if (anonymousId) {
      // Utilisateur anonyme
      existingLike = await likeRepository.findOne({
        where: {
          post: { id: postId },
          anonymousId: anonymousId
        }
      });
    }

    return !!existingLike;
}
}