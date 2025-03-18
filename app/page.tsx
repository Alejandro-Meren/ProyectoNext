import AcmeLogo from '@/app/ui/acme-logo';
import { ArrowRightIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  
  return (
    <main className="flex min-h-screen flex-col p-6 bg-gradient-to-r from-pink-50 via-pink-100 to-pink-200">
      {/* Header */}
      <header className="flex h-20 items-center justify-between bg-pink-500 p-4 md:h-24 rounded-lg shadow-xl">
        <AcmeLogo />
        <nav className="flex gap-6 text-white">
          <div className="mt-6 flex justify-center gap-4">
            <Link
              href="/dashboard/invoices"
              className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-pink-400 transition duration-300 ease-in-out transform hover:scale-105">
              Reservar Cita
            </Link>
          </div>
        </nav>
      </header>

      {/* Sección Hero */}
      <section className="mt-16">
  <h2 className="text-center text-3xl font-bold text-pink-600">
    Algunos de nuestros servicios
  </h2>
  <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <div className="bg-pink-50 p-4 sm:p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
      <Image
        src="/cortes-de-cabello-sin-sacrificar-tu-larga-melena.jpg"
        alt="Corte de cabello"
        width={300}
        height={300}
        className="rounded-lg mb-4 object-contain w-full h-40 sm:h-48"
      />
      <h3 className="text-base sm:text-lg font-semibold text-pink-600">Corte de Cabello</h3>
      <p className="text-sm sm:text-gray-600 mt-2">
        Estilos modernos y personalizados adaptados a ti.
      </p>
    </div>
    <div className="bg-pink-50 p-4 sm:p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
      <Image
        src="/images.jpg"
        alt="Tinte de cabello"
        width={300}
        height={300}
        className="rounded-lg mb-4 object-contain w-full h-40 sm:h-48"
      />
      <h3 className="text-base sm:text-lg font-semibold text-pink-600">Tinte de Cabello</h3>
      <p className="text-sm sm:text-gray-600 mt-2">
        Los colores más vibrantes y técnicas de vanguardia.
      </p>
    </div>
    <div className="bg-pink-50 p-4 sm:p-6 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
      <Image
        src="/hq720.jpg"
        alt="Peinados festivos"
        width={300}
        height={300}
        className="rounded-lg mb-4 object-contain w-full h-40 sm:h-48"
      />
      <h3 className="text-base sm:text-lg font-semibold text-pink-600">Peinados Festivos</h3>
      <p className="text-sm sm:text-gray-600 mt-2">
        Ideal para bodas, fiestas y eventos especiales.
      </p>
    </div>
  </div>
</section>

<section className="mt-16 bg-gradient-to-r from-pink-200 via-white to-pink-100 p-6 sm:p-8 rounded-lg shadow-lg">
  <h2 className="text-center text-xl sm:text-2xl font-bold text-pink-600">
    Conoce a Nuestro Equipo
  </h2>
  <p className="text-center text-sm sm:text-gray-700 mt-4">
    Profesionales dedicados a transformar tu estilo.
  </p>
  <div className="mt-8 flex flex-col sm:flex-row gap-6 justify-center">
    <div className="flex flex-col items-center">
      <Image
        src="/Andrea-López-Septiembre-2022-13.jpg"
        alt="Estilista 1"
        width={150}
        height={150}
        className="rounded-full shadow-lg object-cover w-36 h-36 sm:w-48 sm:h-48"
      />
      <h3 className="mt-4 text-base sm:text-lg font-semibold text-pink-600">
        Andrea López
      </h3>
      <p className="text-xs sm:text-sm text-gray-700">Especialista en coloración</p>
    </div>
    <div className="flex flex-col items-center">
      <Image
        src="/image-20230313-14-bcsgqh.jpg"
        alt="Estilista 2"
        width={150}
        height={150}
        className="rounded-full shadow-lg object-cover w-36 h-36 sm:w-48 sm:h-48"
      />
      <h3 className="mt-4 text-base sm:text-lg font-semibold text-pink-600">
        Estilista 2
      </h3>
      <p className="text-xs sm:text-sm text-gray-700">Especialista en cortes</p>
    </div>
  </div>
</section>

      {/* Sección de Contacto */}
      <section className="mt-16 text-center bg-white p-8 rounded-lg shadow-xl">
  <h2 className="text-2xl font-bold text-pink-600">Contáctanos</h2>
  <p className="text-gray-700 mt-4">
    ¿Tienes dudas? ¡Estamos aquí para ayudarte!
  </p>
  <div className="mt-6 flex flex-col md:flex-row gap-6 justify-center">
    <div className="flex items-center gap-4">
      <PhoneIcon className="w-8 h-8 text-pink-500" />
      <p className="text-gray-700">+34 912 345 678</p>
    </div>
    <div className="flex items-center gap-4">
      <MapPinIcon className="w-8 h-8 text-pink-500" />
      <p className="text-gray-700">Avenida de la Innovación, 42, Madrid</p>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="mt-16 bg-pink-500 text-white text-center p-6 rounded-lg shadow-xl">
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
