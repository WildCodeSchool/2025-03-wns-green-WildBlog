import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class LoginInput {

  @Field()
  @IsEmail({}, { message: "L'email fourni est invalide" })
  email: string;

  @Field()
  password: string;
}