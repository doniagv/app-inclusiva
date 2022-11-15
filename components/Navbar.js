import Link from "next/link";
import { auth } from "../lib/firebase";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../lib/context";

// import { auth } from "@lib/firebase";

// Navbar principal responsivo
export default function Navbar() {
  // Se toman del contexto general de la app, el username y roles del usuario autenticado
  const { username, roles } = useContext(UserContext);

  const [openNav, setOpenNav] = useState(false);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 768 && setOpenNav(false));
  }, []);

  const changeOpenNav = () => {
    setOpenNav(!openNav);
  };

  // Para mostrar opcion de dashboard el usuario tiene que tener role de admin

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
              INICIO
            </button>
          </Link>
        </li>
        <li className="hidden md:block">
          <Link href="/creditos">
            <button className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Créditos
            </button>
          </Link>
        </li>
        <li className="hidden md:block">
          <Link href="/catalogo">
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
              Cátalogo de juegos
            </button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            {username && roles && roles.includes("admin") ? (
              <li className="hidden md:block">
                <Link href="/dashboard">
                  <button className="text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Dashboard
                  </button>
                </Link>
              </li>
            ) : null}
            <li className="push-left">
              <button
                className="text-black focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={signOut}>
                Sign Out
              </button>
            </li>
            {/* <li>
              <Link href={`/${username}`}>
                <img alt="Profile" src={user?.photoURL || "/hacker.png"} />
              </Link>
            </li> */}
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li className="push-left">
            <Link href="/enter">
              <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Log in
              </button>
            </Link>
          </li>
        )}

        <button
          onClick={changeOpenNav}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"></path>
          </svg>
        </button>
      </ul>
      {openNav ? (
        <div hidden={!openNav} className="w-full w-auto">
          <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {username && (
              <>
                <li className="">
                  <Link href="/catalogo">
                    <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                      Cátalogo de juegos
                    </button>
                  </Link>
                </li>
                {username && roles && roles.includes("admin") ? (
                  <li className="">
                    <Link href="/dashboard">
                      <button className="text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-orange-300 dark:focus:ring-orange-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Dashboard
                      </button>
                    </Link>
                  </li>
                ) : null}
              </>
            )}
            <li>
              <Link href="/creditos">
                <button className="text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                  Créditos
                </button>
              </Link>
            </li>
          </ul>
        </div>
      ) : null}
    </nav>
  );
}
