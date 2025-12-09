import { In } from "typeorm";
import dataSource from "../config/data-source";
import { Category } from "../entities/Category";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { PostInput } from "../inputs/post/PostInput";

export class PostService{
    private postRepository = dataSource.getRepository(Post);
    private userRepository = dataSource.getRepository(User);
    private categoryRepository = dataSource.getRepository(Category);
    private tagRepository = dataSource.getRepository(Tag);

    async createPost(userId: number , data: PostInput):Promise<Post>  {
        try {
            const existing = await this.postRepository.findOneBy({ title: data.title });
            if (existing) {
              throw new Error("Un article existe déjà avec ce nom.");
            }

            const currentUser = await this.userRepository.findOneBy({ id: userId });
            if (!currentUser) {
              throw new Error("Auteur introuvable");
            }

            const category = await this.categoryRepository.findOneBy({ id: data.categoryId });
            if (!category) {
              throw new Error("Catégorie introuvable.");
            }

            const tags = await this.tagRepository.findBy({ id: In(data.tagIds || []) });

            const post = this.postRepository.create({
              ...data,
              author: currentUser,
              category: category,
              tags:tags
            });
        
            await this.postRepository.save(post);
            return post;
        
          } catch (error) {
            throw new Error( "Erreur lors de la création de l'article : " + error.message);
          }
    }
}