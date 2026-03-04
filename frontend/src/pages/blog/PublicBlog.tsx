import PostCard from "../../components/blog/PostCard";
import { useBlog } from "../../hooks/useBlog";

export function PublicBlog() {
  const { blog, posts, loading, error } = useBlog();

  if (loading) return <p>Loading…</p>;

  if (error instanceof Error) {
    return <p>Erreur serveur : {error.message}</p>;
  }

  if (!posts || posts.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Oups…</h2>
        <p>
          Aucun article publié pour ce blog pour le moment.
          <br />
          Revenez un peu plus tard, il pourrait y avoir du nouveau !
        </p>
      </div>
    );
  }

  if (!blog) return <p>Loading blog…</p>;

  return (
    <>
      <section
        className="cover-image-home-blog w-full flex items-center justify-center mb-10"
        style={{
          minHeight: "300px",
          background:
            "url('https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=') center/cover no-repeat",
        }} // FIXME: personnaliser le bandeau depuis le dashboard
      ></section>

      <section className="w-full max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} blogSlug={blog.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
