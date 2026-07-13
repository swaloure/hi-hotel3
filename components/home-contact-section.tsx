'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BedDouble,
  CalendarCheck,
  Check,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
} from 'lucide-react';
import { getHotelByCity } from '@/lib/data/hotels';
import { withBasePath } from '@/lib/asset-path';

type City = 'almaty' | 'astana';
type Lang = 'ru' | 'kz' | 'en';
type MapProvider = 'yandex' | 'dgis' | 'google';

interface HomeContactSectionProps {
  lang: Lang;
  selectedCity: City;
  onSelectCity: (city: City) => void;
}

const copy = {
  ru: {
    eyebrow: 'Контакты',
    title: 'Выберите город — всё важное уже здесь',
    description: 'Адрес, телефон, WhatsApp, карта и быстрый переход к номерам нужного филиала.',
    selectCity: 'Выберите филиал',
    address: 'Адрес',
    phone: 'Телефон',
    email: 'Email',
    hours: 'Режим работы',
    allDay: 'Круглосуточно',
    whatsapp: 'Написать в WhatsApp',
    rooms: 'Смотреть номера',
    book: 'Забронировать',
    hotelPage: 'Страница отеля',
    map: 'Карта и маршрут',
    mapHint: 'Переключите сервис или откройте маршрут в приложении.',
    openMap: 'Открыть карту',
    externalMapTitle: 'Открыть маршрут в 2ГИС',
    externalMapDescription: '2ГИС откроется в новой вкладке с выбранной точкой на карте.',
    almaty: 'Алматы',
    astana: 'Астана',
  },
  kz: {
    eyebrow: 'Байланыс',
    title: 'Қаланы таңдаңыз — барлық ақпарат осында',
    description: 'Қажетті қонақ үйдің мекенжайы, телефоны, WhatsApp, картасы және бөлмелері.',
    selectCity: 'Қонақ үйді таңдаңыз',
    address: 'Мекенжай',
    phone: 'Телефон',
    email: 'Email',
    hours: 'Жұмыс уақыты',
    allDay: 'Тәулік бойы',
    whatsapp: 'WhatsApp-қа жазу',
    rooms: 'Бөлмелерді көру',
    book: 'Брондау',
    hotelPage: 'Қонақ үй беті',
    map: 'Карта және маршрут',
    mapHint: 'Карта сервисін таңдаңыз немесе маршрутты қолданбада ашыңыз.',
    openMap: 'Картаны ашу',
    externalMapTitle: 'Бағытты 2ГИС арқылы ашу',
    externalMapDescription: 'Таңдалған орын 2ГИС картасында жаңа бетте ашылады.',
    almaty: 'Алматы',
    astana: 'Астана',
  },
  en: {
    eyebrow: 'Contacts',
    title: 'Choose a city — everything you need is here',
    description: 'Address, phone, WhatsApp, map, and quick access to rooms at the selected hotel.',
    selectCity: 'Choose a hotel',
    address: 'Address',
    phone: 'Phone',
    email: 'Email',
    hours: 'Working hours',
    allDay: 'Open 24/7',
    whatsapp: 'Message on WhatsApp',
    rooms: 'View rooms',
    book: 'Book now',
    hotelPage: 'Hotel page',
    map: 'Map and directions',
    mapHint: 'Switch map providers or open directions in the app.',
    openMap: 'Open map',
    externalMapTitle: 'Open directions in 2GIS',
    externalMapDescription: '2GIS will open the selected location in a new browser tab.',
    almaty: 'Almaty',
    astana: 'Astana',
  },
} as const;

const cityImages: Record<City, string> = {
  almaty: '/cities/almaty-cityscape.jpg',
  astana: '/cities/astana-embankment.jpg',
};

