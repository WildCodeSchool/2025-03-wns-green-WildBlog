import { Arg, Mutation } from "type-graphql";
import { LoginInput } from "../inputs/user/LoginInput";
import { User } from "../entities/User";
import { SignupInput } from "../inputs/user/SignupInput";
import  argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export class AuthResolver {
    @Mutation(() => User)
    async signUp(@Arg("data") data: SignupInput): Promise<User> {
        
        const existing = await User.findOneBy({ email: data.email } );
        if (existing) {
            throw new Error("Cette adresse email est déjà utilisée.");
        }

        const hashedPassword = await argon2.hash(data.password);
        
        try {
            const user = User.create({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                isActive: true
            });
            await user.save();
            return user;

        } catch (error) {
            throw new Error( "Erreur lors de la création de l'utilisateur : " + error.message);
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

