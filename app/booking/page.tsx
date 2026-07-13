'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, BedDouble, MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { SectionHeading } from '@/components/section-heading';
import { hotels } from '@/lib/data/hotels';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';

const copy = {
  eyebrow: { ru: 'Бронирование', kz: 'Брондау', en: 'Booking' },
  title: { ru: 'Выберите город для поездки', kz: 'Сапар үшін қаланы таңдаңыз', en: 'Choose a city for your stay' },
  subtitle: {
    ru: 'Два отеля с единым стандартом комфорта. Выберите подходящую локацию и перейдите к датам проживания.',
    kz: 'Бірыңғай жайлылық стандарты бар екі қонақүй. Қолайлы орынды таңдап, тұру күндеріне өтіңіз.',
    en: 'Two hotels with one standard of comfort. Choose the right location and continue to your stay dates.',
  },
  from: { ru: 'от', kz: 'бастап', en: 'from' },
  night: { ru: 'за ночь', kz: 'бір түнге', en: 'per night' },
  choose: { ru: 'Выбрать отель', kz: 'Қонақүйді таңдау', en: 'Choose hotel' },
  rooms: { ru: 'категории номеров', kz: 'нөмір санаты', en: 'room categories' },
} as const;

const images = {
  almaty: '/cities/almaty-cityscape.jpg',
  astana: '/cities/astana-embankment.jpg',
} as const;

export default function BookingPage() {
  const { i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);

  return (
    <main className="min-h-screen bg-graphite">
      <Header city="home" />
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-32 text-white sm:px-6 sm:pb-24 sm:pt-36 lg:px-8 lg:pb-28">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_5%,rgba(201,168,108,0.18),transparent_32%)]" />
        <div className="absolute inset-x-0 top-0 -z-20 h-px bg-white/10" />
        <div className="mx-auto max-w-7xl">
          <SectionHeading eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} description={copy.subtitle[lang]} inverse />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-7">
            {hotels.map((hotel) => {
              const minimumPrice = Math.min(...hotel.rooms.map((room) => room.price)).toLocaleString('ru-RU');
              return (
                <Link
                  key={hotel.city}
                  href={`/booking/${hotel.city}`}
                  className="group relative isolate min-h-[430px] overflow-hidden rounded-[28px] border border-white/12 bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:min-h-[500px]"
                >
                  <Image
                    src={withBasePath(images[hotel.city])}
                    alt={hotel.name}
                    fill
                    priority={hotel.city === 'almaty'}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="-z-20 object-cover transition duration-700 group-hover:scale-[1.035]"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/88 via-black/28 to-black/12" />
                  <div className="flex h-full flex-col justify-between p-5 sm:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/20 px-3.5 py-2 text-xs font-medium text-white/82 backdrop-blur-md">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {hotel.address[lang]}
                      </span>
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:bg-accent">
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/52">Hi Hotel</p>
                      <h2 className="mt-2 font-serif text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
                        {hotel.address[lang].includes('Dost') || hotel.city === 'almaty' ? (lang === 'en' ? 'Almaty' : 'Алматы') : (lang === 'en' ? 'Astana' : 'Астана')}
                      </h2>
                      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/65">
                        <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-accent" />{hotel.rooms.length} {copy.rooms[lang]}</span>
                        <span>{copy.from[lang]} <strong className="text-white">{minimumPrice} ₸</strong> {copy.night[lang]}</span>
                      </div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                        {copy.choose[lang]}
                        <ArrowUpRight className="h-4 w-4 text-accent" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <Footer city="home" />
    </main>
  );
}
