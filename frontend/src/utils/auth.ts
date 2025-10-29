import { AUTH_TOKEN } from "../constants";

export const logout = () => {
    localStorage.removeItem(AUTH_TOKEN);
};