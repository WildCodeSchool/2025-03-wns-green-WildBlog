import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import { GET_USER_FROM_TOKEN } from '../gql/user/getUserByTokenId';
import { useQuery } from "@apollo/client/react";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserData {
  getUser: User;
}

export function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  console.log(localStorage.getItem('token'))

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const { data, loading, error } = useQuery<UserData>(GET_USER_FROM_TOKEN, {
    variables: { token: token || "" },
    skip: !token, // skip si pas de token
  });

  if (loading) return <p>Loading user...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  console.log("Data:", data);

  return (
    <>
    <div>
      Tableau de bord : à intégrer
    </div>
      <h1>
        Bienvenue {data?.getUser.firstName ? data.getUser.firstName.charAt(0).toUpperCase() + data.getUser.firstName.slice(1) : ""}!
      </h1>    
      <button onClick={handleLogout}> Déconnexion </button>
    </>
  );
}
