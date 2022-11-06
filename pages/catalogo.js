import { firestore, postToJSON, fromMillis } from "../lib/firebase";
import GameCard from "../components/GameCard";

import axios from "axios";

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
      axios
        .get(`https://itch.io/api/1/${process.env.API_KEY}/my-games`)
        .then(function (response) {
          // handle success
          console.log(response);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    };

    getGamesInfo();
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
