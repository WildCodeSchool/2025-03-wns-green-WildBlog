import { TagResolver } from "../resolvers/TagResolver";
import { Tag } from "../entities/Tag";
import type { TagInput } from "../inputs/tag/TagInput";

const resolver = new TagResolver();

describe("TagResolver (unit)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("createTag: refuse si un tag avec ce nom existe déjà", async () => {
    jest.spyOn(Tag, "findOneBy").mockResolvedValue(new Tag());

    await expect(resolver.createTag({ name: "JS" } as TagInput)).rejects.toThrow(
      "Ce tag existe déjà."
    );
  });

  it("createTag: crée un tag si le nom est unique", async () => {
    jest.spyOn(Tag, "findOneBy").mockResolvedValue(null);

    const createdTag = Object.assign(new Tag(), { name: "TS" });
    jest.spyOn(createdTag, "save").mockResolvedValue(createdTag);
    jest.spyOn(Tag, "create").mockReturnValue(createdTag);

    const result = await resolver.createTag({ name: "TS" } as TagInput);

    expect(Tag.create).toHaveBeenCalledWith({ name: "TS" });
    expect(createdTag.save).toHaveBeenCalled();
    expect(result).toBe(createdTag);
  });
});
