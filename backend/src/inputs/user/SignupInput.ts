import { Field, InputType } from "type-graphql";
import { IsEmail, IsNotEmpty, Length, MaxLength } from "class-validator";

@InputType()
export class SignupInput {
  
  @Field()
  @Length(3, 255)
  @IsNotEmpty()
  blogName: string

  @Field( { nullable: true } )
  @MaxLength(255)
  blogDescription?: string
  
  @Field()
  @MaxLength(100)
  @IsNotEmpty()
  firstName: string;

  @Field()
  @MaxLength(100)
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail({}, { message: "L'email fourni est invalide" })
  @IsNotEmpty()
  email: string;

  @Field()
  @IsNotEmpty()
  password: string;

  @Field()
  @IsNotEmpty()
  repeatPassword: string;
}
