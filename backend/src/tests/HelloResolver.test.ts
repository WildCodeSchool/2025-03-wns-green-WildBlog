import "reflect-metadata";
import { HelloResolver } from '../resolvers/HelloResolver';

describe('HelloResolver', () => {
  let resolver: HelloResolver;

  resolver = new HelloResolver();

  it("should return 'Hello world!'", () => {
    const result = resolver.hello();
    expect(result).toBe('Hello world!');
  });
});
