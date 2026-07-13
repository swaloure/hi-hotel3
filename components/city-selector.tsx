'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Compass,
  MoonStar,
  Sparkles,
  Trees,
  UsersRound,
  Wifi,
} from 'lucide-react';
import { withBasePath } from '@/lib/asset-path';
import { HomeHero } from '@/components/home-hero';
import { SectionHeading } from '@/components/section-heading';

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

const cityCards = [
  {
    id: 'almaty',
    image: '/cities/almaty-cityscape.jpg',
    title: {
      ru: 'Алматы',
      kz: 'Алматы',
      en: 'Almaty',
    },
    subtitle: {
      ru: 'Реальные городские кадры, зеленые улицы и удобный центр.',
      kz: 'Шынайы қалалық кадрлар, жасыл көшелер және ыңғайлы орталық.',
      en: 'Real city views, green streets, and a convenient center.',
    },
  },
  {
    id: 'astana',
    image: '/cities/astana-embankment.jpg',
    title: {
      ru: 'Астана',
      kz: 'Астана',
      en: 'Astana',
    },
    subtitle: {
      ru: 'Современный район, прямые маршруты и спокойная городская атмосфера.',
      kz: 'Заманауи аудан, тікелей маршруттар және тыныш қалалық атмосфера.',
      en: 'Modern district, direct routes, and a calm city atmosphere.',
    },
  },
] as const;

const advantages = [
  {
    title: {
      ru: 'Удобное расположение',
      kz: 'Ыңғайлы орналасу',
      en: 'Convenient location',
    },
    description: {
      ru: 'Рядом транспорт, магазины и кафе. Легко добраться в любую часть города.',
      kz: 'Көлік, дүкендер және кафелер жақын. Қаланың кез келген бөлігіне оңай жетуге болады.',
      en: 'Transport, shops, and cafes are nearby. Easy access to any part of the city.',
    },
    icon: Compass,
  },
  {
    title: {
      ru: 'Чистые интерьеры',
      kz: 'Таза интерьер',
      en: 'Clean interiors',
    },
    description: {
      ru: 'Спокойная палитра, аккуратные материалы и понятная планировка.',
      kz: 'Тыныш түстер, ұқыпты материалдар және түсінікті жоспарлау.',
      en: 'Calm palette, neat materials, and a clear layout.',
    },
    icon: Sparkles,
  },
  {
    title: {
      ru: 'Тихая атмосфера',
      kz: 'Тыныш атмосфера',
      en: 'Quiet atmosphere',
    },
    description: {
      ru: 'Подходит тем, кто ценит спокойный отдых после дороги или работы.',
      kz: 'Жолдан немесе жұмыстан кейін тыныш демалысты бағалайтындар үшін қолайлы.',
      en: 'Perfect for guests who value quiet rest after travel or work.',
    },
    icon: Trees,
  },
  {
    title: {
      ru: 'Базовый комфорт',
      kz: 'Негізгі жайлылық',
      en: 'Essential comfort',
    },
    description: {
      ru: 'Wi-Fi, удобное заселение и стандартные удобства для жизни в городе.',
      kz: 'Wi-Fi, ыңғайлы тіркелу және қалада тұруға қажет стандартты қолайлылықтар.',
      en: 'Wi-Fi, easy check-in, and standard amenities for city living.',
    },
    icon: Wifi,
  },
] as const;

const moodCards = [
  {
    title: {
      ru: 'Для работы',
      kz: 'Жұмыс үшін',
      en: 'For work',
    },
    badge: {
      ru: 'стабильный Wi-Fi',
      kz: 'тұрақты Wi-Fi',
      en: 'stable Wi-Fi',
    },
    description: {
      ru: 'Рабочий стол, нормальный интернет и спокойные часы в течение дня.',
      kz: 'Жұмыс үстелі, тұрақты интернет және күн ішінде тыныш уақыт.',
      en: 'Work desk, solid internet, and quiet hours throughout the day.',
    },
    icon: BriefcaseBusiness,
  },
  {
    title: {
      ru: 'Для коротких поездок',
      kz: 'Қысқа сапар үшін',
      en: 'For short trips',
    },
    badge: {
      ru: '24/7 заезд',
      kz: '24/7 кіру',
      en: '24/7 check-in',
    },
    description: {
      ru: 'Быстрое заселение, понятная логистика и удобный городской ритм.',
      kz: 'Жылдам тіркелу, түсінікті логистика және ыңғайлы қалалық ритм.',
      en: 'Fast check-in, clear logistics, and a comfortable city rhythm.',
    },
    icon: UsersRound,
  },
  {
    title: {
      ru: 'Для отдыха',
      kz: 'Демалыс үшін',
      en: 'For rest',
    },
    badge: {
      ru: 'тихо после 23:00',
      kz: '23:00 кейін тыныш',
      en: 'quiet after 23:00',
    },
    description: {
      ru: 'Тихие номера и мягкий свет, чтобы спокойно восстановиться.',
      kz: 'Тыныш нөмірлер мен жұмсақ жарық тынығып қалпына келуге көмектеседі.',
      en: 'Quiet rooms and soft lighting to recover comfortably.',
    },
    icon: MoonStar,
  },
] as const;

