import { Field, ID, InputType, Int } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class PostInput {
  @Field()
  @Length(3, 255)
  @IsNotEmpty()
  title: string;

  @Field(() => ID, { nullable: true })
  categoryId?: number;

  @Field(() => [ID], { nullable: true })
  tagIds?: number[];

  @Field()
  @IsNotEmpty()
  coverImage: string;

  @Field()
  @IsNotEmpty()
  content: string;

  @Field({ nullable: true })
  publicationStartDate: Date;

  @Field({ nullable: true })
  publicationEndDate: Date;
  
}

