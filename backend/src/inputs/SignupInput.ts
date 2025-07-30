import { Field, InputType } from "type-graphql";
import { IsEmail, Length, MaxLength } from "class-validator";


@InputType()
export class SignupInput {
  @Field()
  @MaxLength(100)
  firstName: string;

  @Field()
  @MaxLength(100)
  lastName: string;

  @Field()
  @IsEmail({}, { message: "L'email fourni est invalide" })
  email: string;

  @Field()
  @Length(6, 255)
  password: string;

}


