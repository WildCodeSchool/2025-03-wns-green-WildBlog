import { Field, ID, InputType, Int } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class PostInput {
  @Field()
  @Length(5, 255)
  @IsNotEmpty()
  title: string;

  @Field(() => ID)
  categoryId: number;

  @Field(() => [ID], { nullable: true })
  tagIds?: number[];

  @Field()
  @IsNotEmpty()
  coverImage: string;

  @Field()
  @IsNotEmpty()
  content: string;
}

