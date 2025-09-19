import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

export function Home() {
  const navigate = useNavigate();

  console.log(localStorage.getItem('token'))

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <h1>Welcome !</h1>
      <button onClick={handleLogout}> Déconnexion </button>
    </>
  );
}
