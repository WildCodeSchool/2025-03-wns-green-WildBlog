import { useQuery } from "@apollo/client/react";
import { GET_POST_BY_ID } from "../../gql/posts/getPostById";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date";
import { useImage } from "../../hooks/useImage";

type ArticleProps = {
  post: {
    id: number;
    title: string;
    author: {
      id: number;
      firstName: string;
      lastName: string;
    };
    coverImage: string;
    createdAt: string;
    likesCount: number;
    commentsCount: number;
  };
};

interface GetPostByIdData {
  getPostById: {
    id: number;
    title: string;
    author: {
      id: number;
      firstName: string;
      lastName: string;
    };
    content: string;
    coverImage: string;
    createdAt: string;
    updatedAt: string;
    category: {
      id: number;
      name: string;
    };
    likesCount: number;
    commentsCount: number;
    comments: Array<{ id: number }>;
  };
}

export default function ArticleCard({ post }: ArticleProps) {
  const navigate = useNavigate();

  const numericId = Number(post?.id);

  const { data, loading, error } = useQuery<GetPostByIdData>(GET_POST_BY_ID, {
    variables: { id: numericId },
    skip: !Number.isInteger(numericId),
  });

  const { getImageProps } = useImage(data?.getPostById?.coverImage, {
    fallbackSrc: "/placeholder-image.svg", // Image par défaut dans public/
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Aucun article trouvé</p>;

  const postData = data.getPostById;

  const handleClick = () => {
    navigate(`/article/${post.id}`);
  };

  return (
    <>
      <div
        className="bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-md transition-all max-w-90 w-full overflow-hidden cursor-pointer"
        onClick={handleClick}
      >
        <div className="px-4 pt-3">
          <p className="text-sm font-medium text-gray-800">
            {`${postData.author.firstName} ${postData.author.lastName}`}
          </p>
          <p className="text-xs text-gray-500">
            {formatDate(postData.createdAt)}
          </p>
        </div>
    <div className="bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-md transition-all max-w-90 w-full overflow-hidden cursor-pointer" onClick={handleClick}>
      <div className="px-4 pt-3">
        <p className="text-sm font-medium text-gray-800">
          {`${post.author.firstName} ${post.author.lastName}`}
        </p>
        <p className="text-xs text-gray-500">
          {formatDate(post.createdAt)}
        </p>
      </div>

      <div className="px-4 mt-2">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-44 rounded-lg object-cover"
        />
      </div>

        <div className="px-4 mt-2">
          {data?.getPostById?.coverImage && (
            <img
              {...getImageProps()}
              alt={postData.title}
              className="w-full h-44 rounded-lg object-cover"
            />
          )}
        </div>

        <div className="px-4 py-3">
          <p className="font-semibold text-gray-900 text-[15px] line-clamp-2">
            {postData.title}
          </p>
          <div
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>

        <div className="flex items-center gap-4 px-4 pb-3 text-gray-500 text-sm">
          <div className="flex items-center gap-1 hover:text-red-500 transition-colors">
            <span>🤍</span>
            <span className="font-medium">{postData.likesCount || 0}</span>
            <span className="text-xs">likes</span>
          </div>
          <div className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            <span>💬</span>
            <span className="font-medium">{postData.commentsCount || 0}</span>
            <span className="text-xs">commentaires</span>
          </div>
        </div>
      </div>
    </>
  );
}
