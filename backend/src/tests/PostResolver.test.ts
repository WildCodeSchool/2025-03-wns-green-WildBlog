import { PostResolver } from "../resolvers/PostResolver";
import { Post } from "../entities/Post";
import { PostService } from "../services/PostService";
import type { PostInput } from "../inputs/post/PostInput";

type TestContext = { currentUser?: { id: number } };

const resolver = new PostResolver();

describe("PostResolver (unit)", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it("createPost: refuse si l'utilisateur n'est pas connecté", async () => {
    const ctx: TestContext = {};

    await expect(
      resolver.createPost(ctx as never, { title: "t" } as PostInput)
    ).rejects.toThrow("Utilisateur non connecté");
  });

  it("createPost: appelle PostService.createPost si connecté", async () => {
    const ctx: TestContext = { currentUser: { id: 42 } };
    const input = { title: "Hello" } as PostInput;

    const createdPost = Object.assign(new Post(), { id: 1 });
    const createPostSpy = jest
      .spyOn(PostService.prototype, "createPost")
      .mockResolvedValue(createdPost);

    const result = await resolver.createPost(ctx as never, input);

    expect(createPostSpy).toHaveBeenCalledWith(42, input);
    expect(result).toBe(createdPost);
  });

  it("getPosts: refuse si l'utilisateur n'est pas connecté", async () => {
    const ctx: TestContext = {};

    await expect(resolver.getPosts(ctx as never, 0, 20)).rejects.toThrow(
      "Utilisateur non connecté"
    );
  });

  it("getPosts: filtre les posts par auteur (user connecté)", async () => {
    const ctx: TestContext = { currentUser: { id: 7 } };
    jest.spyOn(Post, "find").mockResolvedValue([new Post()]);

    await resolver.getPosts(ctx as never, 0, 20);

    expect(Post.find).toHaveBeenCalledWith({
      skip: 0,
      take: 20,
      where: { author: { id: 7 } },
      order: { createdAt: "DESC" },
      relations: ["author", "category", "tags"],
    });
  });
});
