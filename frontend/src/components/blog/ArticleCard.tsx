import { useQuery } from "@apollo/client/react";
import { GET_POST_BY_ID } from "../../gql/posts/getPostById";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/date";

type ArticleProps = {
  id: number;
};

interface GetPostByIdData {
  getPostById: {
    title: string;
    author: {
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
    likes: number;
  };
}

export default function ArticleCard({ id }: ArticleProps) {
  console.log("ID passé à ArticleCard:", id);
  const navigate = useNavigate();

  // S'assurer que l'id est un number
  const numericId = typeof id === "string" ? parseInt(id, 10) : id;

  const { data, loading, error } = useQuery<GetPostByIdData>(GET_POST_BY_ID, {
    variables: { id: numericId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Aucun article trouvé</p>;

  const post = data.getPostById;

 const handleClick = () => {
    navigate(`/Article/${id}`);
  }

  return (
    <>
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

      <div className="px-4 py-3">
        <p className="font-semibold text-gray-900 text-[15px] line-clamp-2">
          {post.title}
        </p>
        <div className="prose lg:prose-xl"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />
      </div>

      <div className="flex items-center gap-4 px-4 pb-3 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <span>🤍</span> <span>{post.likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💬</span> <span>{}</span>
        </div>
      </div>
    </div>
    </>
  );

}
