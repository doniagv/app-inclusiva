import { useState, useEffect, useContext } from "react";
import { UserContext } from "../lib/context";

export default function Dashboard(props) {
  const { user, username } = useContext(UserContext);
  const [loading, setLoading] = useState(props.false);

  const [gamesInfo, setGamesInfo] = useState(null);

  //   useEffect(() => {
  //     const getJuegos = async () => {
  //       const gamesQuery = firestore.collectionGroup("juegos").where("publicado", "==", true).orderBy("titulo", "desc");

  //       const juegos = (await gamesQuery.get()).docs.map(postToJSON);
  //       setJuegos(juegos);
  //     };

  //     getJuegos();
  //   }, []);

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
    <>
      {username ? (
        <main>
          <h1 className="text-center">Dashboard</h1>

          <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Juego
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Vistas
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Tipo
                  </th>
                </tr>
              </thead>
              <tbody>
                {gamesInfo
                  ? gamesInfo.map((game) => (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={game.id}>
                        <th className="py-4 px-6">{game.title}</th>
                        <td className="py-4 px-6">{game.views_count}</td>
                        <td className="py-4 px-6">{game.type}</td>
                      </tr>
                    ))
                  : null}
                {/* <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Apple MacBook Pro 17"
                    </th>
                    <td class="py-4 px-6">Sliver</td>
                    <td class="py-4 px-6">Laptop</td>
                    <td class="py-4 px-6">$2999</td>
                  </tr>
                  <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Microsoft Surface Pro
                    </th>
                    <td class="py-4 px-6">White</td>
                    <td class="py-4 px-6">Laptop PC</td>
                    <td class="py-4 px-6">$1999</td>
                  </tr>
                  <tr class="bg-white dark:bg-gray-800">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      Magic Mouse 2
                    </th>
                    <td class="py-4 px-6">Black</td>
                    <td class="py-4 px-6">Accessories</td>
                    <td class="py-4 px-6">$99</td>
                  </tr> */}
              </tbody>
            </table>
          </div>
        </main>
      ) : (
        <h1 className="text-center">No tienes los permisos necesarios</h1>
      )}
    </>
  );
}
