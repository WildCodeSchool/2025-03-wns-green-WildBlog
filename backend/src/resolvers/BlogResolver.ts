import { Resolver, Mutation, Arg, Query } from 'type-graphql';
import { Blog } from '../entities/Blog';
import { BlogInput } from '../inputs/blog/BlogInput';
import { User } from '../entities/User';

@Resolver(Blog)
export class BlogResolver {

    @Mutation(() => Blog)
    async createBlog(@Arg("data") data: BlogInput): Promise<Blog> {
        try {
            const existing = await Blog.findOneBy({ name: data.name });
            if (existing) {
              throw new Error("Un blog existe déjà avec ce nom.");
            }
        
            // FIXME: Remplacer ce fakeAuthor par l'utilisateur connecté quand on aura le contexte
            const fakeAuthor = await User.findOneBy({ id: 1 });
            if (!fakeAuthor) {
              throw new Error("Auteur introuvable.");
            }
        
            const blog = Blog.create({
              ...data,
              author: fakeAuthor,
            });
        
            await blog.save();
            return blog;
        
          } catch (error) {
            throw new Error( "Erreur lors de la création du blog : " + error.message);
          }
    }

    @Query(()=> [Blog])
    async getBlogs() {
        const blogs = await Blog.find({
            relations: ["author"]
        });
        return blogs;
    }


}
