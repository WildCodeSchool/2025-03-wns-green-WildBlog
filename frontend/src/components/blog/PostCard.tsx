import { Link } from "react-router-dom";
import type { PostData } from "../../types/PostData";
import { formatDate } from "../../utils/date";

interface PostCardProps {
  post: PostData;
  blogSlug?: string;
}

export default function PostCard({ post, blogSlug }: PostCardProps) {
  return (
    <Link to={`/blog/${blogSlug}/${post.slug}`} className="post-card-link">
        <article className="post-card">
          <p className="post-card-author">
              Auteur : {" "}
              <span>{post.author.firstName} {post.author.lastName}</span>
          </p>

          <p className="post-card-date">
              Publié le {formatDate(post.createdAt)}
          </p>

          {post.coverImage && (
              <img
              src={post.coverImage}
              alt={post.title}
              className="post-card-image"
              />
          )}

          <h3 className="mb-2">{post.title}</h3>

          <div
          className="post-card-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
    </Link>
  );
}
