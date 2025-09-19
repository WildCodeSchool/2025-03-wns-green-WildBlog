import React from "react";
import Authnavbar from "../components/Authnavbar";

function Signup() {
  const [formData, setFormData] = React.useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      <Authnavbar type= "signup" />
      <form>
        <input
          type= "text"
          name= "lastname"
          placeholder= "Nom..."
          onChange={handleChange}
          value={formData.lastname}
        />
        <input
          type= "text"
          name= "firstname"
          placeholder= "Prénom..."
          onChange={handleChange}
          value={formData.firstname}
        />
        <input
          type= "email"
          name= "email"
          placeholder= "cc..."
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type= "password"
          name= "password"
          placeholder= "Mot de passe..."
          onChange={handleChange}
          value={formData.password}
        />
        <div>
          <button>Créer mon compte</button>
        </div>
      </form>
    </>
  );
}

export default Signup;