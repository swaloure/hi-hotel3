'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock3, MapPin, Sparkles } from 'lucide-react';
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
} as const;

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
    attractions: {
      ru: ['Ботанический сад · рядом', 'EXPO · 10 минут', 'Байтерек · 12 минут'],
      kz: ['Ботаникалық бақ · жақын', 'EXPO · 10 минут', 'Бәйтерек · 12 минут'],
      en: ['Botanical Garden · nearby', 'EXPO · 10 min', 'Baiterek · 12 min'],
    },
  },
} as const;

export function AboutSection({ city }: AboutSectionProps) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);
  const visual = cityVisuals[city];

  return (
    <section id="about" className="overflow-hidden bg-secondary/45 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.04fr_0.96fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65 }}
            className="relative pb-16 sm:pb-20"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-muted sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={withBasePath(visual.main)}
                alt={t(`cities.${city}`)}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-8">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/58">{copy.location[lang]}</p>
                <p className="mt-2 max-w-md font-serif text-2xl leading-tight text-balance sm:text-3xl">
                  {copy.realCity[lang]}
                </p>
              </div>
            </div>

            <div className="absolute -bottom-1 right-0 w-[78%] rounded-3xl border border-border/70 bg-background/95 p-4 shadow-[0_20px_55px_rgba(28,30,34,0.12)] backdrop-blur-xl sm:w-[70%] sm:p-5 lg:-right-8">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{copy.nearby[lang]}</p>
                  <p className="text-xs text-muted-foreground">Hi Hotel {t(`cities.${city}`)}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                {visual.attractions[lang].map((attraction) => (
                  <div key={attraction} className="flex items-center gap-2 text-xs text-foreground/72 sm:text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    {attraction}
                  </div>
                ))}
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
