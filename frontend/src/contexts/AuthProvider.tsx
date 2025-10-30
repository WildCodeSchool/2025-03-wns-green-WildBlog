import { useEffect, useState, type ReactNode } from "react";
import { useQuery } from "@apollo/client/react";
import { CURRENT_USER } from "../gql/auth/context";
import { AuthContext } from "./AuthContext";
import type { UserData } from "../types/UserData";

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery<{ currentUser: UserData }>(CURRENT_USER);
  const [user, setUser] = useState<UserData | null>(null);

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