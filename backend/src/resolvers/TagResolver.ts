import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Tag } from "../entities/Tag";
import { TagInput } from "../inputs/post/TagInput";

@Resolver(Tag)
export class TagResolver {
@Mutation(() => Tag)
async createTag(@Arg("data") data: TagInput): Promise<Tag> {
  const isExisting = await Tag.findOneBy({ name: data.name });

  if (isExisting) {
    throw new Error("Ce tag existe déjà.")
  }

  const tag = Tag.create({
    name: data.name,
    description: data.description,
  });

  await tag.save();
  return tag;
}

  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    return Tag.find({ order: { createdAt: "DESC" } });
  }
}
