import "../styles/globals.css";
import Navbar from "../components/Navbar";
import { UserContext } from "../lib/context";
import { useRouter } from "next/router";

// Libreriía para google analytics
import * as ga from "../lib/ga";

import { useUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on("routeChangeComplete", handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // Se utiliza un hook y el contexto para que la app siempre tenga la información sobre el usuario autenticado

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
