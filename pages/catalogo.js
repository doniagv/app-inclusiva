import { firestore, docToJSON, fromMillis } from "../lib/firebase";
import GameCard from "../components/GameCard";

import { useState, useEffect, useContext } from "react";

import { UserContext } from "../lib/context";

// export async function getServerSideProps(context) {
//   const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

//   const juegos = (await gamesQuery.get()).docs.map(docToJSON);

//   console.log("juegos");
//   return {
//     props: { juegos },
//   };
// }

// Se hace query ha firebase para obtener los juegos publicados
export default function Catalogo(props) {
  const [juegos, setJuegos] = useState(props.juegos);
  const [loading, setLoading] = useState(props.false);

  const { username, roles } = useContext(UserContext);

  useEffect(() => {
    const getJuegos = async () => {
      const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

      const juegos = (await gamesQuery.get()).docs.map(docToJSON);
      setJuegos(juegos);
    };

    getJuegos();
  }, []);

  //Se usa el componente GameCard para mostrar cada juego con su foto e información
  return (
    <main>
      <h1 className="text-center">Catálogo de Juegos</h1>
      {username || (roles && (roles.includes("Usuario") || roles.includes("admin"))) ? (
        <div className="flex flex-wrap gap-6 justify-center mt-5">
          {juegos ? juegos.map((juego) => <GameCard juego={juego} key={juego.titulo} />) : null}
        </div>
      ) : (
        <div
          className="flex p-4 mb-4 text-sm text-blue-700 bg-blue-100 rounded-lg dark:bg-blue-200 dark:text-blue-800"
          role="alert">
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clip-rule="evenodd"></path>
          </svg>
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Inicia sesión</span> para poder ver el catálogo de juegos
          </div>
        </div>
      )}
    </main>
  );
}
