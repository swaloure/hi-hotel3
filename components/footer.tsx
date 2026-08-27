'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Instagram, MapPin } from 'lucide-react';
import { SmoothLink } from '@/components/smooth-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { withBasePath } from '@/lib/asset-path';
import { getHotelByCity } from '@/lib/data/hotels';
import { resolveLanguage } from '@/lib/i18n/language';
import { cn } from '@/lib/utils';

interface FooterProps {
  city: 'almaty' | 'astana' | 'home';
}

const copy = {
  cities: { ru: 'Города', kz: 'Қалалар', en: 'Cities' },
  navigation: { ru: 'Навигация', kz: 'Навигация', en: 'Navigation' },
  format: { ru: 'Формат', kz: 'Формат', en: 'Format' },
  bookingTitle: {
    ru: 'Ваш комфортный отдых начинается здесь',
    kz: 'Сіздің жайлы демалысыңыз осы жерден басталады',
    en: 'Your comfortable stay starts here',
  },
  bookingText: {
    ru: 'Выберите город, даты и подходящий номер — бронирование займёт несколько минут.',
    kz: 'Қаланы, күндерді және қолайлы нөмірді таңдаңыз — брондау бірнеше минутты алады.',
    en: 'Choose a city, dates, and the right room — booking takes only a few minutes.',
  },
  description: {
    ru: 'Городские отели в Алматы и Астане: спокойные номера, удобные локации и заботливый сервис.',
    kz: 'Алматы мен Астанадағы қалалық қонақүйлер: тыныш нөмірлер, ыңғайлы орындар және қамқор сервис.',
    en: 'City hotels in Almaty and Astana with calm rooms, convenient locations, and thoughtful service.',
  },
  chooseInstagram: {
    ru: 'Выберите город',
    kz: 'Қаланы таңдаңыз',
    en: 'Choose a city',
  },
} as const;

const currentYear = new Date().getFullYear();

export function Footer({ city }: FooterProps) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);
  const isHome = city === 'home';
  const bookingHref = isHome ? '/booking' : `/booking/${city}`;
  const instagramHotels = (['almaty', 'astana'] as const).flatMap((hotelCity) => {
    const hotel = getHotelByCity(hotelCity);
    return hotel ? [{ city: hotelCity, href: hotel.instagram }] : [];
  });
  const cityInstagram = isHome ? undefined : instagramHotels.find((item) => item.city === city);
  const legalCities = isHome ? (['almaty', 'astana'] as const) : [city];
  const legalLinks = [
    ...legalCities.map((legalCity) => ({
      href: `/${legalCity}/privacy`,
      label: `${t('footer.privacy')} · ${t(`cities.${legalCity}`)}`,
    })),
    ...legalCities.map((legalCity) => ({
      href: `/${legalCity}/offer`,
      label: `${t('footer.offer')} · ${t(`cities.${legalCity}`)}`,
    })),
  ];
  const navLinks = isHome
    ? [
        { href: '/#home', label: t('nav.home') },
        { href: '/#cities', label: copy.cities[lang] },
        { href: '/#about', label: t('nav.about') },
        { href: '/#format', label: copy.format[lang] },
        { href: '/#contacts', label: t('nav.contacts') },
      ]
    : [
        { href: 'https://maza.kz/', label: t('nav.home') },
        { href: `/${city}#rooms`, label: t('nav.rooms') },
        { href: `/${city}#about`, label: t('nav.about') },
        { href: `/${city}#contacts`, label: t('nav.contacts') },
      ];

  return (
    <footer className="bg-graphite text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-b border-white/10 py-8 sm:py-10">
          <div className="flex flex-col gap-6 rounded-[26px] border border-white/10 bg-white/[0.045] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">MAZA</p>
              <h2 className={cn(
                'mt-3 text-3xl leading-tight text-balance sm:text-4xl',
                city === 'home'
                  ? 'font-home font-light tracking-[-0.025em]'
                  : 'font-serif font-light tracking-[-0.025em]',
              )}>
                {copy.bookingTitle[lang]}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">{copy.bookingText[lang]}</p>
            </div>
            <SmoothLink
              href={bookingHref}
              className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:-translate-y-0.5 hover:bg-gold-light"
            >
              {t('nav.book')}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </SmoothLink>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.75fr_0.75fr] lg:gap-16 lg:py-16">
          <div>
            <Link href="/" className="inline-flex" aria-label="MAZA">
              <Image src={withBasePath('/logowhite.svg')} alt="MAZA" width={56} height={56} unoptimized className="h-14 w-14 object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">{copy.description[lang]}</p>
            <div className="mt-6 flex gap-2">
              {isHome ? (
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/65 transition hover:border-white/35 hover:bg-white/8 hover:text-white data-[state=open]:border-white/35 data-[state=open]:bg-white/8 data-[state=open]:text-white"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    side="top"
                    align="start"
                    sideOffset={10}
                    className="min-w-56 rounded-2xl border-border/70 p-2 shadow-2xl"
                  >
                    <p className="px-3 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {copy.chooseInstagram[lang]}
                    </p>
                    {instagramHotels.map((item) => (
                      <DropdownMenuItem key={item.city} asChild className="rounded-xl p-0">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-12 items-center gap-3 px-3 py-2.5"
                        >
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/12 text-accent">
                            <Instagram className="h-4 w-4" />
                          </span>
                          <span className="flex-1 font-medium">MAZA {t(`cities.${item.city}`)}</span>
                          <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </a>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : cityInstagram ? (
                <a
                  href={cityInstagram.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/65 transition hover:border-white/35 hover:bg-white/8 hover:text-white"
                  aria-label={`Instagram ${t(`cities.${cityInstagram.city}`)}`}
                >
                  <Instagram className="h-4 w-4" />
                </a>
              ) : null}
            </div>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">{copy.navigation[lang]}</h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/62 transition hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/42">{copy.cities[lang]}</h3>
            <ul className="mt-5 space-y-3">
              {(['almaty', 'astana'] as const).map((item) => (
                <li key={item}>
                  <Link href={`/${item}`} className="group flex items-center gap-2 text-sm text-white/62 transition hover:text-white">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {t(`cities.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} MAZA. {t('footer.rights')}.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
