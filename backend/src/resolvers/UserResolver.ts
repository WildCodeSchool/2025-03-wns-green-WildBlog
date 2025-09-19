import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { User } from '../entities/User';    

@Resolver(User)
export class UserResolver {

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await User.find({
            where: { isActive: true }
        });
        return users;
    }
}