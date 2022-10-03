import { auth, googleAuthProvider, firestore, facebookAuthProvider } from "../lib/firebase";
import { useContext, useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { UserContext } from "../lib/context";

export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
      </div>
    </main>
    // <main className="grid grid-cols-2 xl:grid-cols-2 sm:grid-cols-1">
    //   <div className="flex min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    //     {user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}
    //   </div>
    //   <div className="bg-white min-h-screen">
    //     <img src={"/loginDog.png"} />
    //   </div>
    // </main>
  );
}

// Sign in Button
function SignInButton() {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };

  const signInWithFacebook = async () => {
    await auth.signInWithPopup(facebookAuthProvider);
  };

  return (
    <div className="flex flex-col">
      <button
        className="btn-login-company text-black focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={signInWithGoogle}>
        <img alt="google" src={"/google.png"} /> Inicio de Sesión con Google
      </button>
      <button
        className="btn-login-company text-black focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        onClick={signInWithFacebook}>
        <img alt="facebook" src={"/facebook.png"} /> Inicio de Sesión con Facebook
      </button>
    </div>
  );
}

// Sign out button
function SignOutButton() {
  return (
    <button
      className="text-black focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      onClick={() => auth.signOut()}>
      Sign Out
    </button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    !username && (
      <section>
        <h3>Elegir un Nombre de Usuario</h3>
        <form onSubmit={onSubmit}>
          <input name="username" placeholder="" value={formValue} onChange={onChange} />
          <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
          <button
            type="submit"
            className="text-white bg-green-600 hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 font-bold rounded-lg text-md px-5 py-2.5 mr-2 mb-2 dark:bg-green-500 dark:hover:bg-green-700 dark:focus:ring-white-700 dark:border-green-700"
            disabled={!isValid}>
            Elegir nombre de usuario
          </button>

          {/* <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div> */}
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checando...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} está disponible!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">Ese nombre de usuario está tomado!</p>;
  } else {
    return <p></p>;
  }
}
