'use client';

import Link from 'next/link';
import { ArrowLeft, FileCheck2, LoaderCircle, ScrollText, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useLegalContent } from '@/hooks/use-legal-content';
import type { LegalPageKind } from '@/lib/data/legal-content';

type Lang = 'ru' | 'kz' | 'en';
type LegalCopy = Record<LegalPageKind, string> & {
  eyebrow: string;
  subtitle: string;
  message: string;
  back: string;
  loading: string;
  loadingHint: string;
  error: string;
  source: string;
};

const copy = {
  ru: {
    privacy: 'Политика конфиденциальности',
    offer: 'Публичная оферта',
    eyebrow: 'Юридическая информация',
    subtitle: 'Официальная информация MAZA в понятном и удобном формате.',
    message: 'Информация скоро появится на этой странице.',
    back: 'Вернуться на главную',
    loading: 'Загружаем документ',
    loadingHint: 'Получаем актуальный текст из Google Таблицы',
    error: 'Не удалось загрузить документ. Попробуйте обновить страницу.',
    source: 'Актуальная версия',
  },
  kz: {
    privacy: 'Құпиялылық саясаты',
    offer: 'Жария оферта',
    eyebrow: 'Құқықтық ақпарат',
    subtitle: 'MAZA ресми ақпараты түсінікті және ыңғайлы форматта.',
    message: 'Бұл бетте ақпарат жақын арада жарияланады.',
    back: 'Басты бетке оралу',
    loading: 'Құжат жүктелуде',
    loadingHint: 'Google кестесінен өзекті мәтінді алып жатырмыз',
    error: 'Құжатты жүктеу мүмкін болмады. Бетті жаңартып көріңіз.',
    source: 'Өзекті нұсқа',
  },
  en: {
    privacy: 'Privacy Policy',
    offer: 'Public Offer',
    eyebrow: 'Legal information',
    subtitle: 'Official MAZA information in a clear and convenient format.',
    message: 'Information will be available on this page soon.',
    back: 'Back to home',
    loading: 'Loading document',
    loadingHint: 'Retrieving the latest text from Google Sheets',
    error: 'The document could not be loaded. Please refresh the page.',
    source: 'Current version',
  },
} satisfies Record<Lang, LegalCopy>;

function resolveLang(language: string): Lang {
  const normalized = language.toLowerCase();
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('kz') || normalized.startsWith('kk')) return 'kz';
  return 'ru';
}

export function LegalPage({ kind }: { kind: LegalPageKind }) {
  const { i18n } = useTranslation();
  const text = copy[resolveLang(i18n.language)];
  const { content, isLoading, hasError } = useLegalContent(kind);
  const DocumentIcon = kind === 'privacy' ? ShieldCheck : ScrollText;

  return (
    <main className="min-h-screen bg-secondary/35">
      <Header city="home" />
      <section className="relative isolate overflow-hidden bg-primary px-4 pb-20 pt-32 text-primary-foreground sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_10%,rgba(201,168,108,0.2),transparent_34%),radial-gradient(circle_at_88%_24%,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-black/18 to-transparent" />

        <div className="mx-auto w-full max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-accent shadow-xl backdrop-blur-sm">
              <DocumentIcon className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs">{text.eyebrow}</p>
            <h1 className="mt-4 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl lg:text-6xl">{text[kind]}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">{text.subtitle}</p>
          </div>

          <article className="mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-background text-foreground shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:mt-12">
            <div className="flex items-center justify-between gap-4 border-b border-border bg-secondary/55 px-5 py-4 sm:px-8">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{text.source}</span>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_0_5px_rgba(16,185,129,0.12)]" aria-hidden="true" />
            </div>

            <div className="min-h-72 px-5 py-8 sm:px-10 sm:py-12 lg:px-14">
              {isLoading ? (
                <div className="flex min-h-56 flex-col items-center justify-center text-center" role="status" aria-live="polite">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <LoaderCircle className="h-7 w-7 animate-spin" aria-hidden="true" />
                  </span>
                  <p className="mt-5 text-lg font-semibold text-foreground">{text.loading}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{text.loadingHint}</p>
                  <div className="mt-7 w-full max-w-xl space-y-3" aria-hidden="true">
                    <span className="block h-2.5 w-full animate-pulse rounded-full bg-muted" />
                    <span className="block h-2.5 w-[88%] animate-pulse rounded-full bg-muted" />
                    <span className="block h-2.5 w-[72%] animate-pulse rounded-full bg-muted" />
                  </div>
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
                href="/"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-gold-light"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                {text.back}
              </Link>
            </div>
          </article>
        </div>
      </section>
      <Footer city="home" />
    </main>
  );
}
