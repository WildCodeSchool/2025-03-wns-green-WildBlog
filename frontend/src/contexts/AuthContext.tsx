import { createContext, useEffect, useState } from "react";
import { CURRENT_USER } from "../gql/auth/context";
import { useQuery } from "@apollo/client/react";
import type { UserData } from "../types/UserData";
import type { ReactNode } from "react";

type AuthContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    loading: boolean;
    error: unknown;
}

export const AuthContext = createContext<AuthContextType | null>(null); // initialiser le contexte, qui peut être soit de Type AuthContextType soit null au départ.

// Provider qui enveloppe l'app et fournit le user et les fonctions auth
// Children correspond à tous les enfants du composant < AuthProvider />
export function AuthProvider({ children } : { children:ReactNode }) {

  const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER);
  const [user, setUser] = useState<UserData | null>(null);

  // Met à jour le user dès que la query retourne des données
  useEffect(() => {
    if (!loading && data?.currentUser) {
      setUser(data.currentUser);
    }
  }, [loading, data]);
   
    return (
      <AuthContext.Provider value={{ user, setUser, loading, error }}>
        {children}
      </AuthContext.Provider>
    );
  }



