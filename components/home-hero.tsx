'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { withBasePath } from '@/lib/asset-path';

type Lang = 'ru' | 'kz' | 'en';
type LocalizedText = Record<Lang, string>;

function resolveLang(language: string): Lang {
  const normalized = language.toLowerCase();

  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('kz') || normalized.startsWith('kk')) return 'kz';

  return 'ru';
}

function pick(text: LocalizedText, lang: Lang): string {
  return text[lang];
}

const heroImage = '/cities/almaty-hero.webp';

const heroCaption = {
  ru: 'Два города — один ритм',
  kz: 'Екі қала — бір ырғақ',
  en: 'Two cities — one rhythm',
} as const;

const copy = {
  eyebrow: {
    ru: 'Городские отели в Казахстане',
    kz: 'Қазақстандағы қалалық қонақүйлер',
    en: 'City hotels in Kazakhstan',
  },
  title: {
    ru: 'Комфортный город начинается с MAZA',
    kz: 'Жайлы қала MAZA-дан басталады',
    en: 'A comfortable city starts with MAZA',
  },
  description: {
    ru: 'Спокойные номера, удобные локации и всё необходимое для деловой поездки, короткого визита или неспешного отдыха.',
    kz: 'Тыныш нөмірлер, ыңғайлы орындар және іссапарға, қысқа сапарға немесе жайлы демалысқа қажеттінің бәрі.',
    en: 'Calm rooms, convenient locations, and everything you need for business, a short visit, or an unhurried stay.',
  },
  chooseCity: {
    ru: 'Выбрать город',
    kz: 'Қаланы таңдау',
    en: 'Choose a city',
  },
  discover: {
    ru: 'Узнать об отеле',
    kz: 'Қонақүй туралы',
    en: 'Discover the hotel',
  },
  carouselLabel: {
    ru: 'Фотографии Алматы и Астаны',
    kz: 'Алматы мен Астана фотолары',
    en: 'Photos of Almaty and Astana',
  },
} as const;

export function HomeHero() {
  const { i18n } = useTranslation();
  const lang = resolveLang(i18n.language);

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[720px] h-[100svh] max-h-[980px] overflow-hidden bg-graphite text-white"
      aria-label={pick(copy.carouselLabel, lang)}
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={withBasePath(heroImage)}
          alt=""
          fill
          priority
          sizes="100vw"
          className="select-none object-cover object-center"
          draggable={false}
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/10 lg:from-black/78 lg:via-black/38 lg:to-black/5" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/75" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_38%,rgba(210,172,104,0.23),transparent_38%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/35 to-transparent" />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl items-center px-4 pb-32 pt-32 sm:px-6 sm:pb-36 sm:pt-36 lg:px-8 lg:pb-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.03 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur-md sm:text-xs"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_14px_rgba(210,172,104,0.9)]" />
            {pick(copy.eyebrow, lang)}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.08 }}
            className="max-w-3xl font-serif text-[clamp(2.65rem,6vw,5.6rem)] font-medium leading-[0.96] tracking-[-0.045em] text-balance"
          >
            {pick(copy.title, lang)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.14 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 text-pretty sm:text-lg lg:text-xl"
          >
            {pick(copy.description, lang)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link
              href="#cities"
              className="group/cta inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground shadow-[0_16px_45px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {pick(copy.chooseCity, lang)}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
            </Link>
            <Link
              href="#about"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/8 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {pick(copy.discover, lang)}
            </Link>
          </motion.div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute inset-x-0 bottom-0 z-20"
      >
        <div className="mx-auto flex w-full max-w-7xl justify-end px-4 pb-5 sm:px-6 sm:pb-7 lg:px-8 lg:pb-8">
          <p className="rounded-full border border-white/18 bg-black/25 px-5 py-3 text-sm font-medium text-white/90 shadow-2xl backdrop-blur-xl">
            {pick(heroCaption, lang)}
          </p>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-px w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 bg-white/15 sm:w-[calc(100%-3rem)]" />
    </section>
  );
}
