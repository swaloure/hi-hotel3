'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, BadgeCheck, Clock3, CreditCard, MapPin, Palette, ShieldCheck } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BookingWidget } from '@/components/booking-widget';
import { Button } from '@/components/ui/button';
import { withBasePath } from '@/lib/asset-path';

const copy = {
  ru: {
    eyebrow: 'Официальное бронирование',
    title: 'Выберите номер в Hi Hotel',
    description:
      'Проверьте доступные даты, сравните номера Алматы и Астаны и оформите бронь через защищенный модуль Bnovo.',
    back: 'К отелям',
    panelTitle: 'Бронирование через Bnovo',
    panelText: 'Модуль может загружаться несколько секунд. Если видите номера двух городов, выберите нужную локацию внутри формы.',
    official: 'Официальные цены',
    secure: 'Защищенная форма',
    instant: 'Быстрая проверка дат',
    payment: 'Оплата по условиям тарифа',
    almaty: 'Алматы: проспект Достык 162к6',
    astana: 'Астана: Мангилик Ел 29/1',
    styleNote: 'Цвета внутри формы настраиваются в Bnovo-конфигураторе. Страница уже оформлена под фирменный графит и золото Hi Hotel.',
  },
  kz: {
    eyebrow: 'Ресми брондау',
    title: 'Hi Hotel нөмірін таңдаңыз',
    description:
      'Бос күндерді тексеріп, Алматы мен Астана нөмірлерін салыстырып, Bnovo қорғалған модулі арқылы брондаңыз.',
    back: 'Қонақ үйлерге',
    panelTitle: 'Bnovo арқылы брондау',
    panelText: 'Модуль бірнеше секунд жүктелуі мүмкін. Екі қала нөмірлері көрінсе, форма ішінде қажетті локацияны таңдаңыз.',
    official: 'Ресми бағалар',
    secure: 'Қорғалған форма',
    instant: 'Күндерді жылдам тексеру',
    payment: 'Төлем тариф шарты бойынша',
    almaty: 'Алматы: Достық даңғылы 162к6',
    astana: 'Астана: Мәңгілік Ел 29/1',
    styleNote: 'Форма ішіндегі түстер Bnovo конфигураторында реттеледі. Бет Hi Hotel графит және алтын түстеріне бейімделді.',
  },
  en: {
    eyebrow: 'Official booking',
    title: 'Choose your Hi Hotel room',
    description:
      'Check available dates, compare Almaty and Astana rooms, and book through the secure Bnovo module.',
    back: 'Back to hotels',
    panelTitle: 'Booking through Bnovo',
    panelText: 'The module may take a few seconds to load. If rooms from both cities appear, choose the needed location inside the form.',
    official: 'Official rates',
    secure: 'Secure form',
    instant: 'Fast date check',
    payment: 'Payment by rate terms',
    almaty: 'Almaty: 162k6 Dostyk Avenue',
    astana: 'Astana: 29/1 Mangilik El',
    styleNote: 'Colors inside the form are configured in Bnovo. This page is styled with Hi Hotel graphite and gold.',
  },
};

const benefits = [
  { key: 'official', icon: BadgeCheck },
  { key: 'secure', icon: ShieldCheck },
  { key: 'instant', icon: Clock3 },
  { key: 'payment', icon: CreditCard },
] as const;

export default function BookingPage() {
  const { i18n } = useTranslation();
  const normalized = i18n.language.toLowerCase();
  const lang: keyof typeof copy = normalized.startsWith('en')
    ? 'en'
    : normalized.startsWith('kz') || normalized.startsWith('kk')
      ? 'kz'
      : 'ru';
  const text = copy[lang];

  return (
    <main className="min-h-screen bg-background">
      <Header city="home" />

      <section className="relative isolate overflow-hidden bg-primary pt-28 text-primary-foreground">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url(${withBasePath('/cities/almaty-cityscape.jpg')})` }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-primary/88 to-background" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-background to-transparent" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pb-16 lg:pt-20">
          <div className="flex flex-col justify-center">
            <Button
              asChild
              variant="ghost"
              className="mb-8 w-fit rounded-full border border-white/15 bg-white/10 text-primary-foreground/85 backdrop-blur hover:bg-white/15 hover:text-primary-foreground"
            >
              <Link href="/#cities">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {text.back}
              </Link>
            </Button>

            <p className="text-sm uppercase tracking-[0.22em] text-accent">
              {text.eyebrow}
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-light tracking-tight text-balance sm:text-6xl lg:text-7xl">
              {text.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-primary-foreground/78 sm:text-lg">
              {text.description}
            </p>

            <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
              {[text.almaty, text.astana].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/10 px-4 py-3 text-sm text-primary-foreground/85 backdrop-blur"
                >
                  <MapPin className="h-4 w-4 shrink-0 text-accent" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] border border-white/15 bg-white/12 p-3 shadow-2xl shadow-black/25 backdrop-blur-xl sm:p-4">
            <div className="rounded-[26px] border border-white/70 bg-background/95 p-4 text-foreground shadow-xl sm:p-6">
              <div className="mb-5 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.22em] text-accent">
                    Hi Hotel
                  </p>
                  <h2 className="mt-2 text-2xl font-light text-foreground sm:text-3xl">
                    {text.panelTitle}
                  </h2>
                </div>
                <div className="rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground">
                  Bnovo
                </div>
              </div>

              <div className="mb-5 flex items-start gap-3 rounded-2xl border border-accent/20 bg-accent/10 px-4 py-3">
                <Palette className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-xs leading-6 text-muted-foreground">
                  {text.styleNote}
                </p>
              </div>

              <BookingWidget
                city="almaty"
                variant="standalone"
                className="border-0 bg-transparent p-0 shadow-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-8 sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {benefits.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="rounded-2xl border border-border bg-card px-5 py-5 shadow-sm"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/12 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {text[key]}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-accent/25 bg-gradient-to-br from-secondary via-card to-card p-6 shadow-sm">
              <p className="text-sm leading-7 text-muted-foreground">
                {text.panelText}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer city="home" />
    </main>
  );
}
