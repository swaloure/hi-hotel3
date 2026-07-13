'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Check, Clock3, MapPin, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingWidget } from '@/components/booking-widget';
import { getHotelByCity } from '@/lib/data/hotels';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';
import { cn } from '@/lib/utils';

type City = 'almaty' | 'astana';

const copy = {
  eyebrow: { ru: 'Прямое бронирование', kz: 'Тікелей брондау', en: 'Direct booking' },
  title: { ru: 'Забронируйте проживание', kz: 'Тұруды брондаңыз', en: 'Book your stay' },
  subtitle: {
    ru: 'Выберите даты, количество гостей и подходящий номер. Все доступные варианты появятся в форме ниже.',
    kz: 'Күндерді, қонақтар санын және қолайлы нөмірді таңдаңыз. Барлық қолжетімді нұсқалар төмендегі формада көрсетіледі.',
    en: 'Choose your dates, number of guests, and a suitable room. All available options will appear below.',
  },
  chooseCity: { ru: 'Город проживания', kz: 'Тұратын қала', en: 'Stay location' },
  bookingAt: { ru: 'Бронирование в', kz: 'Брондау қаласы', en: 'Booking in' },
  direct: { ru: 'Напрямую с отелем', kz: 'Қонақүймен тікелей', en: 'Direct with the hotel' },
  support: { ru: 'Поддержка 24/7', kz: '24/7 қолдау', en: '24/7 support' },
  secure: { ru: 'Безопасная форма', kz: 'Қауіпсіз форма', en: 'Secure form' },
  back: { ru: 'Все города', kz: 'Барлық қалалар', en: 'All cities' },
  steps: {
    ru: ['Выберите даты', 'Укажите гостей', 'Выберите номер'],
    kz: ['Күндерді таңдаңыз', 'Қонақтарды көрсетіңіз', 'Нөмірді таңдаңыз'],
    en: ['Choose dates', 'Add guests', 'Select a room'],
  },
} as const;

const heroImages = {
  almaty: '/cities/almaty-cityscape.jpg',
  astana: '/cities/astana-embankment.jpg',
} as const;

export function BookingPageContent({ city }: { city: City }) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);
  const hotel = getHotelByCity(city);

  if (!hotel) return null;

  return (
    <main className="min-h-screen bg-background">
      <Header city={city} />

      <section className="relative isolate overflow-hidden pb-14 pt-32 text-white sm:pb-16 sm:pt-36 lg:pb-20">
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${withBasePath(heroImages[city])})` }}
        />
        <div className="absolute inset-0 -z-20 bg-gradient-to-r from-black/82 via-black/55 to-black/26" />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-black/25 to-black/58" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/booking" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/62 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            {copy.back[lang]}
          </Link>
          <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{copy.eyebrow[lang]}</p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl font-medium leading-[1.02] tracking-[-0.04em] text-balance sm:text-5xl lg:text-6xl">
            {copy.title[lang]}
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/68 sm:text-base">{copy.subtitle[lang]}</p>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{copy.chooseCity[lang]}</p>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-[-0.03em] text-foreground">
                {copy.bookingAt[lang]} {t(`cities.${city}`)}
              </h2>
            </div>
            <div className="inline-flex w-full rounded-full bg-secondary p-1 sm:w-auto">
              {(['almaty', 'astana'] as const).map((item) => (
                <Link
                  key={item}
                  href={`/booking/${item}`}
                  aria-current={city === item ? 'page' : undefined}
                  className={cn(
                    'flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition sm:flex-none',
                    city === item ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {city === item && <Check className="h-3.5 w-3.5 text-accent" />}
                  {t(`cities.${item}`)}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-8 grid items-start gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:gap-8">
            <aside className="rounded-[26px] border border-border bg-secondary/45 p-6 sm:p-7 lg:sticky lg:top-28">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-background text-accent ring-1 ring-border">
                  <MapPin className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-foreground">Hi Hotel {t(`cities.${city}`)}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{hotel.address[lang]}</p>
                </div>
              </div>

              <ol className="mt-7 space-y-3 border-t border-border pt-6">
                {copy.steps[lang].map((step, index) => (
                  <li key={step} className="flex items-center gap-3 text-sm text-foreground/75">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-background text-[11px] font-semibold text-accent ring-1 ring-border">0{index + 1}</span>
                    {step}
                  </li>
                ))}
              </ol>

              <div className="mt-7 grid gap-2.5 border-t border-border pt-6 text-xs text-muted-foreground">
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-accent" />{copy.secure[lang]}</div>
                <div className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" />{copy.direct[lang]}</div>
                <div className="flex items-center gap-2"><Clock3 className="h-4 w-4 text-accent" />{copy.support[lang]}</div>
              </div>
            </aside>

            <div className="rounded-[28px] border border-border bg-card p-3 shadow-[0_20px_60px_rgba(28,30,34,0.07)] sm:p-5">
              <BookingWidget city={city} variant="standalone" className="border-0 bg-transparent p-0 shadow-none" />
            </div>
          </div>
        </div>
      </section>

      <Footer city={city} />
    </main>
  );
}
