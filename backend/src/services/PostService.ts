import { In } from "typeorm";
import dataSource from "../config/data-source";
import { Category } from "../entities/Category";
import { Post } from "../entities/Post";
import { Tag } from "../entities/Tag";
import { User } from "../entities/User";
import { PostInput } from "../inputs/post/PostInput";
import { DEFAULT_CATEGORY_NAME } from "../constants/categoryConstants";


export class PostService{
    private postRepository = dataSource.getRepository(Post);
    private userRepository = dataSource.getRepository(User);
    private categoryRepository = dataSource.getRepository(Category);
    private tagRepository = dataSource.getRepository(Tag);

    async createPost(userId: number , data: PostInput):Promise<Post>  {
        try {
            // const existing = await this.postRepository.findOneBy({ title: data.title });
            // if (existing) {
            //   throw new Error("Un article existe déjà avec ce nom.");
            // }

            const currentUser = await this.userRepository.findOne({
              where: { id: userId },
              relations: ["blogs"]
            });            
            if (!currentUser) {
              throw new Error("Auteur introuvable");
            }

            const blog = currentUser.blogs?.[0];
            if (!blog) throw new Error("Aucun blog trouvé pour cet utilisateur");

            const existing = await this.postRepository.findOne({
                where: {
                    title: data.title,
                    blog: { id: blog.id }
                },
                relations: ["blog"]
            });
            if (existing) {
                throw new Error("Un article existe déjà avec ce nom dans ce blog.");
            }

            // const category = await this.categoryRepository.findOneBy({ 
            //   id: data.categoryId,
              
            // });
            // if (!category) {
            //   throw new Error("Catégorie introuvable.");
            // }

            let category: Category | null = null;
            if (data.categoryId) {
                category = await this.categoryRepository.findOneBy({ id: data.categoryId });
                if (!category) {
                    throw new Error("Catégorie introuvable.");
                }
            } else {
                category = await this.categoryRepository.findOne({
                    where: { blog: { id: blog.id }, name: DEFAULT_CATEGORY_NAME },
                    relations: ["blog"]
                });
                  if (!category) {
                    category = this.categoryRepository.create({
                      name: DEFAULT_CATEGORY_NAME,
                      description: "Catégorie par défaut",
                      blog: blog
                    });
                    await this.categoryRepository.save(category);
                  }
            }

            const tags = await this.tagRepository.findBy({ id: In(data.tagIds || []) });

            const post = this.postRepository.create({
              ...data,
              author: currentUser,
              category: category,
              tags:tags,
              blog
            });
        
            await this.postRepository.save(post);
            return post;
        
          } catch (error) {
            throw new Error( "Erreur lors de la création de l'article : " + error.message);
          }
    }
}