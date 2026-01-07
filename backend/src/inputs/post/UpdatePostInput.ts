import { Field, ID, InputType } from "type-graphql";
import { IsNotEmpty, IsOptional, Length } from "class-validator";

@InputType()
export class UpdatePostInput {
  
  @Field({ nullable:true})
  @Length(3, 255)
  title: string;

  @Field(() => ID, { nullable: true })
  @IsOptional()
  categoryId?: number;

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

