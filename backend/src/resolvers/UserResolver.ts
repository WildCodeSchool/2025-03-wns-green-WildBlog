import { Resolver, Mutation, Query, Arg } from 'type-graphql';
import { User } from '../entities/User';    
import jwt from 'jsonwebtoken';


@Resolver(User)
export class UserResolver {

    @Query(() => [User])
    async getAllUsers(): Promise<User[]> {
        const users = await User.find({
            where: { isActive: true }
        });
        return users;
    }

    @Query(() => User)
    async getUser(@Arg('token') token: string) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { id: number };
        const user = await User.findOne({
          where: { id: payload.id },
          relations: ["posts", "blogs"]
        });
        return user;
      } catch (err) {
        throw new Error("Token invalide");
      }
    }
}