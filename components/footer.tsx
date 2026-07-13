'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import Image from 'next/image';
import {
  Instagram, 
  Facebook,
  FileText,
} from 'lucide-react';
import { withBasePath } from '@/lib/asset-path';

interface FooterProps {
  city: 'almaty' | 'astana' | 'home';
}

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/hihotel.kz', label: 'Instagram' },
  { icon: Facebook, href: 'https://facebook.com/hihotel.kz', label: 'Facebook' },
];

const currentYear = new Date().getFullYear();

export function Footer({ city }: FooterProps) {
  const { t, i18n } = useTranslation();
  const isHome = city === 'home';
  const normalized = i18n.language.toLowerCase();
  const lang: 'ru' | 'kz' | 'en' = normalized.startsWith('en')
    ? 'en'
    : normalized.startsWith('kz') || normalized.startsWith('kk')
      ? 'kz'
      : 'ru';

  const homeLabels = {
    cities: {
      ru: 'Города',
      kz: 'Қалалар',
      en: 'Cities',
    },
    format: {
      ru: 'Формат',
      kz: 'Формат',
      en: 'Format',
    },
  };

  const navLinks = isHome
    ? [
        { href: '/#home', label: t('nav.home') },
        { href: '/#cities', label: homeLabels.cities[lang] },
        { href: '/#about', label: t('nav.about') },
        { href: '/#format', label: homeLabels.format[lang] },
      ]
    : [
        { href: `/${city}`, label: t('nav.home') },
        { href: `/${city}#rooms`, label: t('nav.rooms') },
        { href: `/${city}#about`, label: t('nav.about') },
        { href: `/${city}#contacts`, label: t('nav.contacts') },
      ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block" aria-label="Hi Hotel">
              <Image
                src={withBasePath('/logofinal.svg')}
                alt="Hi Hotel"
                width={52}
                height={60}
                className="h-14 w-auto"
              />
            </Link>
            <p className="mt-4 text-primary-foreground/70 text-sm leading-relaxed">
              {t('about.description').substring(0, 120)}...
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              {t('nav.home')}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              {t('cities.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/almaty"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  Hi Hotel {t('cities.almaty')}
                </Link>
              </li>
              <li>
                <Link
                  href="/astana"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
                >
                  Hi Hotel {t('cities.astana')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-medium uppercase tracking-wider mb-6">
              {t('footer.rights')}
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="flex items-center gap-2 text-primary-foreground/70 transition-colors text-sm hover:text-primary-foreground"
                >
                  <FileText className="w-4 h-4" />
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/offer"
                  className="flex items-center gap-2 text-primary-foreground/70 transition-colors text-sm hover:text-primary-foreground"
                >
                  <FileText className="w-4 h-4" />
                  {t('footer.offer')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              © {currentYear} Hi Hotel. {t('footer.rights')}.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/almaty"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                {t('cities.almaty')}
              </Link>
              <Link
                href="/astana"
                className="text-xs text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                {t('cities.astana')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
