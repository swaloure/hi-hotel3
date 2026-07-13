'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Check, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingWidget } from '@/components/booking-widget';
import { withBasePath } from '@/lib/asset-path';

type City = 'almaty' | 'astana';
type Lang = 'ru' | 'kz' | 'en';

type BookingCopy = {
  title: string;
  subtitle: string;
  chooseHotel: string;
  bookingAt: Record<City, string>;
  almaty: string;
  almatyAddress: string;
  astana: string;
  astanaAddress: string;
};

const copy: Record<Lang, BookingCopy> = {
  ru: {
    title: 'Бронирование',
    subtitle: 'Выберите даты проживания и количество гостей.',
    chooseHotel: 'Выберите город',
    bookingAt: {
      almaty: 'Бронирование в Алматы',
      astana: 'Бронирование в Астане',
    },
    almaty: 'Алматы',
    almatyAddress: 'проспект Достык 162к6',
    astana: 'Астана',
    astanaAddress: 'проспект Мәңгілік Ел 29/1',
  },
  kz: {
    title: 'Брондау',
    subtitle: 'Тұру күндері мен қонақтар санын таңдаңыз.',
    chooseHotel: 'Қаланы таңдаңыз',
    bookingAt: {
      almaty: 'Алматыда брондау',
      astana: 'Астанада брондау',
    },
    almaty: 'Алматы',
    almatyAddress: 'Достық даңғылы 162к6',
    astana: 'Астана',
    astanaAddress: 'Мәңгілік Ел 29/1',
  },
  en: {
    title: 'Book your stay',
    subtitle: 'Choose your stay dates and number of guests.',
    chooseHotel: 'Choose a city',
    bookingAt: {
      almaty: 'Booking in Almaty',
      astana: 'Booking in Astana',
    },
    almaty: 'Almaty',
    almatyAddress: '162k6 Dostyk Avenue',
    astana: 'Astana',
    astanaAddress: '29/1 Mangilik El Avenue',
  },
};

function resolveLang(language: string): Lang {
  const normalized = language.toLowerCase();
  if (normalized.startsWith('en')) return 'en';
  if (normalized.startsWith('kz') || normalized.startsWith('kk')) return 'kz';
  return 'ru';
}

export function BookingPageContent({ city }: { city: City }) {
  const { i18n } = useTranslation();
  const text = copy[resolveLang(i18n.language)];
  const heroImage = city === 'astana' ? '/cities/astana-embankment.jpg' : '/cities/almaty-cityscape.jpg';
  const heroImagePosition = city === 'astana' ? 'center 35%' : 'center 35%';
  const isAlmaty = city === 'almaty';
  const cities = [
    { id: 'almaty' as const, name: text.almaty, address: text.almatyAddress },
    { id: 'astana' as const, name: text.astana, address: text.astanaAddress },
  ];

  return (
    <main className="min-h-screen bg-background">
      <Header city={city} />

      <section className="relative isolate overflow-hidden bg-primary pb-10 pt-24 text-primary-foreground sm:pb-12 sm:pt-28">
        <div
          className="absolute inset-0 -z-20 bg-cover"
          style={{
            backgroundImage: `url(${withBasePath(heroImage)})`,
            backgroundPosition: heroImagePosition,
          }}
        />
        <div
          className={`absolute inset-0 -z-10 bg-gradient-to-b ${
            isAlmaty ? 'from-black/65 via-black/52 to-primary/90' : 'from-black/60 via-black/46 to-primary/88'
          }`}
        />
        {isAlmaty && (
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(255,223,179,0.22),transparent_44%)]" />
        )}

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-[34px] font-light leading-tight tracking-tight sm:text-5xl">
            {text.title}
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-primary-foreground/68 sm:text-lg sm:leading-8 lg:max-w-none lg:whitespace-nowrap">
            {text.subtitle}
          </p>
        </div>
      </section>

      <section className="pb-16 pt-10 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {text.chooseHotel}
          </p>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {cities.map((hotel) => {
              const isSelected = city === hotel.id;

              return (
                <Link
                  key={hotel.id}
                  href={`/booking/${hotel.id}`}
                  aria-current={isSelected ? 'page' : undefined}
                  className={`group relative flex min-h-[104px] items-center rounded-[20px] border px-5 py-5 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:px-6 ${
                    isSelected
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-card hover:-translate-y-0.5 hover:border-accent/45 hover:bg-secondary/45'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}

                  <span
                    className={`mr-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                      isSelected ? 'bg-accent/18 text-accent' : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    <MapPin className="h-4 w-4" />
                  </span>

                  <span className="min-w-0">
                    <span className="block text-[17px] font-medium leading-none text-foreground sm:text-lg">
                      {hotel.name}
                    </span>
                    <span className="mt-2 block text-sm leading-5 text-muted-foreground">
                      {hotel.address}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-card p-3 shadow-sm sm:mt-8 sm:p-5">
            <div className="flex items-center gap-2 px-2 pb-3 pt-1 sm:px-1">
              <MapPin className="h-4 w-4 shrink-0 text-accent" />
              <p className="text-sm leading-5 text-foreground">
                <span className="font-medium">{text.bookingAt[city]}</span>
              </p>
            </div>
            <BookingWidget
              city={city}
              variant="standalone"
              className="border-0 bg-transparent p-0 shadow-none"
            />
          </div>
        </div>
      </section>

      <Footer city={city} />
    </main>
  );
}
