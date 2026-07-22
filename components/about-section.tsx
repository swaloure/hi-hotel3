'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CarFront, ChevronLeft, ChevronRight, Clock3, MapPin, PersonStanding, Sparkles } from 'lucide-react';
import { SectionHeading } from '@/components/section-heading';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';

interface AboutSectionProps {
  city: 'almaty' | 'astana';
}

const features = [
  { key: 'feature1', icon: MapPin },
  { key: 'feature2', icon: Sparkles },
  { key: 'feature3', icon: Clock3 },
] as const;

const copy = {
  location: { ru: 'Локация', kz: 'Орналасуы', en: 'Location' },
  previous: { ru: 'Предыдущая достопримечательность', kz: 'Алдыңғы көрікті жер', en: 'Previous attraction' },
  next: { ru: 'Следующая достопримечательность', kz: 'Келесі көрікті жер', en: 'Next attraction' },
} as const;

const attractions = {
  almaty: [
    {
      id: 'dostyk-plaza',
      image: '/cities/dostyk.jpg',
      transport: 'walk',
      title: { ru: 'Dostyk Plaza', kz: 'Dostyk Plaza', en: 'Dostyk Plaza' },
      mode: { ru: 'пешком от отеля', kz: 'қонақүйден жаяу', en: 'walk from the hotel' },
      duration: { ru: '2 минуты', kz: '2 минут', en: '2 min' },
    },
    {
      id: 'medeu',
      image: '/cities/medeu.jpg',
      transport: 'car',
      title: { ru: 'Медеу', kz: 'Медеу', en: 'Medeu' },
      mode: { ru: 'на машине', kz: 'көлікпен', en: 'by car' },
      duration: { ru: '25 минут', kz: '25 минут', en: '25 min' },
    },
    {
      id: 'kok-tobe',
      image: '/cities/koktobe.jpg',
      transport: 'car',
      title: { ru: 'Кок-Тобе', kz: 'Көк-Төбе', en: 'Kok-Tobe' },
      mode: { ru: 'на машине', kz: 'көлікпен', en: 'by car' },
      duration: { ru: '12 минут', kz: '12 минут', en: '12 min' },
    },
    {
      id: 'terrenkur',
      image: '/cities/terrenkur.jpeg',
      transport: 'walk',
      title: { ru: 'Терренкур', kz: 'Терренкур', en: 'Terrenkur' },
      mode: { ru: 'пешком от отеля', kz: 'қонақүйден жаяу', en: 'walk from the hotel' },
      duration: { ru: '2 минуты', kz: '2 минут', en: '2 min' },
    },
    {
      id: 'botanical-garden',
      image: '/cities/botanalmaty.jpeg',
      transport: 'car',
      title: { ru: 'Ботанический сад', kz: 'Ботаникалық бақ', en: 'Botanical Garden' },
      mode: { ru: 'на машине', kz: 'көлікпен', en: 'by car' },
      duration: { ru: '15 минут', kz: '15 минут', en: '15 min' },
    },
    {
      id: 'almaty-museum-of-arts',
      image: '/cities/museiumofarts.jpg',
      transport: 'walk',
      title: { ru: 'Almaty Museum of Arts', kz: 'Almaty Museum of Arts', en: 'Almaty Museum of Arts' },
      mode: { ru: 'пешком от отеля', kz: 'қонақүйден жаяу', en: 'walk from the hotel' },
      duration: { ru: '15 минут', kz: '15 минут', en: '15 min' },
    },
    {
      id: 'national-museum',
      image: '/cities/museumalmaty.jpg',
      transport: 'walk',
      title: { ru: 'Национальный музей', kz: 'Ұлттық музей', en: 'National Museum' },
      mode: { ru: 'пешком от отеля', kz: 'қонақүйден жаяу', en: 'walk from the hotel' },
      duration: { ru: '15 минут', kz: '15 минут', en: '15 min' },
    },
  ],
  astana: [
    {
      id: 'baiterek',
      image: '/cities/baiterek.jpg',
      transport: 'car',
      title: { ru: 'Байтерек', kz: 'Бәйтерек', en: 'Baiterek' },
      mode: { ru: 'на машине', kz: 'көлікпен', en: 'by car' },
      duration: { ru: '11 минут', kz: '11 минут', en: '11 min' },
    },
    {
      id: 'expo',
      image: '/cities/expo.jpg',
      transport: 'car',
      title: { ru: 'EXPO', kz: 'EXPO', en: 'EXPO' },
      mode: { ru: 'на машине', kz: 'көлікпен', en: 'by car' },
      duration: { ru: '8 минут', kz: '8 минут', en: '8 min' },
    },
    {
      id: 'botanical-garden',
      image: '/cities/astana-riverside.jpg',
      transport: 'walk',
      title: { ru: 'Ботанический сад', kz: 'Ботаникалық бақ', en: 'Botanical Garden' },
      mode: { ru: 'пешком от отеля', kz: 'қонақүйден жаяу', en: 'walk from the hotel' },
      duration: { ru: '2 минуты', kz: '2 минут', en: '2 min' },
    },
  ],
} as const;

