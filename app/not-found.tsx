'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Home, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';

const copy = {
  ru: {
    eyebrow: 'Страница не найдена',
    title: 'Похоже, вы свернули не туда',
    description: 'Этой страницы больше нет или адрес был введён неправильно. Вернитесь на главную или выберите нужный город.',
    home: 'На главную',
    chooseHotel: 'Выберите отель',
    almaty: 'MAZA Алматы',
    astana: 'MAZA Астана',
  },
  kz: {
    eyebrow: 'Бет табылмады',
    title: 'Сіз басқа бағытқа бұрылып кеткен сияқтысыз',
    description: 'Бұл бет жоқ немесе мекенжай қате енгізілген. Басты бетке оралыңыз немесе қажетті қаланы таңдаңыз.',
    home: 'Басты бетке',
    chooseHotel: 'Қонақүйді таңдаңыз',
    almaty: 'MAZA Алматы',
    astana: 'MAZA Астана',
  },
  en: {
    eyebrow: 'Page not found',
    title: 'It looks like you took a wrong turn',
    description: 'This page no longer exists or the address is incorrect. Return home or choose the city you need.',
    home: 'Back home',
    chooseHotel: 'Choose a hotel',
    almaty: 'MAZA Almaty',
    astana: 'MAZA Astana',
  },
} as const;

export default function NotFound() {
  const { i18n } = useTranslation();
  const text = copy[resolveLanguage(i18n.language)];

  return (
    <main className="relative isolate flex h-[100svh] overflow-hidden bg-primary text-white">
      <Image
        src={withBasePath('/cities/astana-embankment.jpg')}
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="-z-30 object-cover"
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(105deg,rgba(24,25,29,0.96)_0%,rgba(24,25,29,0.86)_48%,rgba(24,25,29,0.58)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_28%,rgba(201,168,108,0.24),transparent_34%)]" />

      <div className="mx-auto flex h-full w-full max-w-7xl flex-col px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <Link href="/" className="inline-flex w-fit items-center gap-3" aria-label="MAZA">
          <Image
            src={withBasePath('/logowhite.svg')}
            alt="MAZA"
            width={64}
            height={64}
            unoptimized
            className="h-11 w-11 object-contain sm:h-12 sm:w-12"
          />
        </Link>

        <div className="flex min-h-0 flex-1 items-center py-3 sm:py-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="text-[clamp(4rem,11vw,7rem)] font-light leading-none tracking-[-0.08em] text-accent">404</span>
              <span className="hidden h-16 w-px bg-white/18 sm:block" />
              <p className="max-w-40 text-xs font-semibold uppercase tracking-[0.22em] text-white/58 sm:text-sm">
                {text.eyebrow}
              </p>
            </div>

            <h1 className="mt-5 max-w-2xl font-serif text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.04] tracking-[-0.035em] text-balance">
              {text.title}
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-white/68 sm:text-base sm:leading-7">
              {text.description}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-gold-light"
              >
                <Home className="h-4 w-4" aria-hidden="true" />
                {text.home}
              </Link>
              <a
                href="https://wa.me/77009845374"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/24 bg-white/8 px-7 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:bg-white/14"
              >
                WhatsApp
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-7 border-t border-white/14 pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">{text.chooseHotel}</p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {([
                  { href: '/almaty', label: text.almaty },
                  { href: '/astana', label: text.astana },
                ] as const).map((city) => (
                  <Link
                    key={city.href}
                    href={city.href}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/16 bg-black/16 px-5 py-2.5 text-sm text-white/82 backdrop-blur-sm transition hover:border-accent/60 hover:text-white"
                  >
                    <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                    {city.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-white/35">© {new Date().getFullYear()} MAZA</p>
      </div>
    </main>
  );
}
