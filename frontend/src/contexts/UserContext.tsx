import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { CURRENT_USER } from "../gql/auth/context";
import type { UserData } from "../types/UserData";
import { useQuery } from "@apollo/client/react";

interface UserContextType {
  user: UserData | null;
  loading: boolean;
  error: Error | null;
}

const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  error: null,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER);
  
    return (
      <UserContext.Provider
        value={{
          user: data?.currentUser || null,
          loading,
          error: error ?? null, 
        }}
      >
        {children}
      </UserContext.Provider>
    );
  };
  

export const useUser = () => useContext(UserContext);
