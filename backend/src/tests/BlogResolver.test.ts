import { BlogResolver } from "../resolvers/BlogResolver";
import { Blog } from "../entities/Blog";
import { User } from "../entities/User";
import type { BlogInput } from "../inputs/blog/BlogInput";

const resolver = new BlogResolver();

describe("BlogResolver (unit)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("createBlog: crée un blog si le nom est unique", async () => {
    const input: BlogInput = { name: "Mon blog", description: "desc" };
    const author = Object.assign(new User(), { id: 1 });

    jest.spyOn(Blog, "findOneBy").mockResolvedValue(null);
    jest.spyOn(User, "findOneBy").mockResolvedValue(author);

    const createdBlog = Object.assign(new Blog(), { ...input, author });
    jest.spyOn(createdBlog, "save").mockResolvedValue(createdBlog);
    jest.spyOn(Blog, "create").mockReturnValue(createdBlog);

    const result = await resolver.createBlog(input);

    expect(Blog.findOneBy).toHaveBeenCalledWith({ name: input.name });
    expect(User.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(Blog.create).toHaveBeenCalledWith({ ...input, author });
    expect(createdBlog.save).toHaveBeenCalled();
    expect(result).toBe(createdBlog);
  });

  it("createBlog: refuse si le nom existe déjà", async () => {
    jest.spyOn(Blog, "findOneBy").mockResolvedValue(new Blog());
    await expect(
      resolver.createBlog({ name: "Dup", description: "x" } as BlogInput)
    ).rejects.toThrow("Un blog existe déjà avec ce nom.");
  });

  it("getBlogs: retourne les blogs avec la relation author", async () => {
    const blogs = [new Blog(), new Blog()];
    jest.spyOn(Blog, "find").mockResolvedValue(blogs);
    const result = await resolver.getBlogs();
    expect(Blog.find).toHaveBeenCalledWith({ relations: ["author"] });
    expect(result).toBe(blogs);
  });
});
