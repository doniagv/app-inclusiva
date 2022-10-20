import React from "react";

export default function GameCard({ juego }) {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={juego.image} alt="juego" />
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{juego.titulo}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{juego.descripcion}</p>
        <a
          href={juego.url}
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Descargar
        </a>
        <p className="inline-flex items-center ml-3 py-2 px-3 text-sm font-medium text-center text-white bg-teal-900 rounded-lg hover:bg-teal-900 focus:ring-4 focus:outline-none focus:ring-teal-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
          {juego.tipo}
        </p>
      </div>
    </div>
  );
}