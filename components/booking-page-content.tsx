'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingWidget } from '@/components/booking-widget';
import { Button } from '@/components/ui/button';

type City = 'almaty' | 'astana';
type Lang = 'ru' | 'kz' | 'en';

const copy: Record<Lang, {
  back: string;
  title: string;
  subtitle: string;
  chooseHotel: string;
  bookingAt: string;
  almaty: string;
  almatyAddress: string;
  astana: string;
  astanaAddress: string;
}> = {
  ru: {
    back: 'К отелю',
    title: 'Бронирование',
    subtitle: 'Выберите даты проживания и количество гостей.',
    chooseHotel: 'Другой город',
    bookingAt: 'Бронирование в',
    almaty: 'Алматы',
    almatyAddress: 'проспект Достык 162к6',
    astana: 'Астана',
    astanaAddress: 'проспект Мәңгілік Ел 29/1',
  },
  kz: {
    back: 'Қонақ үйге',
    title: 'Брондау',
    subtitle: 'Тұру күндері мен қонақтар санын таңдаңыз.',
    chooseHotel: 'Басқа қала',
    bookingAt: 'Брондау орны',
    almaty: 'Алматы',
    almatyAddress: 'Достық даңғылы 162к6',
    astana: 'Астана',
    astanaAddress: 'Мәңгілік Ел 29/1',
  },
  en: {
    back: 'Back to hotel',
    title: 'Book your stay',
    subtitle: 'Choose your stay dates and number of guests.',
    chooseHotel: 'Another city',
    bookingAt: 'Booking at',
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
  const cities = [
    { id: 'almaty' as const, name: text.almaty, address: text.almatyAddress },
    { id: 'astana' as const, name: text.astana, address: text.astanaAddress },
  ];
  const selectedHotel = cities.find((hotel) => hotel.id === city)!;

  return (
    <main className="min-h-screen bg-background">
      <Header city={city} />

      <section className="bg-primary pb-12 pt-28 text-primary-foreground sm:pb-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Button
            asChild
            variant="ghost"
            className="mb-10 w-fit rounded-full text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
          >
            <Link href={`/${city}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {text.back}
            </Link>
          </Button>
          <h1 className="text-4xl font-light tracking-tight sm:text-5xl">{text.title}</h1>
          <p className="mt-3 text-base text-primary-foreground/70 sm:text-lg">{text.subtitle}</p>
        </div>
      </section>

      <section className="pb-16 pt-8 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-sm font-medium text-muted-foreground">{text.chooseHotel}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {cities.map((hotel) => {
              const isSelected = city === hotel.id;
              return (
                <Link
                  key={hotel.id}
                  href={`/booking/${hotel.id}`}
                  aria-current={isSelected ? 'page' : undefined}
                  className={`rounded-2xl border p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    isSelected
                      ? 'border-accent bg-accent/10 shadow-sm'
                      : 'border-border bg-card hover:border-accent/50 hover:bg-secondary/50'
                  }`}
                >
                  <span className="flex items-start gap-3">
                    <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      isSelected ? 'bg-accent text-accent-foreground' : 'bg-secondary text-muted-foreground'
                    }`}>
                      <MapPin className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-lg font-medium text-foreground">{hotel.name}</span>
                      <span className="mt-1 block text-sm text-muted-foreground">{hotel.address}</span>
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 rounded-3xl border border-border bg-card p-3 shadow-sm sm:mt-8 sm:p-5">
            <div className="flex items-center gap-2 px-2 pb-4 pt-1 sm:px-1">
              <MapPin className="h-4 w-4 text-accent" />
              <p className="text-sm text-muted-foreground">
                {text.bookingAt} <span className="font-medium text-foreground">{selectedHotel.name}</span>
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
