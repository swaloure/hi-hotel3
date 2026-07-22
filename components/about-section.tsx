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
  nearby: { ru: 'Рядом с отелем', kz: 'Қонақүй маңында', en: 'Near the hotel' },
  location: { ru: 'Локация', kz: 'Орналасуы', en: 'Location' },
  realCity: {
    ru: 'В центре городской жизни, но с атмосферой спокойного отдыха.',
    kz: 'Қала өмірінің ортасында, бірақ тыныш демалыс атмосферасымен.',
    en: 'At the center of city life, with the atmosphere of a calm retreat.',
  },
  previous: { ru: 'Предыдущая достопримечательность', kz: 'Алдыңғы көрікті жер', en: 'Previous attraction' },
  next: { ru: 'Следующая достопримечательность', kz: 'Келесі көрікті жер', en: 'Next attraction' },
} as const;

const astanaAttractions = [
  {
    id: 'botanical-garden',
    image: '/cities/astana-riverside.jpg',
    transport: 'walk',
    title: { ru: 'Ботанический сад', kz: 'Ботаникалық бақ', en: 'Botanical Garden' },
    mode: { ru: 'пешком от отеля', kz: 'қонақүйден жаяу', en: 'walk from the hotel' },
    duration: { ru: '2 минуты', kz: '2 минут', en: '2 min' },
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
    id: 'baiterek',
    image: '/cities/baiterek.jpg',
    transport: 'car',
    title: { ru: 'Байтерек', kz: 'Бәйтерек', en: 'Baiterek' },
    mode: { ru: 'на машине', kz: 'көлікпен', en: 'by car' },
    duration: { ru: '11 минут', kz: '11 минут', en: '11 min' },
  },
] as const;

const cityVisuals = {
  almaty: {
    main: '/cities/almaty-downtown-park.jpg',
    detail: '/cities/almaty-koktobe.jpg',
    attractions: {
      ru: ['Dostyk Plaza · 5 минут', 'Медеу · 30 минут', 'Кок-Тобе · рядом'],
      kz: ['Dostyk Plaza · 5 минут', 'Медеу · 30 минут', 'Көк-Төбе · жақын'],
      en: ['Dostyk Plaza · 5 min', 'Medeu · 30 min', 'Kok-Tobe · nearby'],
    },
  },
  astana: {
    main: '/cities/astana-riverside.jpg',
    detail: '/cities/astana-trip-02.jpg',
  },
} as const;

export function AboutSection({ city }: AboutSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);
  const visual = cityVisuals[city];
  const [activeAttraction, setActiveAttraction] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const attraction = astanaAttractions[activeAttraction];
  const AttractionTransportIcon = attraction.transport === 'walk' ? PersonStanding : CarFront;

  useEffect(() => {
    if (city !== 'astana' || isCarouselPaused) return;

    const timer = window.setInterval(() => {
      setActiveAttraction((current) => (current + 1) % astanaAttractions.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [city, isCarouselPaused]);

  const showAttraction = (index: number) => {
    setActiveAttraction((index + astanaAttractions.length) % astanaAttractions.length);
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
              onMouseEnter={() => city === 'astana' && setIsCarouselPaused(true)}
              onMouseLeave={() => setIsCarouselPaused(false)}
              onFocusCapture={() => city === 'astana' && setIsCarouselPaused(true)}
              onBlurCapture={() => setIsCarouselPaused(false)}
            >
              {city === 'astana' ? (
                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={attraction.id}
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
              ) : (
                <Image
                  src={withBasePath(visual.main)}
                  alt={t(`cities.${city}`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              {city === 'astana' ? (
                <div className="absolute inset-x-0 bottom-0 z-10 p-3 text-white sm:p-5 lg:p-6">
                  <div className="rounded-[22px] border border-white/16 bg-black/42 p-4 shadow-2xl backdrop-blur-md sm:p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/65 sm:text-[11px]">
                        {copy.location[lang]}
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => showAttraction(activeAttraction - 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label={copy.previous[lang]}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => showAttraction(activeAttraction + 1)}
                          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/18 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                          aria-label={copy.next[lang]}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <p className="mt-2 max-w-md font-serif text-xl leading-tight text-balance sm:text-2xl lg:text-[28px]">
                      {copy.realCity[lang]}
                    </p>

                    <div className="mt-4 flex items-center gap-3 rounded-2xl bg-white/94 p-3 text-graphite shadow-lg" aria-live="polite">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent/16 text-accent">
                        <AttractionTransportIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold sm:text-base">{attraction.title[lang]}</p>
                        <p className="mt-0.5 text-[11px] text-graphite/55 sm:text-xs">{attraction.mode[lang]}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-graphite px-3 py-2 text-xs font-semibold text-white sm:text-sm">
                        {attraction.duration[lang]}
                      </span>
                    </div>

                    <div className="mt-3 flex justify-center gap-2" role="group" aria-label={copy.location[lang]}>
                      {astanaAttractions.map((item, index) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => showAttraction(index)}
                          className={`h-1.5 rounded-full transition-all ${index === activeAttraction ? 'w-7 bg-accent' : 'w-1.5 bg-white/40 hover:bg-white/70'}`}
                          aria-label={item.title[lang]}
                          aria-current={index === activeAttraction ? 'true' : undefined}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">{copy.location[lang]}</p>
                  <p className="mt-2 max-w-md font-serif text-2xl leading-tight text-balance sm:text-3xl">
                    {copy.realCity[lang]}
                  </p>
                </div>
              )}
            </div>

            {city === 'almaty' && <div className="mt-4 rounded-3xl border border-border/70 bg-background p-4 shadow-[0_18px_45px_rgba(28,30,34,0.08)] sm:p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{copy.nearby[lang]}</p>
                  <p className="text-xs text-muted-foreground">MAZA {t(`cities.${city}`)}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {cityVisuals.almaty.attractions[lang].map((attraction) => (
                  <div
                    key={attraction}
                    className="flex min-h-10 items-center gap-2 rounded-xl border border-border/70 bg-secondary/45 px-3 py-2 text-xs text-foreground/72 sm:text-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {attraction}
                  </div>
                ))}
              </div>
            </div>}
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
