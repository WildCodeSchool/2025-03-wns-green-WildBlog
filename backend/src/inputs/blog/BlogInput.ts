import { Field, InputType } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class BlogInput {
  @Field()
  @Length(5, 255)
  @IsNotEmpty()
  name: string;

  @Field()
  @Length(10, 1000)
  @IsNotEmpty()
  description: string;
}

