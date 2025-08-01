import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class TagInput {
  @Field()
  @Length(2, 50, {message: "Le nom doit contenir entre 2 et 50 caractères"})
  name: string;
}
