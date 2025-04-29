'use client';

import React, { createContext, useContext, useState } from 'react';

type Language = 'es' | 'en';

interface LanguageContextProps {
  language: Language;
  setLanguage: (language: Language) => void;
  translations: Record<string, string>;
}

const translationsMap: Record<Language, Record<string, string>> = {
  es: {
    home: 'Inicio',
    appointments: 'Citas',
    customers: 'Clientes',
    products: 'Productos',
    settings: 'Configuración',
    statistics: 'Estadísticas',
    save: 'Guardar',
    profile: 'Perfil',
    preferences: 'Preferencias',
    notifications: 'Notificaciones',
    security: 'Seguridad',
    create: 'Crear',
    edit: 'Editar',
    delete: 'Eliminar',
    dashboard: 'Panel de Control',
    welcome: 'Bienvenido',
    login: 'Iniciar Sesión',
    register: 'Registrarse',
    logout: 'Cerrar Sesión',
  },
  en: {
    home: 'Home',
    appointments: 'Appointments',
    customers: 'Customers',
    products: 'Products',
    settings: 'Settings',
    statistics: 'Statistics',
    save: 'Save',
    profile: 'Profile',
    preferences: 'Preferences',
    notifications: 'Notifications',
    security: 'Security',
    create: 'Create',
    edit: 'Edit',
    delete: 'Delete',
    dashboard: 'Dashboard',
    welcome: 'Welcome',
    login: 'Login',
    register: 'Register',
    logout: 'Logout',
  },
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es'); // Idioma predeterminado: español

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translations: translationsMap[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de un LanguageProvider');
  }
  return context;
};