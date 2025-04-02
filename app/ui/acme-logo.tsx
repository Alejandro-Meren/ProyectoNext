import { SparklesIcon } from '@heroicons/react/24/solid';
import { lusitana } from '@/app/ui/fonts';

export default function StyleCraftLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none`}
    >
      {/* Icono con efecto neón y mayor contraste */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full blur-lg opacity-90"></div>
        <SparklesIcon className="relative h-10 w-10 sm:h-12 sm:w-12 text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]" />
      </div>
      {/* Texto con efecto neón y mayor contraste */}
      <p className="text-[32px] sm:text-[44px] ml-3 font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-[0_0_20px_rgba(255,255,255,1)]">
        Style
        Craft
      </p>
    </div>
  );
}