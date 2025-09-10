import { InputType, Field } from "type-graphql";
import { Length, IsOptional } from "class-validator";

@InputType()
export class UpdateTagInput {
  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 50, { message: "Le nom doit contenir entre 2 et 50 caractères" })
  name?: string;
}
