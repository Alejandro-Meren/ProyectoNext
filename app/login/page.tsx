import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-transparent to-pink-500 opacity-75"></div>

      {/* Contenedor del formulario */}
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-6 sm:p-8 bg-white bg-opacity-90 rounded-lg shadow-2xl backdrop-blur-lg">
        {/* Logo */}
        <div className="flex h-20 w-full items-end rounded-lg bg-pink-500 p-3 sm:h-36">
          <div className="w-32 text-white sm:w-36">
            <AcmeLogo />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-center text-2xl sm:text-3xl font-bold text-pink-600 animate-bounce">
          Bienvenid@!
        </h2>
        <p className="text-center text-gray-700 text-sm sm:text-base mb-4">
          Por favor, inicie sesión con su cuenta
        </p>

        {/* Formulario */}
        <LoginForm />

        {/* Enlace al Home */}
        <div className="flex justify-center mt-6">
          <a href="/" className="text-pink-500 hover:underline text-sm sm:text-base">
            Volver al Home
          </a>
        </div>
      </div>
    </main>
  );
}