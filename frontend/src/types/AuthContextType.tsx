import type { UserData } from "./UserData";

export type AuthContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    loading: boolean;
    error: unknown;
}