const cityVisuals = {
  almaty: {
    detail: '/cities/almaty-koktobe.jpg',
  },
  astana: {
    detail: '/cities/astana-trip-02.jpg',
  },
} as const;

export function AboutSection({ city }: AboutSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);
  const visual = cityVisuals[city];
  const cityAttractions = attractions[city];
  const [activeAttraction, setActiveAttraction] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const normalizedActiveAttraction = activeAttraction % cityAttractions.length;
  const attraction = cityAttractions[normalizedActiveAttraction];
  const AttractionTransportIcon = attraction.transport === 'walk' ? PersonStanding : CarFront;

  useEffect(() => {
    if (isCarouselPaused) return;

    const timer = window.setInterval(() => {
      setActiveAttraction((current) => (current + 1) % cityAttractions.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [cityAttractions, isCarouselPaused]);

  const showAttraction = (index: number) => {
    setActiveAttraction((index + cityAttractions.length) % cityAttractions.length);
  };

  return (
    <section id="about" className="overflow-hidden bg-secondary/45 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="relative"
          >
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-muted sm:aspect-[5/4] lg:aspect-[4/5]"
              onMouseEnter={() => setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocusCapture={() => setIsCarouselPaused(true)}
              onBlurCapture={() => setIsCarouselPaused(false)}
            >
              <AnimatePresence initial={false} mode="popLayout">
                <motion.div
                  key={`${city}-${attraction.id}`}
                  initial={{ opacity: 0, scale: 1.025 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={withBasePath(attraction.image)}
                    alt={attraction.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 52vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-white sm:p-5 lg:p-6">
                  <div className="rounded-[22px] border border-white/16 bg-black/42 p-4 shadow-2xl backdrop-blur-md sm:p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-[11px]">
                        {copy.location[lang]}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => showAttraction(normalizedActiveAttraction - 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label={copy.previous[lang]}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => showAttraction(normalizedActiveAttraction + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label={copy.next[lang]}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-3 rounded-2xl bg-white/94 p-3 text-graphite shadow-lg" aria-live="polite">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/16 text-accent">
                        <AttractionTransportIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold leading-tight sm:text-base">{attraction.title[lang]}</p>
                        <p className="mt-0.5 text-[11px] text-graphite/55 sm:text-xs">{attraction.mode[lang]}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-graphite px-3 py-2 text-xs font-semibold text-white sm:text-sm">
                        {attraction.duration[lang]}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-center gap-2" role="group" aria-label={copy.location[lang]}>
                      {cityAttractions.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => showAttraction(index)}
                          className={`h-1.5 rounded-full transition-all ${index === normalizedActiveAttraction ? 'w-7 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                          aria-label={item.title[lang]}
                          aria-current={index === normalizedActiveAttraction ? 'true' : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
            >
              <SectionHeading
                eyebrow={t('about.subtitle')}
                title={t('about.title')}
                description={t('about.description')}
              />
            </motion.div>

            <div className="mt-9 divide-y divide-border border-y border-border">
              {features.map((feature, index) => (
                <motion.article
                  key={feature.key}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="grid grid-cols-[auto_1fr] gap-4 py-5 sm:gap-5 sm:py-6"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-background text-accent ring-1 ring-border">
                    <feature.icon className="h-4.5 w-4.5" />
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{t(`about.${feature.key}`)}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">{t(`about.${feature.key}Desc`)}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-border bg-background p-3 pr-5">
              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl">
                <Image src={withBasePath(visual.detail)} alt="" fill sizes="80px" className="object-cover" />
              </div>
              <p className="text-sm leading-6 text-muted-foreground">{hotelNote(city, lang)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function hotelNote(city: AboutSectionProps['city'], lang: ReturnType<typeof resolveLanguage>) {
  const notes = {
    almaty: {
      ru: 'Горы, зелёные улицы и всё необходимое для комфортной поездки — в удобном городском ритме.',
      kz: 'Таулар, жасыл көшелер және жайлы сапарға қажеттінің бәрі — ыңғайлы қала ырғағында.',
      en: 'Mountains, green streets, and everything needed for a comfortable stay — in an easy city rhythm.',
    },
    astana: {
      ru: 'Современная архитектура, деловые маршруты и спокойный отдых после насыщенного дня.',
      kz: 'Заманауи сәулет, іскерлік бағыттар және қарқынды күннен кейінгі тыныш демалыс.',
      en: 'Modern architecture, convenient business routes, and a calm rest after a busy day.',
    },
  } as const;

  return notes[city][lang];
}
