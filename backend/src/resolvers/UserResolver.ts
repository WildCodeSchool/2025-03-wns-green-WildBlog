import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../entities/User';    
import { SignupInput } from '../inputs/SignupInput';
import  argon2 from 'argon2';

@Resolver(User)
export class UserResolver {
    
    @Mutation(() => User)
    async signUp(@Arg("data") data: SignupInput): Promise<User> {

        const existing = await User.findOneBy({ email: data.email } );
        if (existing) {
            throw new Error("Email already in use");
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
        return user;
    }
}