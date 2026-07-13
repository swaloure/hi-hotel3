'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  BedDouble,
  BriefcaseBusiness,
  Compass,
  MessageCircle,
  MoonStar,
  Sparkles,
  Trees,
  UsersRound,
  Wifi,
} from 'lucide-react';
import { withBasePath } from '@/lib/asset-path';
import { HomeContactSection } from '@/components/home-contact-section';

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
  heroTitle: {
    ru: 'Уютная городская гостиница в Алматы и Астане',
    kz: 'Алматы мен Астанадағы жайлы қалалық қонақүй',
    en: 'Cozy city hotel in Almaty and Astana',
  },
  heroDescription: {
    ru: 'Формат ближе к квартире: спокойные номера, аккуратные общие зоны и всё нужное для комфортного проживания в городе.',
    kz: 'Пәтерге жақын формат: тыныш нөмірлер, ұқыпты ортақ аймақтар және қалада жайлы тұруға қажеттінің бәрі.',
    en: 'An apartment-like format: calm rooms, neat shared spaces, and everything needed for a comfortable city stay.',
  },
  chooseCityCta: {
    ru: 'Выбрать город',
    kz: 'Қаланы таңдау',
    en: 'Choose a city',
  },
  aboutHotelCta: {
    ru: 'О нашем отеле',
    kz: 'Біздің қонақүй туралы',
    en: 'About our hotel',
  },
  contactCta: {
    ru: 'Связаться с нами',
    kz: 'Бізбен байланысу',
    en: 'Contact us',
  },
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
    ru: 'Спокойный формат без люкса и лишнего дизайна',
    kz: 'Артық сән-салтанатсыз тыныш формат',
    en: 'A calm format without extra luxury',
  },
  aboutDescription: {
    ru: 'MAZA — это аккуратная городская гостиница. Мы делаем упор на чистоту, удобное расположение и понятный сервис.',
    kz: 'MAZA — ұқыпты қалалық қонақүй. Біз тазалыққа, ыңғайлы орналасуға және түсінікті сервиске мән береміз.',
    en: 'MAZA is a neat city hotel. We focus on cleanliness, convenient location, and clear service.',
  },
  contactsCta: {
    ru: 'Контакты',
    kz: 'Байланыс',
    en: 'Contacts',
  },
  roomsCta: {
    ru: 'Номера',
    kz: 'Нөмірлер',
    en: 'Rooms',
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
  const [selectedContactCity, setSelectedContactCity] = useState<'almaty' | 'astana'>('almaty');

  const showCityContacts = (city: 'almaty' | 'astana') => {
    setSelectedContactCity(city);
    window.requestAnimationFrame(() => {
      document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <>
      <section id="home" className="relative min-h-[640px] overflow-hidden sm:min-h-screen">
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${withBasePath('/cities/almaty-hero.jpg')})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,223,179,0.28),transparent_45%)]" />
        </motion.div>

        <div className="relative z-10 mx-auto flex min-h-[640px] w-full max-w-7xl items-end px-4 pb-12 pt-28 sm:min-h-screen sm:px-6 sm:pb-16 sm:pt-36 md:pb-24 lg:px-8">
          <div className="max-w-3xl text-white">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-light leading-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {pick(homeCopy.heroTitle, lang)}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-xl"
            >
              {pick(homeCopy.heroDescription, lang)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:gap-4"
            >
              <Link
                href="#cities"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-medium text-accent-foreground transition hover:bg-accent/90"
              >
                {pick(homeCopy.chooseCityCta, lang)}
              </Link>
              <Link
                href="/#about"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/55 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {pick(homeCopy.aboutHotelCta, lang)}
              </Link>
              <a
                href="https://wa.me/77009845374"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/55 px-7 py-3 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <MessageCircle className="w-4 h-4 mr-2 text-white" />
                {pick(homeCopy.contactCta, lang)}
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="cities" className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="text-sm uppercase tracking-[0.22em] text-accent font-medium">
              {pick(homeCopy.citiesEyebrow, lang)}
            </span>
            <h2 className="mt-4 text-3xl font-light text-foreground text-balance md:text-5xl">
              {pick(homeCopy.citiesTitle, lang)}
            </h2>
            <div className="w-16 h-[2px] bg-accent mx-auto mt-6 mb-6" />
            <p className="text-muted-foreground text-balance">
              {pick(homeCopy.citiesDescription, lang)}
            </p>
          </motion.div>

          <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-8 md:grid-cols-2">
            {cityCards.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
              >
                <article className="group relative h-[420px] overflow-hidden rounded-3xl border border-border/60 shadow-xl sm:h-[500px]">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${withBasePath(city.image)})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                    <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7 md:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-3xl font-light md:text-4xl">{pick(city.title, lang)}</h3>
                        <Link
                          href={`/${city.id}`}
                          aria-label={`MAZA ${pick(city.title, lang)}`}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/50 bg-white/10 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 hover:bg-white hover:text-foreground"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </Link>
                      </div>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/85">{pick(city.subtitle, lang)}</p>
                      <div className="mt-6 grid grid-cols-2 gap-2">
                        <Link
                          href={`/${city.id}#rooms`}
                          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
                        >
                          <BedDouble className="mr-2 h-4 w-4" />
                          {pick(homeCopy.roomsCta, lang)}
                        </Link>
                        <button
                          type="button"
                          onClick={() => showCityContacts(city.id)}
                          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/40 bg-white/10 px-3 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          {pick(homeCopy.contactsCta, lang)}
                        </button>
                      </div>
                    </div>
                  </article>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="bg-secondary/30 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="rounded-3xl border border-border/60 bg-card p-5 shadow-lg sm:p-8 md:p-12"
            >
              <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
                {pick(homeCopy.aboutEyebrow, lang)}
              </span>
              <h2 className="mt-4 text-3xl font-light text-foreground text-balance md:text-5xl">
                {pick(homeCopy.aboutTitle, lang)}
              </h2>
              <div className="w-16 h-[2px] bg-accent mt-6 mb-6" />
              <p className="text-muted-foreground leading-relaxed md:text-lg">
                {pick(homeCopy.aboutDescription, lang)}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#contacts"
                  className="inline-flex items-center rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {pick(homeCopy.contactsCta, lang)}
                </Link>
                <Link
                  href="#cities"
                  className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                >
                  {pick(homeCopy.roomsCta, lang)}
                </Link>
              </div>
            </motion.div>

            <div className="grid gap-4">
              {advantages.map((item, index) => (
                <motion.article
                  key={item.title.en}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
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

      <section id="format" className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="text-sm uppercase tracking-[0.22em] text-accent font-medium">
              {pick(homeCopy.formatEyebrow, lang)}
            </span>
            <h2 className="mt-4 text-3xl font-light text-foreground text-balance md:text-5xl">
              {pick(homeCopy.formatTitle, lang)}
            </h2>
            <div className="w-16 h-[2px] bg-accent mt-6 mb-6" />
            <p className="text-muted-foreground text-balance">
              {pick(homeCopy.formatDescription, lang)}
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {moodCards.map((card, index) => (
              <motion.article
                key={card.title.en}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
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

      <HomeContactSection
        lang={lang}
        selectedCity={selectedContactCity}
        onSelectCity={setSelectedContactCity}
      />
    </>
  );
}
