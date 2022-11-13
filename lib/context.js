import { createContext } from "react";

// Se crea el contexto de user y username para poder utilizarlo en toda la app
export const UserContext = createContext({ user: null, username: null });
