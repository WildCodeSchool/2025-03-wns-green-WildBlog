import { Field, ID, InputType } from "type-graphql";
import { IsNotEmpty, Length } from "class-validator";

@InputType()
export class UpdatePostInput {
  @Field({ nullable:true})
  @Length(5, 255)
  title: string;

  @Field(() => ID, { nullable: true })
  categoryId: number;

  @Field(() => [ID], { nullable: true })
  tagIds?: number[];

  @Field({ nullable:true})
  coverImage: string;

  @Field({ nullable:true})
  content: string;

  @Field({ nullable: true })
  publicationStartDate: Date;

  @Field({ nullable: true })
  publicationEndDate: Date;
}

