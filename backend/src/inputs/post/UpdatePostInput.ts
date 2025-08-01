import { Field, InputType } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class PostInput {
  @Field({ nullable:true})
  @Length(5, 255)
  title: string;

  @Field({ nullable:true})
  @Length(5, 255)
  @IsNotEmpty()
  category: string;

  @Field({ nullable:true})
  @IsNotEmpty()
  coverImage: string;

  @Field({ nullable:true})
  @IsNotEmpty()
  @IsNotEmpty()
  content: string;
}

