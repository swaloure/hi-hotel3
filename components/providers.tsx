'use client';

import { useEffect, type ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  useEffect(() => {
    const storedLanguage = window.localStorage.getItem('hihotel-language');

    const syncLanguage = (language: string) => {
      const normalized = language.startsWith('en')
        ? 'en'
        : language.startsWith('kz') || language.startsWith('kk')
          ? 'kz'
          : 'ru';

      document.documentElement.lang = normalized === 'kz' ? 'kk' : normalized;
      window.localStorage.setItem('hihotel-language', normalized);
    };

    i18n.on('languageChanged', syncLanguage);

    if (storedLanguage && ['ru', 'kz', 'en'].includes(storedLanguage)) {
      if (i18n.language !== storedLanguage) {
        void i18n.changeLanguage(storedLanguage);
      } else {
        syncLanguage(storedLanguage);
      }
    } else {
      syncLanguage(i18n.language);
    }

    return () => {
      i18n.off('languageChanged', syncLanguage);
    };
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}
