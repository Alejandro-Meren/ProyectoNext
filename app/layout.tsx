'use client';

import './ui/globals.css';
import { inter } from '@/app/ui/fonts';
import { useState, useEffect } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState<boolean | null>(null);

  useEffect(() => {
    // Recupera el estado del modo oscuro desde localStorage
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode === null) return;

    // Aplica o elimina la clase 'dark' en el elemento <html>
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Guarda el estado del modo oscuro en localStorage
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Script para aplicar la clase 'dark' en el servidor */}
      </head>
      <body className={`${inter.className} antialiased transition-all duration-500`}>
        {/* Botón de modo oscuro */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="relative w-16 h-16 bg-gray-200 dark:bg-gray-800 rounded-full shadow-lg transition-all duration-500 hover:scale-110 flex items-center justify-center"
          >
            <div
              className={`absolute inset-0 rounded-full transition-all duration-500 ${
                darkMode ? 'bg-gray-400 opacity-20' : 'bg-yellow-400 opacity-30'
              }`}
            ></div>
            <span
              className={`transition-transform duration-500 ${
                darkMode ? 'text-gray-500' : 'rotate-180 text-yellow-400'
              }`}
            >
              {darkMode ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  />
                </svg>
              ) : (
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5V3m0 18v-1.5M4.5 12H3m18 0h-1.5M16.95 7.05l1.06-1.06M7.05 16.95l-1.06 1.06m12.02 0l-1.06-1.06M7.05 7.05L5.99 5.99M12 8a4 4 0 100 8 4 4 0 000-8z"
                  />
                </svg>
              )}
            </span>
          </button>
        </div>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    (function() {
                      const savedDarkMode = localStorage.getItem('darkMode') === 'true';
                      if (savedDarkMode) {
                        document.documentElement.classList.add('dark');
                      } else {
                        document.documentElement.classList.remove('dark');
                      }
                    })();
                  `,
                }}
              />
        {children}
      </body>
    </html>
  );
}