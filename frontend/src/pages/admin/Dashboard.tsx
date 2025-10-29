import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useApolloClient } from "@apollo/client/react"; 
import { useAuth } from "../../hooks/useAuth";

export function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const client = useApolloClient();

  const handleLogout = () => {
    logout(setUser, client);
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div>Tableau de bord : à intégrer</div>
      <h1>
        Bienvenue {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : ""}!
      </h1>
      <button onClick={handleLogout}>Déconnexion</button>
    </>
  );
}
