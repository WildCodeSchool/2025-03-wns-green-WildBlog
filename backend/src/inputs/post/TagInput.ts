import { InputType, Field } from "type-graphql";

@InputType()
export class TagInput {
  @Field()
  name: string;

  @Field()
  description: string;
}
