import { Arg, Mutation } from "type-graphql";
import { LoginInput } from "../inputs/user/LoginInput";
import { User } from "../entities/User";
import { SignupInput } from "../inputs/user/SignupInput";
import  argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { Blog } from "../entities/Blog";

export class AuthResolver {
    @Mutation(() => User)
    async signUp(@Arg("data") data: SignupInput): Promise<User> {
        
        try {
            const existingUser = await User.findOneBy({ email: data.email } );
            if (existingUser) {
                throw new Error("Cette adresse email est déjà utilisée.");
            }
    
            if (data.password.length < 6) {
                throw new Error("Le mot de passe doit contenir au moins 6 caractères.");
            }
            if (data.password !== data.repeatPassword) {
                throw new Error("Les mots de passe ne correspondent pas.");
            }
    
            const hashedPassword = await argon2.hash(data.password);
            const user = User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                isActive: true
            });
            await user.save();

            const blog = Blog.create({
                name: data.blogName,
                author: user, 
              });
            await blog.save();

            const createdUser = await User.findOne({
                where: { id: user.id },
                relations: ["blogs", "blogs.author"],
              });
              
            return createdUser!;

        } catch (error) {
            throw new Error(error.message);
        } 
    }


    @Mutation(() => String)
    async Login(@Arg("data") data: LoginInput) : Promise<String> {
        const user = await User.findOneBy({ email: data.email } );

        if (!user) {
            throw new Error("Aucun utilisateur avec cette adresse email")
        }

        const isValidPassword = await argon2.verify(user.password, data.password);

        if (!isValidPassword) {
            throw new Error("Les identifiants de connexion sont incorrects")
        }
        
        const token = jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            process.env.JWT_SECRET_KEY! as string,
            {  
              expiresIn: "2h"
            }
        )

        return token;
    }
}

