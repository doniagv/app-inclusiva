import { firestore, postToJSON, fromMillis } from "../lib/firebase";
import GameCard from "../components/GameCard";

import { useState, useEffect } from "react";

// export async function getServerSideProps(context) {
//   const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

//   const juegos = (await gamesQuery.get()).docs.map(postToJSON);

//   console.log("juegos");
//   return {
//     props: { juegos },
//   };
// }

export default function Catalogo(props) {
  const [juegos, setJuegos] = useState(props.juegos);
  const [loading, setLoading] = useState(props.false);

  const [gamesInfo, setGamesInfo] = useState(null);

  useEffect(() => {
    const getJuegos = async () => {
      const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

      const juegos = (await gamesQuery.get()).docs.map(postToJSON);
      setJuegos(juegos);
    };

    getJuegos();
  }, []);

  useEffect(() => {
    const getGamesInfo = async () => {
      console.log(process.env.API_KEY);
      const response = await fetch("/api/games");

      const data = await response.json();
      console.log("🚀 ~ file: catalogo.js ~ line 40 ~ getGamesInfo ~ data", data);
      setGamesInfo(data.games);
    };

    getGamesInfo();
  }, []);

  return (
    <main>
      <h1 className="text-center">Catálogo de Juegos</h1>
      <div className="flex flex-wrap gap-6 justify-center mt-5">
        {juegos ? juegos.map((juego) => <GameCard juego={juego} key={juego.titulo} />) : null}
        {gamesInfo ? gamesInfo.map((game) => <h1 key={game.id}>{game.title}</h1>) : null}
      </div>
    </main>
  );
}
