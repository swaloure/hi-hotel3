'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Facebook, Instagram, MapPin } from 'lucide-react';
import { SmoothLink } from '@/components/smooth-link';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';

interface FooterProps {
  city: 'almaty' | 'astana' | 'home';
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/hihotel.kz', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/hihotel.kz', label: 'Facebook' },
];

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
} as const;

const currentYear = new Date().getFullYear();

export function Footer({ city }: FooterProps) {
  const { t, i18n } = useTranslation();
  const lang = resolveLanguage(i18n.language);
  const isHome = city === 'home';
  const bookingHref = isHome ? '/booking' : `/booking/${city}`;
  const navLinks = isHome
    ? [
        { href: '/#home', label: t('nav.home') },
        { href: '/#cities', label: copy.cities[lang] },
        { href: '/#about', label: t('nav.about') },
        { href: '/#format', label: copy.format[lang] },
      ]
    : [
        { href: `/${city}`, label: t('nav.home') },
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
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">Hi Hotel</p>
              <h2 className="mt-3 font-serif text-3xl font-medium leading-tight tracking-[-0.03em] text-balance sm:text-4xl">
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
            <Link href="/" className="inline-flex" aria-label="Hi Hotel">
              <Image src={withBasePath('/logowhite.svg')} alt="Hi Hotel" width={56} height={56} unoptimized className="h-14 w-14 object-contain" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/52">{copy.description[lang]}</p>
            <div className="mt-6 flex gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/65 transition hover:border-white/35 hover:bg-white/8 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
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
          <p>© {currentYear} Hi Hotel. {t('footer.rights')}.</p>
          <p>{t('footer.privacy')} · {t('footer.offer')}</p>
        </div>
      </div>
    </footer>
  );
}
