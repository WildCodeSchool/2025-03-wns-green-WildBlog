import React from "react";
import Authnavbar from "../components/Authnavbar";
import { LOGIN } from "../gql/auth/login";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client/react";

// Typage du résultat de la mutation
interface LoginData {
  Login: string; // le token renvoyé par le backend
}

// Typage des variables envoyées à la mutation
interface LoginVariables {
  data: {
    email: string;
    password: string;
  };
}

function Login() {
  const [formData, setFormData] = React.useState<LoginVariables["data"]>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [login, { loading, error }] = useMutation<LoginData, LoginVariables>(
    LOGIN,
    {
      onCompleted: (data) => {
        localStorage.setItem("token", data.Login); // stocke le token dans localStorage
        navigate("/home");  // redirige vers la page d'accueil
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await login({ variables: { data: formData } });
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Authnavbar type="login" />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email..."
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password..."
          onChange={handleChange}
          value={formData.password}
        />
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    </>
  );
}

export default Login;
