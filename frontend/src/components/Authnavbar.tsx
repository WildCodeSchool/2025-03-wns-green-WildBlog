import { Link } from "react-router-dom";

interface AuthNavbarProps {
  type: "login" | "signup";
}

function Authnavbar({ type }: AuthNavbarProps) {
  return (
    <nav className= "container mx-auto">
      <h3 className="text-black">Wildblog</h3>
      {type === "login" ? (
        <div className="text-sm">
          Pas encore de compte ? 
          <Link to="/signup" className="link mx-2">
            Créer mon blog
          </Link>
        </div>
      ) : type === "signup" ? (
        <div className="text-sm">
          Déjà un compte ?
          <Link to="/login" className="link  mx-2">
            Se connecter
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

export default Authnavbar;
