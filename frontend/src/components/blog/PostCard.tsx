import { Link } from "react-router-dom";
import type { PostData } from "../../types/PostData";
import { formatDate } from "../../utils/date";
import { useLikes } from "../../hooks/useLikes";
import { useImage } from "../../hooks/useImage";

interface PostCardProps {
  post: PostData;
  blogSlug?: string;
}

export default function PostCard({ post, blogSlug }: PostCardProps) {
  const { likesCount, isLiked, isLiking, handleLike } = useLikes(
    Number(post.id),
    post.likesCount || 0,
  );

  const { getImageProps } = useImage(post.coverImage, {
    fallbackSrc: "/placeholder-image.svg", // Image par défaut dans public/
  });

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêcher la navigation
    e.stopPropagation();
    handleLike();
  };

  return (
    <div className="post-card-container">
      <Link to={`/blog/${blogSlug}/${post.slug}`} className="post-card-link">
        <article className="post-card">
          <p className="post-card-author">
            Auteur :{" "}
            <span>
              {post.author.firstName} {post.author.lastName}
            </span>
          </p>

          <p className="post-card-date">
            Publié le {formatDate(post.createdAt)}
          </p>

          {post.coverImage && (
            <img
              {...getImageProps()}
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

      {/* Bouton de like en dehors du lien pour éviter la navigation */}
      <div className="post-card-actions">
        <button
          className={`like-button ${isLiked ? "liked" : ""} ${isLiking ? "loading" : ""}`}
          onClick={handleLikeClick}
          disabled={isLiking}
        >
          {isLiked ? "💙" : "🤍"} {likesCount}
        </button>
        <div className="comments-count">💬 {post.commentsCount || 0}</div>
      </div>
    </div>
  );
}
