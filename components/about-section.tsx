'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Award, Clock } from 'lucide-react';

interface AboutSectionProps {
  city: 'almaty' | 'astana';
}

const features = [
  { key: 'feature1', icon: MapPin },
  { key: 'feature2', icon: Award },
  { key: 'feature3', icon: Clock },
];

export function AboutSection({ city }: AboutSectionProps) {
  const { t, i18n } = useTranslation();
  const normalized = i18n.language.toLowerCase();
  const lang: 'ru' | 'kz' | 'en' = normalized.startsWith('en')
    ? 'en'
    : normalized.startsWith('kz') || normalized.startsWith('kk')
      ? 'kz'
      : 'ru';

  const images = city === 'almaty' 
    ? [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      ]
    : [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
      ];

  const nearbyAttractionsTitle = {
    ru: 'Достопримечательности рядом',
    kz: 'Жақын маңдағы көрікті орындар',
    en: 'Nearby Attractions',
  };

  const nearbyAttractionsSubtitle = {
    ru: 'Главные точки рядом с отелем',
    kz: 'Қонақүй жанындағы негізгі орындар',
    en: 'Top places near the hotel',
  };

  const nearbyAttractions = city === 'almaty'
    ? {
        ru: ['30 минут до Медеу', '5 минут до Dostyk Plaza'],
        kz: ['Медеуге 30 минут', 'Dostyk Plaza-ға 5 минут'],
        en: ['30 minutes to Medeu', '5 minutes to Dostyk Plaza'],
      }
    : {
        ru: [
          'Ботанический сад в пешей доступности',
          'Линейный парк',
          'EXPO',
          'Акорда',
          'Байтерек',
          'Abu Dhabi Plaza',
        ],
        kz: [
          'Ботаникалық бақ жаяу қашықтықта',
          'Сызықтық парк',
          'EXPO',
          'Ақорда',
          'Бәйтерек',
          'Abu Dhabi Plaza',
        ],
        en: [
          'Botanical Garden within walking distance',
          'Linear Park',
          'EXPO',
          'Akorda',
          'Baiterek',
          'Abu Dhabi Plaza',
        ],
      };

  return (
    <section id="about" className="bg-secondary/30 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={images[0]}
                alt="Hotel interior"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-8 border-background hidden md:block"
            >
              <img
                src={images[1]}
                alt="Hotel room"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
              {t('about.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mt-4 mb-6 text-balance">
              {t('about.title')}
            </h2>
            <div className="w-16 h-[2px] bg-accent mb-8" />
            <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:mb-10 sm:text-lg">
              {t('about.description')}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {t(`about.${feature.key}`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`about.${feature.key}Desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative mt-8 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-5 shadow-md sm:mt-10 sm:p-6"
            >
              <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-accent/15 blur-2xl" />
              <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-accent/10 blur-3xl" />

              <div className="relative flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">
                    {nearbyAttractionsTitle[lang]}
                  </h3>
                  <p className="text-xs text-muted-foreground">{nearbyAttractionsSubtitle[lang]}</p>
                </div>
              </div>

              <ul className="relative mt-4 grid gap-2 sm:grid-cols-2">
                {nearbyAttractions[lang].map((attraction) => (
                  <li
                    key={attraction}
                    className="rounded-xl border border-border/60 bg-background/85 px-3 py-2 text-sm text-foreground/90 shadow-sm"
                  >
                    <span className="mr-2 text-accent">•</span>
                    {attraction}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
