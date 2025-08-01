import { Field, InputType } from "type-graphql";
import { Length } from "class-validator";

@InputType()
export class BlogInput {
  @Field()
  @Length(5, 255)
  name: string;

  @Field()
  @Length(10, 1000)
  description: string;
}

