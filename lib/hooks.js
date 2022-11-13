import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../lib/firebase";

// Se toma la información del usuario cuando se autentica

export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    let unsubscribe;
    // Si hay un usuario autenticaco, se busca en firebase para tomar su nombre de usuario y roles
    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
        setRoles(doc.data()?.roles);
      });
    } else {
      setUsername(null);
      setRoles(null);
    }
    return unsubscribe;
  }, [user]);

  return { user, username, roles };
}
