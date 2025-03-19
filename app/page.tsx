"use client";

import { useState } from 'react';
import AcmeLogo from '@/app/ui/acme-logo';
import { SunIcon, MoonIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  const [darkMode, setDarkMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleReserveClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <main
      className={`flex min-h-screen flex-col p-6 transition-all duration-500 ease-in-out ${
        darkMode
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-purple-400'
          : 'bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200 text-pink-600'
      }`}
    >
      {/* Header */}
      <header
        className={`sticky top-0 z-50 flex flex-col sm:flex-row h-auto sm:h-20 items-center justify-between transition duration-500 ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-pink-500 text-white'
        } p-4 md:h-24 rounded-lg shadow-xl`}
      >
        <AcmeLogo />
        <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 sm:mt-0">
          <div className="flex justify-center gap-4">
            <Link
              href="/dashboard/invoices"
              className={`transition duration-500 ${
                darkMode
                  ? 'bg-purple-500 hover:bg-purple-400'
                  : 'bg-pink-500 hover:bg-pink-400'
              } text-white px-6 py-3 rounded-lg font-medium shadow-lg transform hover:scale-105 text-lg`}
            >
              Iniciar Sesión
            </Link>
            {/* Botón de modo oscuro/claro */}
            <button
              onClick={toggleDarkMode}
              className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-pink-300 to-pink-400 dark:from-purple-500 dark:to-gray-700 rounded-full flex items-center justify-center shadow-lg transition duration-500 ease-in-out transform hover:scale-110"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {darkMode ? (
                  <SunIcon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 transition duration-500" />
                ) : (
                  <MoonIcon className="w-6 h-6 sm:w-8 sm:h-8 text-pink-400 transition duration-500" />
                )}
              </div>
              <div
                className={`absolute inset-0 rounded-full transition duration-500 ${
                  darkMode ? 'bg-purple-500 opacity-20' : 'bg-pink-300 opacity-20'
                }`}
              ></div>
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        className={`mt-16 p-6 rounded-lg shadow-lg transition duration-500 ${
          darkMode
            ? 'bg-gray-800 text-purple-400'
            : 'bg-pink-50 text-pink-600'
        }`}
      >
        <h1 className="text-center text-4xl font-extrabold ">
          Bienvenidos a Acme Hair Salon
        </h1>
        <p className="text-center text-lg mt-4 ">
          Transformamos tu estilo con cortes modernos, tintes vibrantes y peinados únicos.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleReserveClick}
            className={`transition duration-500 ${
              darkMode
                ? 'bg-purple-500 hover:bg-purple-400'
                : 'bg-pink-500 hover:bg-pink-400'
            } text-white px-6 py-3 rounded-lg font-medium shadow-lg transform hover:scale-105 text-lg`}
          >
            Reserva tu cita ahora
          </button>
        </div>
      </section>
{/* Popup */}
{showPopup && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div
      className={`p-6 rounded-lg shadow-lg text-center transform transition-all duration-500 scale-100 sm:scale-105 ${
        darkMode ? 'bg-gray-800 text-purple-400' : 'bg-white text-gray-800'
      }`}
    >
      <h2 className="text-lg font-bold mb-4">
        ¡Atención!
      </h2>
      <p className="text-sm sm:text-base">
        Debes iniciar sesión primero para poder reservar una cita.
      </p>
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={closePopup}
          className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
            darkMode
              ? 'bg-purple-500 hover:bg-purple-400 text-white'
              : 'bg-pink-500 hover:bg-pink-400 text-white'
          }`}
        >
          Cerrar
        </button>
        <Link
          href="/login"
          className={`px-4 py-2 rounded-lg shadow-md transition duration-300 ${
            darkMode
              ? 'bg-purple-500 hover:bg-purple-400 text-white'
              : 'bg-pink-500 hover:bg-pink-400 text-white'
          }`}
        >
          Iniciar Sesión
        </Link>
      </div>
    </div>
  </div>
)}
      {/* Servicios */}
      <section
        className={`mt-16 p-6 rounded-lg shadow-lg transition duration-500 ${
          darkMode
            ? 'bg-gray-800 text-purple-400'
            : 'bg-pink-50 text-pink-600'
        }`}
      >
        <h2 className="text-center text-3xl font-bold ">
          Nuestros Servicios
        </h2>
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 ">
          <div
            className={`p-4 sm:p-6 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 ${
              darkMode ? 'bg-gray-700 text-purple-400' : 'bg-pink-50 text-pink-600'
            }`}
          >
            <Image
              src="/cortes-de-cabello-sin-sacrificar-tu-larga-melena.jpg"
              alt="Corte de cabello"
              width={300}
              height={300}
              className="rounded-lg mb-4 object-contain w-full h-40 sm:h-48 "
            />
            <h3 className="text-base sm:text-lg font-semibold ">
              Corte de Cabello
            </h3>
            <p className="text-sm mt-2">
              Estilos modernos y personalizados adaptados a ti.
            </p>
          </div>
          <div
            className={`p-4 sm:p-6 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 ${
              darkMode ? 'bg-gray-700 text-purple-400' : 'bg-pink-50 text-pink-600'
            }`}
          >
            <Image
              src="/images.jpg"
              alt="Tinte de cabello"
              width={300}
              height={300}
              className="rounded-lg mb-4 object-contain w-full h-40 sm:h-48"
            />
            <h3 className="text-base sm:text-lg font-semibold ">
              Tinte de Cabello
            </h3>
            <p className="text-sm mt-2 ">
              Los colores más vibrantes y técnicas de vanguardia.
            </p>
          </div>
          <div
            className={`p-4 sm:p-6 rounded-xl shadow-lg transform transition-transform duration-500 hover:scale-105 ${
              darkMode ? 'bg-gray-700 text-purple-400' : 'bg-pink-50 text-pink-600'
            }`}
          >
            <Image
              src="/hq720.jpg"
              alt="Peinados festivos"
              width={300}
              height={300}
              className="rounded-lg mb-4 object-contain w-full h-40 sm:h-48"
            />
            <h3 className="text-base sm:text-lg font-semibold">
              Peinados Festivos
            </h3>
            <p className="text-sm mt-2">
              Ideal para bodas, fiestas y eventos especiales.
            </p>
          </div>
        </div>
      </section>
  {/* Equipo */}
  <section
    className={`mt-16 p-6 sm:p-8 rounded-lg shadow-lg transition duration-500 ${
      darkMode
        ? 'bg-gray-800 text-purple-400'
        : 'bg-pink-200 text-pink-600'
    }`}
  >
    <h2 className="text-center text-xl sm:text-2xl font-bold">
      Conoce a Nuestro Equipo
    </h2>
    <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
      <div className="flex flex-col items-center">
        <Image
          src="/Andrea-López-Septiembre-2022-13.jpg"
          alt="Estilista 1"
          width={150}
          height={150}
          className="rounded-full shadow-lg object-cover w-36 h-36 sm:w-48 sm:h-48"
        />
        <h3 className="mt-4 text-base sm:text-lg font-semibold">
          Andrea López
        </h3>
        <p className="text-sm mt-2 ">
          Especialista en coloración
        </p>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src="/image-20230313-14-bcsgqh.jpg"
          alt="Estilista 2"
          width={150}
          height={150}
          className="rounded-full shadow-lg object-cover w-36 h-36 sm:w-48 sm:h-48"
        />
        <h3 className="mt-4 text-base sm:text-lg font-semibold">
          Alvaro Gracia
        </h3>
        <p className="text-sm mt-2 ">
          Especialista en cortes
        </p>
      </div>
    </div>
  </section>
      

      {/* Contacto */}
      <section
        className={`mt-16 p-6 rounded-lg shadow-lg transition duration-500 ${
          darkMode
            ? 'bg-gray-800 text-purple-400'
            : 'bg-pink-50 text-pink-600'
        }`}
      >
        <h2 className="text-center text-xl sm:text-2xl font-bold">
          Contáctanos
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
          <div className="flex items-center gap-4">
            <PhoneIcon className="w-8 h-8 text-pink-500 dark:text-purple-400" />
            <p className="text-sm sm:text-lg">+34 912 345 678</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPinIcon className="w-8 h-8 text-pink-500 dark:text-purple-400" />
            <p className="text-sm sm:text-lg">Avenida de la Innovación, 42, Madrid</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`mt-16 p-6 rounded-lg shadow-xl text-center transition duration-500 ${
          darkMode ? 'bg-gray-800 text-purple-400' : 'bg-pink-500 text-pink-300'
        }`}
      >
        <p>&copy; 2023 Acme Hair Salon. Todos los derechos reservados.</p>
        <p className="mt-2">
          <Link href="/privacy" className="hover:underline">
            Política de Privacidad
          </Link>{' '}
          |{' '}
          <Link href="/terms" className="hover:underline">
            Términos y Condiciones
          </Link>
        </p>
      </footer>
    </main>
  );
}


  