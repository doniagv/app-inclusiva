import { useState, useEffect, useContext } from "react";
import { UserContext } from "../lib/context";

// Componente para mostrar el dashboard sobre estadísticas de los juegos
export default function Dashboard(props) {
  const { username, roles } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const [gamesInfo, setGamesInfo] = useState(null);

  // Se hace fetch con la api cuando se carga el componente Dashbord y la información se guarda en el state
  useEffect(() => {
    const getGamesInfo = async () => {
      setLoading(true);
      const response = await fetch("/api/games");
      if (response) {
        const data = await response.json();
        setLoading(false);
        setGamesInfo(data.games);
      }
      setLoading(false);
    };

    getGamesInfo();
  }, []);
  // Se revisa que el usuario tenga el role de admin para poder ver el dashboard
  return (
    <>
      {username && roles && roles.includes("admin") ? (
        <main className="flex flex-col">
          <h1 className="text-center">Dashboard</h1>
          {!loading ? (
            <div className="flex self-center w-9/12 mt-5 overflow-x-auto relative ">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-md rounded-lg">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Juego
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Vistas
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Tipo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {gamesInfo ? (
                    gamesInfo.map((game) => (
                      <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700" key={game.id}>
                        <th className="py-4 px-6">{game.title}</th>
                        <td className="py-4 px-6">{game.views_count}</td>
                        <td className="py-4 px-6">{game.type}</td>
                      </tr>
                    ))
                  ) : (
                    <h2>Error al cargar la información</h2>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div role="status" className="mt-5 flex justify-center">
              <svg
                aria-hidden="true"
                class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          )}
          <div class="mt-10 flex w-9/12 self-center items-center bg-orange-500 rounded-lg shadow sm:flex">
            <div class="p-5">
              <h3 class="text-xl font-bold tracking-tight text-white">
                <a href="#">Google Analytics</a>
              </h3>
              <p class="mt-3 mb-4 font-light text-white">
                Para revisar más estadísticas de la página, por favor visita google analytics
              </p>
              <a
                rel="noreferrer"
                target="_blank"
                href="https://console.firebase.google.com/u/0/project/apps-inclusivas/analytics/app/web:NzZjODIxMTQtYTkzMi00MjMxLWJiZjMtMzliYWQ2Y2VmMGUz/overview/~2F%3Ft%3D1669424507389&fpn%3D729212998190&swu%3D1&sgu%3D1&sus%3Dupgraded&cs%3Dapp.m.dashboard.overview&g%3D1">
                <button className="bg-gray-700 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:ring-primary-900">
                  Ver estadísticas
                </button>
                {/* <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg> */}
              </a>
            </div>
          </div>
        </main>
      ) : (
        <h1 className="text-center">No tienes los permisos necesarios</h1>
      )}
    </>
  );
}
