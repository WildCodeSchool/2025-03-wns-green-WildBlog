import { Resolver, Mutation, Arg, Query, ID } from "type-graphql";
import { Tag } from "../entities/Tag";
import { TagInput } from "../inputs/tag/TagInput";
import { UpdateTagInput } from "../inputs/tag/UpdateTagInput";

@Resolver(Tag)
export class TagResolver {
  // Création d'un tag
  @Mutation(() => Tag)
  async createTag(@Arg("data") data: TagInput): Promise<Tag> {
    try {
      const isExisting = await Tag.findOneBy({ name: data.name });

    if (isExisting) {
      throw new Error("Ce tag existe déjà.")
    }

    const tag = Tag.create({
      name: data.name,
    });

      await tag.save();
      return tag;
    } catch (err) {
      throw new Error(`Erreur lors de la création du tag ${err instanceof Error ? ` : ${err.message}` : ''}`);
    }
  }

  @Mutation(() => Tag)
  async updateTag(@Arg("id") id: number, @Arg("data") data: UpdateTagInput): Promise<Tag> {
    try {
      const tag = await Tag.findOneBy({ id });
      if (!tag) throw new Error("Tag introuvable.");

      if (data.name && data.name !== tag.name) {
        const existing = await Tag.findOneBy({ name: data.name });
        if (existing) throw new Error("Un tag avec ce nom existe déjà.");
        tag.name = data.name;
      }

      await tag.save();
      return tag;
    } catch (err) {
      throw new Error(`Erreur lors de la modification du tag ${err instanceof Error ? ` : ${err.message}` : ''}`);
    }
  }

  @Mutation(() => ID)
  async deleteTag(@Arg("id") id: number) {
    try {
      const tag = await Tag.findOneBy({ id });
      if (!tag) throw new Error("Tag introuvable.");

      await Tag.delete(id);
      return id;
    } catch (err) {
      throw new Error(`Erreur lors de la suppression du tag ${err instanceof Error ? ` : ${err.message}` : ''}`);
    }
  }

  @Query(() => [Tag])
  async getAllTags(): Promise<Tag[]> {
    try {
      return Tag.find({ order: { name: "ASC" } });
    } catch (err) {
      throw new Error("erreur lors de la recuperation des tags");
    }
  }
}
