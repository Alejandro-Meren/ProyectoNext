import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center min-h-screen bg-cover bg-center">
      {/* Fondo degradado */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-transparent to-pink-500 dark:from-gray-800 dark:via-transparent dark:to-gray-800 opacity-75"></div>

      {/* Contenedor del formulario */}
      <div className="relative mx-auto flex w-full max-w-[90%] sm:max-w-[400px] flex-col space-y-4 p-4 sm:p-8 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-100 rounded-lg shadow-2xl backdrop-blur-lg">
        {/* Logo */}
        <div className="flex h-16 sm:h-20 w-full items-end rounded-lg bg-pink-500 dark:bg-purple-500 p-3 sm:h-36">
          <div className="w-28 sm:w-36 text-white">
            <AcmeLogo />
          </div>
        </div>

        {/* Título */}
        <h2 className="text-center text-xl sm:text-2xl font-bold text-pink-600 dark:text-purple-400 animate-bounce">
          Bienvenid@!
        </h2>
        <p className="text-center text-gray-700 dark:text-gray-300 text-xs sm:text-sm mb-2 sm:mb-4">
          Por favor, inicie sesión con su cuenta
        </p>

        {/* Formulario */}
        <LoginForm />

        {/* Enlace al Home */}
        <div className="flex justify-center mt-4 sm:mt-6">
          <a
            href="/"
            className="text-pink-500 dark:text-purple-400 hover:underline text-xs sm:text-sm"
          >
            Volver al Home
          </a>
        </div>
      </div>
    </main>
  );
}