export function HomeContactSection({ lang, selectedCity, onSelectCity }: HomeContactSectionProps) {
  const [selectedMap, setSelectedMap] = useState<MapProvider>('yandex');
  const text = copy[lang];
  const hotel = getHotelByCity(selectedCity);

  if (!hotel) return null;

  const { lat, lng } = hotel.coordinates;
  const mapProviders: Record<MapProvider, { label: string; src?: string; href: string }> = {
    yandex: {
      label: 'Яндекс',
      src: `https://yandex.com/map-widget/v1/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm&lang=ru_RU`,
      href: `https://yandex.com/maps/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm`,
    },
    dgis: {
      label: '2ГИС',
      href: `https://2gis.kz/search/${lat},${lng}`,
    },
    google: {
      label: 'Google',
      src: `https://maps.google.com/?q=${lat},${lng}&z=16&output=embed`,
      href: `https://maps.google.com/?q=${lat},${lng}`,
    },
  };

  const contactItems = [
    {
      icon: MapPin,
      label: text.address,
      value: hotel.address[lang],
      href: `https://maps.google.com/?q=${lat},${lng}`,
    },
    {
      icon: Phone,
      label: text.phone,
      value: hotel.phone,
      href: `tel:${hotel.phone.replace(/[^+\d]/g, '')}`,
    },
    {
      icon: Mail,
      label: text.email,
      value: hotel.email,
      href: `mailto:${hotel.email}`,
    },
    {
      icon: Clock3,
      label: text.hours,
      value: text.allDay,
    },
  ];

  return (
    <section id="contacts" className="relative overflow-hidden bg-primary py-16 text-primary-foreground sm:py-24 lg:py-32">
      <div className="pointer-events-none absolute -left-32 top-12 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
          >
            <span className="text-sm font-medium uppercase tracking-[0.22em] text-accent">{text.eyebrow}</span>
            <h2 className="mt-4 max-w-2xl text-3xl font-light leading-tight text-balance sm:text-4xl lg:text-5xl">
              {text.title}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/65 sm:text-lg">
              {text.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.06] p-2 backdrop-blur-sm"
          >
            <p className="px-3 pb-2 pt-1 text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/50">
              {text.selectCity}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
              {(['almaty', 'astana'] as const).map((city) => {
                const isActive = selectedCity === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => onSelectCity(city)}
                    aria-pressed={isActive}
                    className={`group relative min-h-24 overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${
                      isActive
                        ? 'border-accent bg-accent text-accent-foreground shadow-lg shadow-black/15'
                        : 'border-white/10 bg-white/[0.04] text-primary-foreground hover:border-white/25 hover:bg-white/[0.08]'
                    }`}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-0 transition duration-500 group-hover:opacity-10"
                      style={{ backgroundImage: `url(${withBasePath(cityImages[city])})` }}
                    />
                    <span className="relative flex items-center justify-between gap-3">
                      <span>
                        <span className="block text-xs uppercase tracking-[0.16em] opacity-60">Hi Hotel</span>
                        <span className="mt-1 block text-xl font-medium">{text[city]}</span>
                      </span>
                      <span className={`flex h-9 w-9 items-center justify-center rounded-full ${isActive ? 'bg-primary text-primary-foreground' : 'bg-white/10'}`}>
                        {isActive ? <Check className="h-4 w-4" /> : <Navigation className="h-4 w-4" />}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          key={selectedCity}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mt-8 overflow-hidden rounded-[32px] border border-white/10 bg-background text-foreground shadow-2xl shadow-black/25 lg:mt-12"
        >
          <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
            <div className="p-5 sm:p-8 lg:p-10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Hi Hotel</p>
                  <h3 className="mt-2 text-3xl font-light sm:text-4xl">{text[selectedCity]}</h3>
                </div>
                <Link
                  href={`/${selectedCity}`}
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                  aria-label={`${text.hotelPage}: ${text[selectedCity]}`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {contactItems.map((item) => {
                  const content = (
                    <>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/12 text-accent">
                        <item.icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.label}</span>
                        <span className="mt-1 block break-words text-sm font-medium leading-5 text-foreground">{item.value}</span>
                      </span>
                    </>
                  );

                  return item.href ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex min-h-20 items-center gap-3 rounded-2xl border border-border/70 bg-card p-3 transition hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-md"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={item.label} className="flex min-h-20 items-center gap-3 rounded-2xl border border-border/70 bg-card p-3">
                      {content}
                    </div>
                  );
                })}
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                <a
                  href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#20bd5a] hover:shadow-lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {text.whatsapp}
                </a>
                <Link
                  href={`/${selectedCity}#rooms`}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-lg"
                >
                  <BedDouble className="mr-2 h-5 w-5" />
                  {text.rooms}
                </Link>
              </div>

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Link
                  href={`/booking/${selectedCity}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-accent bg-accent/10 px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-accent-foreground"
                >
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  {text.book}
                </Link>
                <Link
                  href={`/${selectedCity}`}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  {text.hotelPage}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="flex min-h-[460px] flex-col border-t border-border bg-secondary/25 lg:min-h-[580px] lg:border-l lg:border-t-0">
              <div className="flex flex-col gap-4 border-b border-border bg-background/90 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                <div>
                  <p className="font-medium text-foreground">{text.map}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{text.mapHint}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex rounded-full bg-secondary p-1">
                    {(['yandex', 'dgis', 'google'] as const).map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => setSelectedMap(provider)}
                        aria-pressed={selectedMap === provider}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                          selectedMap === provider
                            ? 'bg-foreground text-background shadow-sm'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {mapProviders[provider].label}
                      </button>
                    ))}
                  </div>
                  <a
                    href={mapProviders[selectedMap].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-9 items-center rounded-full border border-border bg-background px-3 text-xs font-medium text-foreground transition hover:border-accent hover:text-accent"
                  >
                    {text.openMap}
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
              <div className="relative flex-1 bg-secondary">
                {selectedMap === 'dgis' ? (
                  <div className="absolute inset-0 overflow-hidden bg-primary text-primary-foreground">
                    <div
                      className="absolute inset-0 bg-cover bg-center opacity-25"
                      style={{ backgroundImage: `url(${withBasePath(cityImages[selectedCity])})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/80 to-primary/60" />
                    <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
                      <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm">
                        <Navigation className="h-7 w-7 text-accent" />
                      </span>
                      <h4 className="mt-5 text-2xl font-light sm:text-3xl">{text.externalMapTitle}</h4>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-primary-foreground/65 sm:text-base">
                        {text.externalMapDescription}
                      </p>
                      <a
                        href={mapProviders.dgis.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-accent/90 hover:shadow-lg"
                      >
                        {text.openMap}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <iframe
                    key={`${selectedCity}-${selectedMap}`}
                    src={mapProviders[selectedMap].src}
                    title={`${mapProviders[selectedMap].label} — Hi Hotel ${text[selectedCity]}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
