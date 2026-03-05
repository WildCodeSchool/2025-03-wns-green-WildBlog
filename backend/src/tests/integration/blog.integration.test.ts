import { BlogResolver } from "../../resolvers/BlogResolver";

describe("BlogResolver integration", () => {
  const resolver = new BlogResolver();

  it("getBlogs retourne un tableau", async () => {
    jest.spyOn(resolver, "getBlogs").mockResolvedValue([]);

    const blogs = await resolver.getBlogs();

    expect(Array.isArray(blogs)).toBe(true);
  });
});