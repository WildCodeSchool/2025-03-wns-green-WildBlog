type ArticleProps = {
  id: number;
  title: string;
  image: string;
  content: string;
  author: string;
  date: string;
  category: string;
};

export default function ArticleCard({
  title,
  image,
  content,
  author,
  date,
  category,
}: ArticleProps) {
  return (
    <div
      className="bg-white rounded-[14px] border border-gray-200 shadow-sm hover:shadow-md transition-all max-w-[360px] w-full overflow-hidden"
    >
      <div className="px-4 pt-3">
        <p className="text-sm font-medium text-gray-800">
          {author}
        </p>
        <p className="text-xs text-gray-500">
          {category} – {new Date(date).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
        </p>
      </div>

      <div className="px-4 mt-2">
        <img
          src={image}
          alt={title}
          className="w-full h-44 rounded-lg object-cover"
        />
      </div>

      <div className="px-4 py-3">
        <p className="font-semibold text-gray-900 text-[15px] line-clamp-2">
          {title}
        </p>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {content}
        </p>
      </div>

      <div className="flex items-center gap-4 px-4 pb-3 text-gray-500 text-sm">
        <div className="flex items-center gap-1">
          <span>🤍</span> <span>5</span>
        </div>
        <div className="flex items-center gap-1">
          <span>💬</span> <span>5</span>
        </div>
      </div>
    </div>
  );
}
