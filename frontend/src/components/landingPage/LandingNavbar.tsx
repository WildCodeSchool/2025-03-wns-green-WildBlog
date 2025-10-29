import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="bg-white border-b border-gray-200 sticky top-0 z-50"
    >
      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center"
      >
        <Link
          to="/"
          className="text-xl font-extrabold text-[#0D0C48]"
        >
          WBFactory
        </Link>

        <Link
          to="/blog"
          className="bg-[#0D0C48] text-white text-sm font-medium px-5 py-2 rounded-sm hover:bg-[#14136d] transition"
        >
          Démarrer mon blog
        </Link>
      </div>
    </nav>
  );
}
