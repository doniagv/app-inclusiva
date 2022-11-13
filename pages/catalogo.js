import { firestore, docToJSON, fromMillis } from "../lib/firebase";
import GameCard from "../components/GameCard";

import { useState, useEffect } from "react";

// export async function getServerSideProps(context) {
//   const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

//   const juegos = (await gamesQuery.get()).docs.map(docToJSON);

//   console.log("juegos");
//   return {
//     props: { juegos },
//   };
// }

export default function Catalogo(props) {
  const [juegos, setJuegos] = useState(props.juegos);
  const [loading, setLoading] = useState(props.false);

  useEffect(() => {
    const getJuegos = async () => {
      const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

      const juegos = (await gamesQuery.get()).docs.map(docToJSON);
      setJuegos(juegos);
    };

    getJuegos();
  }, []);

  return (
    <main>
      <h1 className="text-center">Catálogo de Juegos</h1>
      <div className="flex flex-wrap gap-6 justify-center mt-5">
        {juegos ? juegos.map((juego) => <GameCard juego={juego} key={juego.titulo} />) : null}
      </div>
    </main>
  );
}
