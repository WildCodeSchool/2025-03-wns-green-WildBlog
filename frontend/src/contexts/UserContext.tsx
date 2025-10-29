// import { createContext, useContext } from "react";
// import type { ReactNode } from "react";
// import { CURRENT_USER } from "../gql/auth/context";
// import type { UserData } from "../types/UserData";
// import { useQuery } from "@apollo/client/react";

// interface UserContextType {
//   user: UserData | null;
//   loading: boolean;
//   error: Error | null;
// }

// const UserContext = createContext<UserContextType>({
//   user: null,
//   loading: true,
//   error: null,
// });

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//     const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER);
  
//     return (
//       <UserContext.Provider
//         value={{
//           user: data?.currentUser || null,
//           loading,
//           error: error ?? null, 
//         }}
//       >
//         {children}
//       </UserContext.Provider>
//     );
//   };
  

// export const useUser = () => useContext(UserContext);


import { createContext, useContext, useEffect, useState } from "react";
import { CURRENT_USER } from "../gql/auth/context";
import { useQuery } from "@apollo/client/react";
import type { UserData } from "../types/UserData";
import type { ReactNode } from "react";
import { AUTH_TOKEN } from "../constants";

type AuthContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    loading: boolean;
    error: any;
}

const AuthContext = createContext<AuthContextType | null>(null); // initialiser le contexte, qui peut être soit de Type AuthContextType soit null au départ.
// On crée le contexte Auth, valeur par défaut null

// Provider qui enveloppe l'app et fournit le user et les fonctions auth
// Children correspond à tous les enfants du composant < AuthProvider />
export function AuthProvider({ children } : { children:ReactNode }) {
    const token = localStorage.getItem(AUTH_TOKEN);
    //Si pas de token, on ne lance pas la query
    const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER, {
      skip: !token,
    });    
    
    const [user, setUser] = useState<UserData | null>(null);
  
    // À chaque changement de data, on met à jour le user
    useEffect(() => {
      if (data?.currentUser) {
        setUser(data.currentUser);
      }
    }, [data]);
  
    return (
      <AuthContext.Provider value={{ user, setUser, loading, error }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    return useContext(AuthContext);
  }

