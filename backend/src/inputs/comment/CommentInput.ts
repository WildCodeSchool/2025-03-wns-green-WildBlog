import { Field, ID, InputType, Int } from "type-graphql";
import { IsNotEmpty, Length, IsOptional } from "class-validator";

@InputType()
export class CommentInput {
  @Field()
  @Length(1, 1000)
  @IsNotEmpty()
  content: string;

  @Field(() => Int)
  @IsNotEmpty()
  postId: number;

  @Field({ nullable: true })
  @IsOptional()
  anonymousId?: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(1, 50)
  anonymousName?: string;
}