const homeCopy = {
  citiesEyebrow: {
    ru: 'Выберите город',
    kz: 'Қаланы таңдаңыз',
    en: 'Choose a city',
  },
  citiesTitle: {
    ru: 'Две реальные локации: Алматы и Астана',
    kz: 'Екі нақты локация: Алматы және Астана',
    en: 'Two real locations: Almaty and Astana',
  },
  citiesDescription: {
    ru: 'На фото — реальные городские кадры. Выберите филиал, который ближе по маршруту и атмосфере.',
    kz: 'Фотоларда — шынайы қалалық көріністер. Маршрут пен атмосфераға жақын филиалды таңдаңыз.',
    en: 'These are real city photos. Choose the branch that best fits your route and atmosphere.',
  },
  aboutEyebrow: {
    ru: 'О нас',
    kz: 'Біз туралы',
    en: 'About us',
  },
  aboutTitle: {
    ru: 'Всё необходимое для комфортной городской поездки',
    kz: 'Жайлы қалалық сапарға қажеттінің бәрі',
    en: 'Everything needed for a comfortable city stay',
  },
  aboutDescription: {
    ru: 'Hi Hotel — это аккуратная городская гостиница. Мы делаем упор на чистоту, удобное расположение и понятный сервис.',
    kz: 'Hi Hotel — ұқыпты қалалық қонақүй. Біз тазалыққа, ыңғайлы орналасуға және түсінікті сервиске мән береміз.',
    en: 'Hi Hotel is a neat city hotel. We focus on cleanliness, convenient location, and clear service.',
  },
  chooseCta: {
    ru: 'Выбрать отель',
    kz: 'Қонақүйді таңдау',
    en: 'Choose a hotel',
  },
  formatEyebrow: {
    ru: 'Формат проживания',
    kz: 'Тұру форматы',
    en: 'Stay format',
  },
  formatTitle: {
    ru: 'Подходит для поездок по делам и отдыха',
    kz: 'Іссапарға да, демалысқа да қолайлы',
    en: 'Great for both work trips and leisure',
  },
  formatDescription: {
    ru: 'Можно спокойно работать, отдыхать после дороги и быстро решать бытовые вопросы.',
    kz: 'Тыныш жұмыс істеуге, жолдан кейін демалуға және тұрмыстық мәселелерді тез шешуге болады.',
    en: 'You can work calmly, rest after the road, and handle daily needs quickly.',
  },
} as const;

export function CitySelector() {
  const { i18n } = useTranslation();
  const lang = resolveLang(i18n.language);

  return (
    <>
      <HomeHero />

      <section id="cities" className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl"
          >
            <SectionHeading
              eyebrow={pick(homeCopy.citiesEyebrow, lang)}
              title={pick(homeCopy.citiesTitle, lang)}
              description={pick(homeCopy.citiesDescription, lang)}
              align="center"
            />
          </motion.div>

          <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 md:gap-7">
            {cityCards.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
              >
                <Link href={`/${city.id}`} className="group block">
                  <article className="relative h-[390px] overflow-hidden rounded-[28px] border border-border/70 bg-muted sm:h-[500px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-[1.035]"
                      style={{ backgroundImage: `url(${withBasePath(city.image)})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/18 to-black/8" />
                    <div className="absolute left-5 top-5 rounded-full border border-white/18 bg-black/18 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md sm:left-7 sm:top-7">
                      0{index + 1}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-serif text-4xl font-medium tracking-[-0.035em] md:text-5xl">{pick(city.title, lang)}</h3>
                        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-accent">
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">{pick(city.subtitle, lang)}</p>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-secondary/45 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="self-start lg:sticky lg:top-28"
            >
              <SectionHeading
                eyebrow={pick(homeCopy.aboutEyebrow, lang)}
                title={pick(homeCopy.aboutTitle, lang)}
                description={pick(homeCopy.aboutDescription, lang)}
              />
              <Link href="#cities" className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90">
                {pick(homeCopy.chooseCta, lang)}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {advantages.map((item, index) => (
                <motion.article
                  key={item.title.en}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-[24px] border border-border/80 bg-background p-6 transition hover:-translate-y-0.5 hover:border-accent/35"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <item.icon className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-medium text-foreground">{pick(item.title, lang)}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(item.description, lang)}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="format" className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <SectionHeading
              eyebrow={pick(homeCopy.formatEyebrow, lang)}
              title={pick(homeCopy.formatTitle, lang)}
              description={pick(homeCopy.formatDescription, lang)}
            />
          </motion.div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {moodCards.map((card, index) => (
              <motion.article
                key={card.title.en}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="group rounded-[24px] border border-border/80 bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_20px_50px_rgba(28,30,34,0.08)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground transition group-hover:bg-accent group-hover:text-accent-foreground">
                    <card.icon className="w-5 h-5" />
                  </span>
                  <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {pick(card.badge, lang)}
                  </span>
                </div>
                <h3 className="mt-5 text-xl font-medium text-foreground">{pick(card.title, lang)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pick(card.description, lang)}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
