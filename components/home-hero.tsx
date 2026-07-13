'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  MapPin,
  MousePointer2,
  Wifi,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { withBasePath } from '@/lib/asset-path';
import { cn } from '@/lib/utils';

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

const slides = [
  {
    image: '/cities/almaty-hero.webp',
    label: { ru: 'Два города — один ритм', kz: 'Екі қала — бір ырғақ', en: 'Two cities — one rhythm' },
    position: 'center center',
  },
  {
    image: '/cities/1.webp',
    label: { ru: 'Астана · Алматы', kz: 'Астана · Алматы', en: 'Astana · Almaty' },
    position: 'center center',
  },
  {
    image: '/cities/2.webp',
    label: { ru: 'Столица и горы', kz: 'Елорда мен таулар', en: 'The capital and the mountains' },
    position: 'center center',
  },
  {
    image: '/cities/3.webp',
    label: { ru: 'Выберите свой город', kz: 'Өз қалаңызды таңдаңыз', en: 'Choose your city' },
    position: 'center center',
  },
  {
    image: '/cities/4.webp',
    label: { ru: 'Казахстан ближе', kz: 'Қазақстан жақынырақ', en: 'Kazakhstan, closer' },
    position: 'center center',
  },
] as const;

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
  scrollHint: {
    ru: 'Листайте фотографии',
    kz: 'Фотоларды сырғытыңыз',
    en: 'Swipe through photos',
  },
  carouselLabel: {
    ru: 'Фотографии Алматы и Астаны',
    kz: 'Алматы мен Астана фотолары',
    en: 'Photos of Almaty and Astana',
  },
  previous: {
    ru: 'Предыдущее фото',
    kz: 'Алдыңғы фото',
    en: 'Previous photo',
  },
  next: {
    ru: 'Следующее фото',
    kz: 'Келесі фото',
    en: 'Next photo',
  },
  goToSlide: {
    ru: 'Перейти к фото',
    kz: 'Фотоға өту',
    en: 'Go to photo',
  },
} as const;

const highlights = [
  { icon: MapPin, value: '2', label: { ru: 'города', kz: 'қала', en: 'cities' } },
  { icon: Clock3, value: '24/7', label: { ru: 'поддержка', kz: 'қолдау', en: 'support' } },
  { icon: Wifi, value: 'Wi-Fi', label: { ru: 'в номерах', kz: 'нөмірлерде', en: 'in every room' } },
] as const;

export function HomeHero() {
  const { i18n } = useTranslation();
  const lang = resolveLang(i18n.language);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 34 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const initialSelectionFrame = window.requestAnimationFrame(onSelect);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      window.cancelAnimationFrame(initialSelectionFrame);
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!emblaApi || isPaused || reduceMotion) return;

    const autoplay = window.setTimeout(() => emblaApi.scrollNext(), 6500);
    return () => window.clearTimeout(autoplay);
  }, [emblaApi, isPaused, reduceMotion, selectedIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="group/hero relative isolate flex min-h-[720px] h-[100svh] max-h-[980px] overflow-hidden bg-graphite text-white"
      aria-label={pick(copy.carouselLabel, lang)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={handleBlur}
    >
      <div
        ref={emblaRef}
        className="absolute inset-0 cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
        aria-roledescription="carousel"
      >
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className="relative h-full min-w-0 shrink-0 grow-0 basis-full overflow-hidden"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} / ${slides.length}`}
            >
              <Image
                src={withBasePath(slide.image)}
                alt=""
                fill
                  loading="eager"
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                sizes="100vw"
                className="select-none object-cover"
                style={{ objectPosition: slide.position }}
                draggable={false}
              />
            </div>
          ))}
        </div>
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

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.26 }}
            className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/15 pt-6 sm:mt-10 sm:gap-x-8"
          >
            {highlights.map((item) => (
              <div key={item.value} className="flex items-center gap-2.5 text-white/75">
                <item.icon className="h-4 w-4 text-accent" strokeWidth={1.8} />
                <span className="text-sm">
                  <strong className="font-semibold text-white">{item.value}</strong>{' '}
                  {pick(item.label, lang)}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="absolute inset-x-0 bottom-0 z-20"
      >
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between gap-4 px-4 pb-5 sm:px-6 sm:pb-7 lg:px-8 lg:pb-8">
          <div className="hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-white/60 sm:flex">
            <MousePointer2 className="h-4 w-4" />
            {pick(copy.scrollHint, lang)}
          </div>

          <div className="ml-auto flex w-full items-center justify-between gap-3 rounded-2xl border border-white/18 bg-black/25 p-2.5 shadow-2xl backdrop-blur-xl sm:w-auto sm:rounded-full sm:pl-5">
            <div className="min-w-0 sm:min-w-44">
              <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/55">
                <span className="tabular-nums text-white">{String(selectedIndex + 1).padStart(2, '0')}</span>
                <span className="h-px w-5 bg-white/30" />
                <span className="tabular-nums">{String(slides.length).padStart(2, '0')}</span>
              </div>
              <p className="mt-0.5 truncate text-sm font-medium text-white/90">
                {pick(slides[selectedIndex].label, lang)}
              </p>
            </div>

            <div className="hidden items-center gap-1.5 md:flex" aria-label={pick(copy.carouselLabel, lang)}>
              {slides.map((slide, index) => (
                <button
                  key={slide.image}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white',
                    selectedIndex === index ? 'w-8 bg-accent' : 'w-1.5 bg-white/35 hover:bg-white/70',
                  )}
                  aria-label={`${pick(copy.goToSlide, lang)} ${index + 1}`}
                  aria-current={selectedIndex === index ? 'true' : undefined}
                />
              ))}
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={scrollPrev}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/12 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={pick(copy.previous, lang)}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={scrollNext}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-graphite transition hover:scale-105 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label={pick(copy.next, lang)}
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 z-10 h-px w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 bg-white/15 sm:w-[calc(100%-3rem)]" />
    </section>
  );
}
