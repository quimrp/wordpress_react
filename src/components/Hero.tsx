import React from 'react';
import ventanaAvif from '../assets/images/ventana.avif';
import ventanaWebp from '../assets/images/ventana.webp';
import ventanaJpg from '../assets/images/ventana.jpg';

const Hero: React.FC = () => (
  <div className="w-full flex justify-center bg-white relative overflow-hidden">
    {/* Fondo decorativo superior */}
    <div
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
    <div className="w-full max-w-5xl py-32 sm:py-48 lg:py-56 flex flex-col lg:flex-row items-center gap-6 lg:gap-0">
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center text-center order-1 min-h-[300px]">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Ventanas de PVC
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
         Consigue el mejor aislamiento termico y acustico <br />
         con la ventana mas eficiente del mercado
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#contacto"
            className="rounded-md bg-blue-700 px-6 py-3 text-lg font-semibold text-white shadow hover:bg-blue-800 transition"
          >
            Solicita tu presupuesto gratis
          </a>
        </div>
      </div>
      <div className="w-full lg:w-2/5 flex justify-center order-2 lg:order-2">
        <picture>
          <source srcSet={ventanaAvif} type="image/avif" />
          <source srcSet={ventanaWebp} type="image/webp" />
          <img
            src={ventanaJpg}
            alt="Ventanas de PVC"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg shadow-2xl"
            loading="lazy"
          />
        </picture>
      </div>
    </div>
    {/* Fondo decorativo inferior */}
    <div
      className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
      />
    </div>
  </div>
);

export default Hero; 