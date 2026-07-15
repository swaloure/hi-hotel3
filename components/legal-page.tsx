'use client';

import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useLegalContent } from '@/hooks/use-legal-content';
import type { LegalPageKind } from '@/lib/data/legal-content';

type Lang = 'ru' | 'kz' | 'en';

const copy = {
  ru: {
    privacy: 'Политика конфиденциальности',
    offer: 'Публичная оферта',
    message: 'Информация скоро появится на этой странице.',
    back: 'Вернуться на главную',
  },
  kz: {
    privacy: 'Құпиялылық саясаты',
    offer: 'Жария оферта',
    message: 'Бұл бетте ақпарат жақын арада жарияланады.',
    back: 'Басты бетке оралу',
  },
  en: {
    privacy: 'Privacy Policy',
    offer: 'Public Offer',
    message: 'Information will be available on this page soon.',
    back: 'Back to home',
  },
} satisfies Record<Lang, Record<LegalPageKind | 'message' | 'back', string>>;

function resolveLang(language: string): Lang {
  const normalized = language.toLowerCase();
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('kz') || normalized.startsWith('kk')) return 'kz';
  return 'ru';
}

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const { i18n } = useTranslation();
  const text = copy[resolveLang(i18n.language)];
  const { content } = useLegalContent(kind);

  return (
    <main className="min-h-screen bg-background">
      <Header city="home" />
      <section className="flex min-h-[70vh] items-center bg-primary px-4 pb-20 pt-32 text-primary-foreground">
        <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-sm sm:p-12">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <FileText className="h-6 w-6" aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-center text-3xl font-light sm:text-5xl">{text[kind]}</h1>
          {content ? (
            <div className="mt-8 whitespace-pre-wrap text-left text-base leading-8 text-primary-foreground/82 sm:text-lg">
              {content}
            </div>
          ) : (
            <p className="mt-5 text-center text-lg text-primary-foreground/75">{text.message}</p>
          )}
          <div className="text-center">
            <Link
              href="/"
              className="mt-8 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-accent-foreground transition hover:bg-accent/90"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              {text.back}
            </Link>
          </div>
        </div>
      </section>
      <Footer city="home" />
    </main>
  );
}
