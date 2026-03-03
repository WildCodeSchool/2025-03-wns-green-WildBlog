import {Field, InputType , Int} from "type-graphql";

@InputType()
export class LikeInput {
  @Field(() => Int)
  postId: number;
}       