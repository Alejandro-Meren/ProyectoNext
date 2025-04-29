'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as 'es' | 'en');
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language" className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Idioma:
      </label>
      <select
        id="language"
        value={language}
        onChange={handleLanguageChange}
        className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 shadow-sm focus:border-pink-500 focus:ring-pink-500 dark:focus:border-purple-500 dark:focus:ring-purple-500"
      >
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}