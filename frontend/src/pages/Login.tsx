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
      <div className="max-w-md mx-auto px-4">
        <h3 className="text-center text-black font-medium">Connexion à mon blog</h3>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-wild-text-grey font-medium text-sm">
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                placeholder="Email..."
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>

          <div className="mt-7">
            <div className="flex items-center justify-between">              
              <label htmlFor="password" className="block text-wild-text-grey font-medium text-sm">
              Mot de passe
              </label>
              <div className="text-sm">
                <a href="#" className="block text-wild-text-grey font-medium text-sm">Mot de passe oublié ?</a>
              </div>
            </div>
          
            <div className="mt-2">
              <input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={handleChange}
                value={formData.password}
              />
            </div>
          </div>
  
          <div className="mt-7">
              <button className=" w-full"
                type="submit" disabled={loading}>
                Connexion
              </button>
          </div>
            {error && <p className="text-red-600 text-sm mt-2 text-center">{error.message}</p>}
          </form>
        </div>

      </div>
    </>
  );
}

export default Login;
