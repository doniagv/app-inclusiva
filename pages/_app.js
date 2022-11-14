import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";

import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  // Se utiliza un hook y el contexto para que la app siempre tenga la información sobre el usuario autenticado

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
