import React from "react";
import Authnavbar from "../components/Authnavbar";
import { LOGIN } from "../gql/auth/login";
import { useNavigate } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client/react";
import { AUTH_TOKEN } from "../constants";
import { CURRENT_USER } from "../gql/auth/context";
import type { UserData } from "../types/UserData";
import { useAuth } from "../hooks/useAuth";

interface LoginData {
  Login: string; // le token renvoyé par le backend
}

interface LoginVariables {
  data: {
    email: string;
    password: string;
  };
}

interface CurrentUserData {
  currentUser: UserData;
}

function Login() {
  
  const [formData, setFormData] = React.useState<LoginVariables["data"]>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const client = useApolloClient();
  const { setUser } = useAuth();
  const [login, { loading, error }] = useMutation<LoginData, LoginVariables>(LOGIN);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await login({ variables: { data: formData } });
      if (!data?.Login) return;

      localStorage.setItem(AUTH_TOKEN, data.Login);

      // Refetch CURRENT_USER après que le token soit dans le localStorage
      const { data: userData } = await client.query<CurrentUserData>({
        query: CURRENT_USER,
        fetchPolicy: "network-only", //pour forcer le refetch depuis le serveur, pas depuis le cache d'Apollo
      });

      if (userData?.currentUser) {
        setUser(userData.currentUser);
      }
      navigate("/admin");

    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <>
      <Authnavbar type="login" />
      <h3 className="text-center text-black font-lg text-xl">Connexion</h3>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-10 mt-10">
        <form
          onSubmit={handleSubmit}>
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
                className="w-full"
                />
            </div>

          <div className="mt-7">
              <div className="flex items-center justify-between">              
                <label htmlFor="password" className="block text-wild-text-grey font-medium text-sm">
                Mot de passe
                </label>
                {/* FIXME : Mot de passe oublié à mettre en place */}
                {/* <div className="text-sm">
                  <a href="#" className="block text-wild-text-grey font-medium text-sm">Mot de passe oublié ?</a>
              </div> */}
            </div>
          
            <div className="mt-2">
              <input
                type="password"
                name="password"
                placeholder="Password..."
                onChange={handleChange}
                value={formData.password}
                className="w-full"
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

    </>
  );
}

export default Login;
