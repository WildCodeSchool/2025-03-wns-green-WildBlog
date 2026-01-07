import { InputType, Field, ID } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class CategoryInput {
  @Field()
  @Length(2, 50, {message: "La catégorie doit contenir entre 2 et 50 caractères"})
  name: string;

  @Field({ nullable:true })
  @Length(2, 300)
  description?: string;

  @Field(() => ID)
  blogId: number;
}