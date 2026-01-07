import type { UserData } from "./UserData";

export type AuthContextType = {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    blogId: number | null;
    loading: boolean;
    error: unknown;
}