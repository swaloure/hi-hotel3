'use client';

import Link from 'next/link';
import { ArrowLeft, LoaderCircle, ScrollText, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useLegalContent } from '@/hooks/use-legal-content';
import type { LegalCity, LegalPageKind } from '@/lib/data/legal-content';

type Lang = 'ru' | 'kz' | 'en';
type LegalCopy = Record<LegalPageKind, string> & {
  eyebrow: string;
  message: string;
  back: string;
  loading: string;
  error: string;
};

const copy = {
  ru: {
    privacy: 'Политика конфиденциальности',
    offer: 'Публичная оферта',
    eyebrow: 'Юридическая информация',
    message: 'Информация скоро появится на этой странице.',
    back: 'Вернуться к отелю',
    loading: 'Загрузка документа',
    error: 'Не удалось загрузить документ. Попробуйте обновить страницу.',
  },
  kz: {
    privacy: 'Құпиялылық саясаты',
    offer: 'Жария оферта',
    eyebrow: 'Құқықтық ақпарат',
    message: 'Бұл бетте ақпарат жақын арада жарияланады.',
    back: 'Қонақүйге оралу',
    loading: 'Құжатты жүктеу',
    error: 'Құжатты жүктеу мүмкін болмады. Бетті жаңартып көріңіз.',
  },
  en: {
    privacy: 'Privacy Policy',
    offer: 'Public Offer',
    eyebrow: 'Legal information',
    message: 'Information will be available on this page soon.',
    back: 'Back to hotel',
    loading: 'Loading document',
    error: 'The document could not be loaded. Please refresh the page.',
  },
} satisfies Record<Lang, LegalCopy>;

function resolveLang(language: string): Lang {
  const normalized = language.toLowerCase();
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('kz') || normalized.startsWith('kk')) return 'kz';
  return 'ru';
}

export function LegalPage({ city, kind }: { city: LegalCity; kind: LegalPageKind }) {
  const { t, i18n } = useTranslation();
  const text = copy[resolveLang(i18n.language)];
  const { content, isLoading, hasError } = useLegalContent(city, kind);
  const DocumentIcon = kind === 'privacy' ? ShieldCheck : ScrollText;

  return (
    <main className="min-h-screen bg-secondary/35">
      <Header city={city} />
      <section className="relative isolate overflow-hidden bg-primary px-4 pb-20 pt-32 text-primary-foreground sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_10%,rgba(201,168,108,0.2),transparent_34%),radial-gradient(circle_at_88%_24%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/18 to-transparent" />

        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-accent shadow-xl backdrop-blur-sm">
              <DocumentIcon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">{text.eyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl font-light tracking-[-0.025em] sm:text-5xl lg:text-6xl">
              {text[kind]} · {t(`cities.${city}`)}
            </h1>
          </div>

          <article className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-background text-foreground shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:mt-12">
            <div className="min-h-72 px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
              {isLoading ? (
                <div className="flex min-h-56 items-center justify-center" role="status" aria-label={text.loading} aria-live="polite">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/12 text-accent shadow-[0_0_0_10px_rgba(201,168,108,0.06)]">
                    <LoaderCircle className="h-8 w-8 animate-spin" aria-hidden="true" />
                  </span>
                </div>
              ) : content ? (
                <div className="whitespace-pre-wrap text-left text-[15px] leading-8 text-foreground/78 sm:text-base sm:leading-9">
                  {content}
                </div>
              ) : (
                <div className="flex min-h-56 items-center justify-center text-center">
                  <p className="max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                    {hasError ? text.error : text.message}
                  </p>
                </div>
              )}
            </div>

            <div className="border-t border-border bg-secondary/30 px-5 py-5 text-center sm:px-8">
              <Link
                href={`/${city}`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-gold-light"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {text.back}
              </Link>
            </div>
          </article>
        </div>
      </section>
      <Footer city={city} />
    </main>
  );
}
