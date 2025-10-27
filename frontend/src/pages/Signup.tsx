import React from "react";
import Authnavbar from "../components/Authnavbar";
import { useMutation } from "@apollo/client/react";
import { SIGNUP } from "../gql/auth/signup";
import { useNavigate } from "react-router-dom";


interface SignupData {
  signUp: {
    id: string;
    blogName:string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface SignupVariables {
  data: {
    blogName:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword:string;
  };
}

function Signup() {
  const [formData, setFormData] = React.useState<SignupVariables["data"]>({
    blogName:"",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    repeatPassword:""
  });

  const navigate = useNavigate();

  const [signUp, { loading, error }] = useMutation<SignupData, SignupVariables>(
    SIGNUP,
    {
      onCompleted: (data) => { // onCompleted : callback fourni par Apollo Client
        console.log("Utilisateur créé :", data.signUp);
        navigate("/login"); 
      },
    }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await signUp({ variables: { data: formData } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Authnavbar type="signup" />
      <h3 className="text-center text-black font-lg text-xl">Créer mon blog</h3>

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-10 mt-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="blogName" className="block text-gray-700 font-medium text-sm">
              Nom du blog
            </label>
            <input
              type="text"
              name="blogName"
              placeholder="Nom du blog..."
              onChange={handleChange}
              value={formData.blogName}
              className="mt-2 w-full "
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lastName" className="block text-gray-700 font-medium text-sm">
                Nom
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Votre nom..."
                onChange={handleChange}
                value={formData.lastName}
                className="mt-2 w-full"
              />
            </div>

            <div>
              <label htmlFor="firstName" className="block text-gray-700 font-medium text-sm">
                Prénom
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Votre prénom..."
                onChange={handleChange}
                value={formData.firstName}
                className="mt-2 w-full "
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium text-sm">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Votre mail..."
              onChange={handleChange}
              value={formData.email}
              className="mt-2 w-full "
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium text-sm">
                Mot de passe
              </label>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe..."
                onChange={handleChange}
                value={formData.password}
                className="mt-2 w-full "
              />
            </div>

            <div>
              <label htmlFor="repeatPassword" className="block text-gray-700 font-medium text-sm">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                name="repeatPassword"
                placeholder="Confirmer le mot de passe..."
                onChange={handleChange}
                value={formData.repeatPassword}
                className="mt-2 w-full "
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full transition mt-4"
            >
              {loading ? "Création en cours..." : "Créer mon compte"}
            </button>
          </div>

          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
      </div>

    </>
  );
}

export default Signup;
