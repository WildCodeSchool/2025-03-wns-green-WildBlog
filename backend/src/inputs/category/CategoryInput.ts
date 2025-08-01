import { InputType, Field } from "type-graphql";
import { MaxLength, MinLength, Length} from "class-validator";

@InputType()
export class CategoryInput {
  @Field()
   @Length(2, 50, {message: "Le nom doit contenir entre 2 et 50 caractères"})
  name: string;

  @Field()
  @MinLength(5, { message: "La description doit contenir au moins 5 caractères" })
  @MaxLength(100, { message: "La description est trop longue (max 100 caractères)" })
  description: string;
}