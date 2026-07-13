'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';
import { CityProvider } from '@/context/city-context';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('hihotel-language');
    if (storedLanguage && ['ru', 'kz', 'en'].includes(storedLanguage) && i18n.language !== storedLanguage) {
      void i18n.changeLanguage(storedLanguage);
    }

    const handleLanguageChange = (language: string) => {
      const normalized = language.startsWith('en') ? 'en' : language.startsWith('kz') || language.startsWith('kk') ? 'kz' : 'ru';
      window.localStorage.setItem('hihotel-language', normalized);
      document.documentElement.lang = normalized === 'kz' ? 'kk' : normalized;
    };

    handleLanguageChange(i18n.language);
    i18n.on('languageChanged', handleLanguageChange);
    return () => i18n.off('languageChanged', handleLanguageChange);
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <CityProvider>
        {children}
      </CityProvider>
    </I18nextProvider>
  );
}
