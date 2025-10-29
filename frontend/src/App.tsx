import { Link } from "react-router-dom";

function App() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        Accueil
      </h1>

      <Link 
        to="/style-guide" 
        className="text-blue-600 underline block"
      >
        Style Guide
      </Link>

      <Link 
        to="/blog" 
        className="text-blue-600 underline block"
      >
        Blog Public
      </Link>
    </div>
  );
}

export default App;
