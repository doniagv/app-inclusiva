import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <section className="mb-20  flex flex-col self-center w-10/12 rounded-lg mt-6 bg-gray-900">
      <div className="mb-20 grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="text-white max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            ¡Juegos y aplicaciones inclusivas!
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl text-gray-200">
            En esta página podrás encontrar muchos juegos y aplicaciones para niños con problemas de atención que les dificulta
            procesos cognitivos como el lenguaje, la escritura, la lectura y el cálculo.
          </p>
          <Link href="/catalogo">
            <button className="bg-pink-800 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 focus:ring-primary-900">
              Ver juegos
            </button>
            {/* <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"></path>
            </svg> */}
          </Link>

          {/* <a
            href="#"
            className="text-white hover:bg-gray-700 inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
            Contacto
          </a> */}
        </div>
        <div className="hidden rounded-lg lg:mt-0 lg:col-span-5 lg:flex">
          <Image
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1591976711776-4a91184e0bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80"
            alt="mockup"
            width={700}
            height={500}
          />
        </div>
      </div>
      <div className="mt-20 grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 bg-pink-800">
        <div className="hidden rounded-lg lg:mt-0 lg:col-span-5 lg:flex mr-6">
          <Image
            className="rounded-lg"
            src="https://images.unsplash.com/photo-1537655780520-1e392ead81f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt="mockup"
            width={700}
            height={500}
          />
        </div>
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="text-white max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            La misión
          </h1>
          <p className="max-w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl dark:text-white-400">
            Actualmente y como parte de la globalización, es necesaria una reorganización social y cultural que permita hacer
            frente a la exclusión, el rechazo y cualquier tipo de discriminación que muchos niños puedan sufrir en el nivel básico
            de la educación.
          </p>
        </div>
      </div>
    </section>
  );
};
