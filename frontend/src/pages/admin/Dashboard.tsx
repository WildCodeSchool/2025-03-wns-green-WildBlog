import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";
import { useQuery } from "@apollo/client/react";
import { CURRENT_USER } from "../../gql/auth/context";
import type { UserData } from "../../types/UserData";

export function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER);

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const user = data?.currentUser;

  console.log(user);

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
