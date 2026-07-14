'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react';
import { SmoothLink } from '@/components/smooth-link';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';

interface HeroSectionProps {
  city: 'almaty' | 'astana';
}

const copy = {
  eyebrow: {
    almaty: { ru: 'MAZA · Алматы', kz: 'MAZA · Алматы', en: 'MAZA · Almaty' },
    astana: { ru: 'MAZA · Астана', kz: 'MAZA · Астана', en: 'MAZA · Astana' },
  },
  title: {
    almaty: {
      ru: 'Спокойный отдых у подножия гор',
      kz: 'Тау бөктеріндегі тыныш демалыс',
      en: 'A calm stay at the foot of the mountains',
    },
    astana: {
      ru: 'Комфорт в ритме современной столицы',
      kz: 'Заманауи астана ырғағындағы жайлылық',
      en: 'Comfort in the rhythm of the modern capital',
    },
  },
  description: {
    almaty: {
      ru: 'Удобная городская локация, продуманные номера и тёплый сервис для коротких поездок и длительного проживания.',
      kz: 'Қысқа сапарлар мен ұзақ тұруға арналған ыңғайлы орын, ойластырылған нөмірлер және жылы сервис.',
      en: 'A convenient city location, thoughtful rooms, and warm service for short trips and longer stays.',
    },
    astana: {
      ru: 'Современные номера рядом с ключевыми точками левого берега — для работы, отдыха и знакомства с городом.',
      kz: 'Сол жағалаудың негізгі орындарына жақын заманауи нөмірлер — жұмысқа, демалысқа және қаламен танысуға.',
      en: 'Modern rooms near the key destinations of the left bank — for work, rest, and exploring the city.',
    },
  },
  seeRooms: { ru: 'Посмотреть номера', kz: 'Нөмірлерді көру', en: 'Explore rooms' },
} as const;

export function HeroSection({ city }: HeroSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);

  const heroImage = city === 'astana' ? '/cities/astana-embankment.jpg' : '/cities/almaty-cityscape.jpg';

  return (
    <section className="relative isolate flex min-h-[820px] h-[100svh] max-h-[940px] overflow-hidden bg-graphite text-white sm:min-h-[720px]">
      <div
        className="absolute inset-0 -z-30 bg-cover bg-center"
        style={{ backgroundImage: `url(${withBasePath(heroImage)})` }}
      />
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/82 via-black/48 to-black/16" />
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/32 via-transparent to-black/76" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_12%_45%,rgba(201,168,108,0.22),transparent_38%)]" />

      <div className="mx-auto flex w-full max-w-7xl items-center px-4 pb-24 pt-32 sm:px-6 sm:pb-28 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/78 backdrop-blur-md sm:text-xs">
            <MapPin className="h-3.5 w-3.5 text-accent" />
            {copy.eyebrow[city][lang]}
          </div>

          <h1 className="mt-6 max-w-3xl font-serif text-[clamp(3rem,7vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.045em] text-balance">
            {copy.title[city][lang]}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/72 text-pretty sm:text-lg sm:leading-8">
            {copy.description[city][lang]}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <SmoothLink
              href={`/booking/${city}`}
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-gold-light"
            >
              {t('hero.cta')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </SmoothLink>
            <Link
              href="#rooms"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/28 bg-white/8 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/14"
            >
              {copy.seeRooms[lang]}
              <ArrowDown className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
