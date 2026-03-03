import { Link } from "react-router-dom";

function App() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Accueil</h1>

      <Link to="/style-guide" className="text-blue-600 underline block">
        Style Guide
      </Link>
      <Link to="/signup" className="text-blue-600 underline mt-4 block">
        Signup
      </Link>
      <Link to="/login" className="text-blue-600 underline mt-4 block">
        Login
      </Link>
      <Link to="/blog" className="text-blue-600 underline block">
        Blog Public
      </Link>
      <Link to="/article" className="text-blue-600 underline mt-4 block">
        Article
      </Link>
      <Link to="/blogUser" className="text-blue-600 underline mt-4 block">
        Blog
      </Link>
    </div>
  );
}

export default App;
