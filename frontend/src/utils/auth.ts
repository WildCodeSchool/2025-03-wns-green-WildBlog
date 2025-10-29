import { AUTH_TOKEN } from "../constants";
import type { UserData } from "../types/UserData";
import { ApolloClient } from "@apollo/client";

export const logout = (setUser: (user: UserData | null) => void, client: ApolloClient) => {
  localStorage.removeItem(AUTH_TOKEN);
  setUser(null);
  client.resetStore();
};
