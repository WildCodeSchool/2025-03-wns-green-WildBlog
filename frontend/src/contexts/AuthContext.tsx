import { createContext } from "react";
import type { AuthContextType } from "../types/AuthContextType";

export const AuthContext = createContext<AuthContextType | null>(null); // initialiser le contexte, qui peut être soit de Type AuthContextType soit null au départ.




