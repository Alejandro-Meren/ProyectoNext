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
      className="bg-pink-500 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-pink-400">
      Reservar Cita
    </Link>
  </div>
  <div className="mt-6 flex justify-center gap-4">
  </div>
        </nav>
      </header>

      {/* Sección Hero */}
      <section className="mt-8 text-center">
  <h1 className={`${lusitana.className} text-4xl md:text-5xl text-pink-600 font-bold`}>
    Bienvenido a Acme Hair Salon
  </h1>
  <p className="mt-4 text-gray-700 md:text-xl text-center">
    Transformamos tu estilo con cortes modernos y personalizados. Déjate
    mimar por nuestros expertos estilistas.
  </p>
  <p className="mt-4 text-gray-700 md:text-xl text-center">
    Para acceder a nuestros servicios inicie sesion en nuestra web
  </p>
  
</section>

      {/* Sección de Servicios Destacados */}
      <section className="mt-16">
  <h2 className="text-center text-2xl font-bold text-pink-600">
    Algunos de nuestros servicios
  </h2>
  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Image
        src="/mejores-peluquerias-en-muro-de-alcoy-cerca-de-mi.jpg"
        alt="Corte de cabello"
        width={400}
        height={400}
        className="rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-pink-600">Corte de Cabello</h3>
      <p className="text-gray-700 mt-2">
        Estilos modernos y personalizados adaptados a ti.
      </p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Image
        src="/mejores-peluquerias-en-muro-de-alcoy-cerca-de-mi.jpg"
        alt="Tinte de cabello"
        width={400}
        height={400}
        className="rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-pink-600">Tinte de Cabello</h3>
      <p className="text-gray-700 mt-2">
        Los colores más vibrantes y técnicas de vanguardia.
      </p>
    </div>
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Image
        src="/mejores-peluquerias-en-muro-de-alcoy-cerca-de-mi.jpg"
        alt="Peinados festivos"
        width={400}
        height={400}
        className="rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold text-pink-600">Peinados Festivos</h3>
      <p className="text-gray-700 mt-2">
        Ideal para bodas, fiestas y eventos especiales.
      </p>
    </div>
  </div>
  
</section>
      {/* Sección de Equipo */}
      <section className="mt-16 bg-gradient-to-r from-pink-200 via-white to-pink-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold text-pink-600">
          Conoce a Nuestro Equipo
        </h2>
        <p className="text-center text-gray-700 mt-4">
          Profesionales dedicados a transformar tu estilo.
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-6 justify-center">
          <div className="flex flex-col items-center">
            <Image
              src="/mejores-peluquerias-en-muro-de-alcoy-cerca-de-mi.jpg"
              alt="Estilista 1"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
            <h3 className="mt-4 text-lg font-semibold text-pink-600">
              Andrea López
            </h3>
            <p className="text-sm text-gray-700">Especialista en coloración</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/mejores-peluquerias-en-muro-de-alcoy-cerca-de-mi.jpg"
              alt="Estilista 2"
              width={200}
              height={200}
              className="rounded-full shadow-lg"
            />
            <h3 className="mt-4 text-lg font-semibold text-pink-600">
              Marcos Pérez
            </h3>
            <p className="text-sm text-gray-700">Experto en cortes modernos</p>
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
            <p className="text-gray-700">+34 123 456 789</p>
          </div>
          <div className="flex items-center gap-4">
            <MapPinIcon className="w-8 h-8 text-pink-500" />
            <p className="text-gray-700">Calle Ficticia, 123, Muro de Alcoy</p>
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
