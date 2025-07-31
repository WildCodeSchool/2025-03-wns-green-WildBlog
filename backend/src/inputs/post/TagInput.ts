import { InputType, Field } from "type-graphql";
import { MaxLength, MinLength } from "class-validator";

@InputType()
export class TagInput {
  @Field()
  @MinLength(2, { message: "Le nom doit contenir au moins 2 caractères" })
  @MaxLength(10, { message: "Le nom ne peut pas dépasser 10 caractères" })
  name: string;

  @Field()
  @MinLength(5, { message: "La description doit contenir au moins 5 caractères" })
  @MaxLength(100, { message: "La description est trop longue (max 100 caractères)" })
  description: string;
}
