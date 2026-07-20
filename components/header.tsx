'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { ChevronDown, Globe2, MapPin, Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmoothLink } from '@/components/smooth-link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getHotelByCity } from '@/lib/data/hotels';
import { withBasePath } from '@/lib/asset-path';
import { resolveLanguage } from '@/lib/i18n/language';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'kz', label: 'KZ', name: 'Қазақша' },
  { code: 'en', label: 'EN', name: 'English' },
] as const;

interface HeaderProps {
  city: 'almaty' | 'astana' | 'home';
}

const labels = {
  city: { ru: 'Город', kz: 'Қала', en: 'City' },
  cities: { ru: 'Города', kz: 'Қалалар', en: 'Cities' },
  format: { ru: 'Формат', kz: 'Формат', en: 'Format' },
  openMenu: { ru: 'Открыть меню', kz: 'Мәзірді ашу', en: 'Open menu' },
  closeMenu: { ru: 'Закрыть меню', kz: 'Мәзірді жабу', en: 'Close menu' },
  chooseCity: { ru: 'Выберите город', kz: 'Қаланы таңдаңыз', en: 'Choose a city' },
  language: { ru: 'Язык', kz: 'Тіл', en: 'Language' },
} as const;

export function Header({ city }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const isHome = city === 'home';
  const hotel = isHome ? undefined : getHotelByCity(city);
  const lang = resolveLanguage(i18n.language);
  const bookingHref = isHome ? '/booking' : `/booking/${city}`;

  const navItems = isHome
    ? [
        { href: '/#cities', label: labels.cities[lang] },
        { href: '/#about', label: t('nav.about') },
        { href: '/#format', label: labels.format[lang] },
        { href: '/#contacts', label: t('nav.contacts') },
      ]
    : [
        { href: 'https://maza.kz/', label: t('nav.home') },
        { href: `/${city}#rooms`, label: t('nav.rooms') },
        { href: `/${city}#about`, label: t('nav.about') },
        { href: `/${city}#contacts`, label: t('nav.contacts') },
      ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const triggerElement = mobileMenuTriggerRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = 'hidden';

    const focusableSelector =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusTimer = window.requestAnimationFrame(() => {
      mobileMenuRef.current?.querySelector<HTMLElement>(focusableSelector)?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMobileMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab' || !mobileMenuRef.current) return;

      const focusableElements = Array.from(
        mobileMenuRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements.at(-1);

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.cancelAnimationFrame(focusTimer);
      window.removeEventListener('keydown', handleKeyDown);
      (previouslyFocused ?? triggerElement)?.focus();
    };
  }, [isMobileMenuOpen]);

  const lightHeader = !isScrolled;
  const logoSrc = withBasePath(lightHeader ? '/logowhite.svg' : '/logofinal.svg');

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 transition-all duration-300 sm:px-5">
        <div
          className={cn(
            'mx-auto max-w-[1380px] rounded-2xl border transition-all duration-300',
            lightHeader
              ? 'border-white/12 bg-black/12 text-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-md'
              : 'border-border/70 bg-background/92 text-foreground shadow-[0_10px_35px_rgba(28,30,34,0.08)] backdrop-blur-xl',
          )}
        >
          <div className="flex h-16 items-center justify-between px-3 sm:h-[68px] sm:px-5 lg:px-6">
            <Link href="/" className="flex shrink-0 items-center" aria-label="MAZA">
              <Image
                src={logoSrc}
                alt="MAZA"
                width={52}
                height={52}
                unoptimized
                priority
                className="h-11 w-11 object-contain sm:h-12 sm:w-12"
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
              {navItems.map((item) => {
                const isPageActive = !item.href.includes('#') && pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'rounded-full px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.13em] transition-colors',
                      lightHeader
                        ? 'text-white/72 hover:bg-white/10 hover:text-white'
                        : 'text-foreground/62 hover:bg-secondary hover:text-foreground',
                      isPageActive && (lightHeader ? 'bg-white/10 text-white' : 'bg-secondary text-foreground'),
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden items-center gap-1.5 lg:flex">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-10 gap-2 rounded-full px-3',
                      lightHeader && 'text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10',
                    )}
                  >
                    <MapPin className="h-4 w-4" />
                    {isHome ? labels.city[lang] : t(`cities.${city}`)}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-44 rounded-xl p-1.5">
                  {(['almaty', 'astana'] as const)
                    .filter((item) => isHome || item !== city)
                    .map((item) => (
                      <DropdownMenuItem key={item} asChild className="rounded-lg">
                        <Link href={`/${item}`} className="cursor-pointer gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          {t(`cities.${item}`)}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      'h-10 gap-2 rounded-full px-3',
                      lightHeader && 'text-white hover:bg-white/10 hover:text-white data-[state=open]:bg-white/10',
                    )}
                  >
                    <Globe2 className="h-4 w-4" />
                    {languages.find((item) => item.code === lang)?.label}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-44 rounded-xl p-1.5">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => i18n.changeLanguage(language.code)}
                      className="cursor-pointer rounded-lg"
                    >
                      <span className="w-7 font-semibold">{language.label}</span>
                      <span className="text-muted-foreground">{language.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {hotel && (
                <a
                  href={`tel:${hotel.phone.replace(/[^+\d]/g, '')}`}
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors',
                    lightHeader ? 'text-white/80 hover:bg-white/10 hover:text-white' : 'hover:bg-secondary',
                  )}
                  aria-label={`${t('contacts.phone')}: ${hotel.phone}`}
                >
                  <Phone className="h-4 w-4" />
                </a>
              )}

              <Button asChild className="h-10 rounded-full bg-accent px-5 text-accent-foreground shadow-none hover:bg-gold-light">
                <SmoothLink href={bookingHref}>{t('nav.book')}</SmoothLink>
              </Button>
            </div>

            <button
              ref={mobileMenuTriggerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className={cn(
                'inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden',
                lightHeader ? 'text-white hover:bg-white/10' : 'text-foreground hover:bg-secondary',
              )}
              aria-label={labels.openMenu[lang]}
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] cursor-default bg-black/55 backdrop-blur-sm lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label={labels.closeMenu[lang]}
              tabIndex={-1}
            />
            <motion.aside
              ref={mobileMenuRef}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-[70] flex w-[min(22rem,92vw)] flex-col bg-background shadow-2xl lg:hidden"
              aria-label="Mobile navigation"
              aria-modal="true"
              role="dialog"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} aria-label="MAZA">
                  <Image
                    src={withBasePath('/logofinal.svg')}
                    alt="MAZA"
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 object-contain"
                  />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-foreground"
                  aria-label={labels.closeMenu[lang]}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-5 py-6">
                <ul className="space-y-1">
                  {navItems.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium text-foreground transition hover:bg-secondary"
                      >
                        <span>{item.label}</span>
                        <span className="text-xs tabular-nums text-muted-foreground">0{index + 1}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {labels.chooseCity[lang]}
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {(['almaty', 'astana'] as const).map((item) => (
                      <Link
                        key={item}
                        href={`/${item}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'rounded-2xl border p-4 text-sm font-medium transition',
                          city === item ? 'border-accent bg-accent/10' : 'border-border bg-card hover:bg-secondary',
                        )}
                      >
                        <MapPin className="mb-3 h-4 w-4 text-accent" />
                        {t(`cities.${item}`)}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-7 border-t border-border pt-6">
                  <p className="px-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {labels.language[lang]}
                  </p>
                  <div className="mt-3 flex gap-2 px-3">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        onClick={() => i18n.changeLanguage(language.code)}
                        className={cn(
                          'h-10 min-w-12 rounded-full px-3 text-sm font-semibold transition',
                          lang === language.code ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
                        )}
                      >
                        {language.label}
                      </button>
                    ))}
                  </div>
                </div>
              </nav>

              <div className="border-t border-border p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
                {hotel && (
                  <a
                    href={`tel:${hotel.phone.replace(/[^+\d]/g, '')}`}
                    className="mb-3 flex items-center justify-center gap-2 text-sm text-muted-foreground"
                  >
                    <Phone className="h-4 w-4" />
                    {hotel.phone}
                  </a>
                )}
                <Button asChild className="h-12 w-full rounded-full bg-accent text-accent-foreground hover:bg-gold-light">
                  <SmoothLink href={bookingHref} onClick={() => setIsMobileMenuOpen(false)}>
                    {t('nav.book')}
                  </SmoothLink>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
