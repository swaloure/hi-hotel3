'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { MapPin } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

const copy = {
  ru: { title: 'Выберите город', subtitle: 'Для бронирования выберите город.', almaty: 'Алматы', astana: 'Астана' },
  kz: { title: 'Қаланы таңдаңыз', subtitle: 'Брондау үшін қаланы таңдаңыз.', almaty: 'Алматы', astana: 'Астана' },
  en: { title: 'Choose a city', subtitle: 'Choose a city to book your stay.', almaty: 'Almaty', astana: 'Astana' },
};

export default function BookingPage() {
  const { i18n } = useTranslation();
  const language = i18n.language.toLowerCase();
  const lang = language.startsWith('en') ? 'en' : language.startsWith('kz') || language.startsWith('kk') ? 'kz' : 'ru';
  const text = copy[lang];

  return (
    <main className="min-h-screen bg-background">
      <Header city="home" />
      <section className="bg-primary pb-16 pt-32 text-primary-foreground sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-light tracking-tight sm:text-5xl">{text.title}</h1>
          <p className="mt-3 text-primary-foreground/70">{text.subtitle}</p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {(['almaty', 'astana'] as const).map((city) => (
              <Link
                key={city}
                href={`/booking/${city}`}
                className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 p-5 text-left transition hover:border-accent/70 hover:bg-white/15"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-lg font-medium">{text[city]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer city="home" />
    </main>
  );
}
