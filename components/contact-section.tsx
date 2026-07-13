'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/section-heading';
import { getHotelByCity } from '@/lib/data/hotels';
import { resolveLanguage } from '@/lib/i18n/language';
import { cn } from '@/lib/utils';

interface ContactSectionProps {
  city: 'almaty' | 'astana';
}

type MapProvider = 'yandex' | 'dgis' | 'google';

const copy = {
  map: { ru: 'Карта и маршрут', kz: 'Карта және бағыт', en: 'Map and directions' },
  openMap: { ru: 'Открыть карту', kz: 'Картаны ашу', en: 'Open map' },
  routeHint: {
    ru: 'Выберите привычный сервис и постройте маршрут до отеля.',
    kz: 'Ыңғайлы сервисті таңдап, қонақүйге бағыт құрыңыз.',
    en: 'Choose your preferred map service and build a route to the hotel.',
  },
  quickContact: { ru: 'Быстрая связь', kz: 'Жылдам байланыс', en: 'Quick contact' },
} as const;

export function ContactSection({ city }: ContactSectionProps) {
  const { t, i18n } = useTranslation();
  const hotel = getHotelByCity(city);
  const [selectedMap, setSelectedMap] = useState<MapProvider>('yandex');
  const lang = resolveLanguage(i18n.language);

  if (!hotel) return null;

  const { lat, lng } = hotel.coordinates;
  const mapProviders: Record<MapProvider, { label: string; src: string; href: string }> = {
    yandex: {
      label: 'Яндекс',
      src: `https://yandex.com/map-widget/v1/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm&lang=ru_RU`,
      href: `https://yandex.com/maps/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm`,
    },
    dgis: {
      label: '2ГИС',
      src: `https://widgets.2gis.com/widget?type=map&lon=${lng}&lat=${lat}&zoom=16`,
      href: `https://2gis.kz/search/${lat},${lng}`,
    },
    google: {
      label: 'Google',
      src: `https://maps.google.com/?q=${lat},${lng}&z=16&output=embed`,
      href: `https://maps.google.com/?q=${lat},${lng}`,
    },
  };

  const contactItems = [
    {
      icon: MapPin,
      label: t('contacts.address'),
      value: hotel.address[lang],
      href: mapProviders[selectedMap].href,
    },
    {
      icon: Phone,
      label: t('contacts.phone'),
      value: hotel.phone,
      href: `tel:${hotel.phone.replace(/[^+\d]/g, '')}`,
    },
    {
      icon: Mail,
      label: t('contacts.email'),
      value: hotel.email,
      href: `mailto:${hotel.email}`,
    },
    {
      icon: Clock3,
      label: t('contacts.workingHours'),
      value: t('contacts.allDay'),
    },
  ];

  return (
    <section id="contacts" className="bg-secondary/45 py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
        >
          <SectionHeading
            eyebrow={`MAZA · ${t(`cities.${city}`)}`}
            title={t('contacts.title')}
            description={t('contacts.subtitle')}
            align="center"
          />
        </motion.div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col rounded-[26px] border border-border bg-card p-5 sm:p-7"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{copy.quickContact[lang]}</p>
            <div className="mt-5 divide-y divide-border">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-accent">
                      <item.icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground">{item.label}</span>
                      <span className="mt-1 block break-words text-sm font-medium leading-5 text-foreground">{item.value}</span>
                    </span>
                    {item.href && <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />}
                  </>
                );

                return item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="group flex items-center gap-3 py-4"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="flex items-center gap-3 py-4">{content}</div>
                );
              })}
            </div>

            <div className="mt-auto pt-6">
              <Button asChild className="h-12 w-full rounded-full bg-[#1faf5b] text-white shadow-none hover:bg-[#18964d]">
                <a href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t('contacts.whatsapp')}
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="overflow-hidden rounded-[26px] border border-border bg-card"
          >
            <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <h3 className="text-sm font-semibold text-foreground">{copy.map[lang]}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{copy.routeHint[lang]}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-full bg-secondary p-1">
                  {(Object.keys(mapProviders) as MapProvider[]).map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      onClick={() => setSelectedMap(provider)}
                      className={cn(
                        'rounded-full px-3 py-2 text-xs font-semibold transition',
                        selectedMap === provider ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground',
                      )}
                    >
                      {mapProviders[provider].label}
                    </button>
                  ))}
                </div>
                <a
                  href={mapProviders[selectedMap].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border px-4 text-xs font-semibold text-foreground transition hover:border-accent"
                >
                  {copy.openMap[lang]}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
            <div className="relative h-[390px] bg-muted sm:h-[460px]">
              <iframe
                key={`${city}-${selectedMap}`}
                src={mapProviders[selectedMap].src}
                title={`${mapProviders[selectedMap].label} ${hotel.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 grayscale-[18%]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
