import { useAuth } from "../../hooks/useAuth";

export function Profile() {
  const { user } = useAuth();
  return (
    <>
      <div>Mon profil</div>
      <h1>
        Bienvenue {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : ""}!
      </h1>
    </>
  );
}
