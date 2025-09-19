import { Link } from "react-router-dom";

interface AuthNavbarProps {
  type: "login" | "signup";
}

function Authnavbar({ type }: AuthNavbarProps) {
  return (
    <nav>
      <h3>Wildblog</h3>
      {type === "login" ? (
        <div>
          Pas encore de compte ?{" "}
          <Link to="/signup" className="link">
            Créer mon blog
          </Link>
        </div>
      ) : type === "signup" ? (
        <div>
          Déjà un compte ?{" "}
          <Link to="/login" className="link">
            Se connecter
          </Link>
        </div>
      ) : null}
    </nav>
  );
}

export default Authnavbar;
