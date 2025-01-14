import AcmeLogo from '@/app/ui/acme-logo';
import LoginForm from '@/app/ui/login-form';

export default function LoginPage() {
  return (
    <main className="relative flex items-center justify-center md:h-screen bg-cover bg-center" >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-transparent to-pink-500 opacity-75"></div>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-6 p-8 md:-mt-32 bg-white bg-opacity-90 rounded-lg shadow-2xl backdrop-blur-lg">
        <div className="flex h-20 w-full items-end rounded-lg bg-pink-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold text-pink-600 animate-bounce">Welcome Back!</h2>
        <p className="text-center text-gray-700 mb-4">Please login to your account</p>
        <LoginForm />
        <div className="flex justify-center mt-6">
          <a href="/" className="text-pink-500 hover:underline">Back to Home</a>
        </div>
      </div>
    </main>
  );
}