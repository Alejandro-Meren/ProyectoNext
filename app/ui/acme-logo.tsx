import { ScissorsIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <ScissorsIcon className="h-10 w-10 sm:h-12 sm:w-12 rotate-[15deg]" />
      <p className="text-[32px] sm:text-[44px] ml-2">Hair Salon</p>
    </div>
  );
}