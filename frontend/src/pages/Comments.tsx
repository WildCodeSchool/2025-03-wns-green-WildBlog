import Comments from "../components/Comments";

export default function CommentsPage() {
  return (
    <div className="comments-container p-8 border rounded-lg shadow-md bg-white">
      <h1 className="comments-title mb-6">Comments</h1>
      <Comments />
    </div>
  );
}