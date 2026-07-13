'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle,
  ExternalLink,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHotelByCity } from '@/lib/data/hotels';

interface ContactSectionProps {
  city: 'almaty' | 'astana';
}

type MapProvider = 'yandex' | 'dgis' | 'google';

export function ContactSection({ city }: ContactSectionProps) {
  const { t, i18n } = useTranslation();
  const hotel = getHotelByCity(city);
  const [selectedMap, setSelectedMap] = useState<MapProvider>('yandex');

  if (!hotel) return null;

  const normalized = i18n.language.toLowerCase();
  const lang: 'ru' | 'kz' | 'en' = normalized.startsWith('en')
    ? 'en'
    : normalized.startsWith('kz') || normalized.startsWith('kk')
      ? 'kz'
      : 'ru';
  const { lat, lng } = hotel.coordinates;

  const contactItems = [
    {
      icon: MapPin,
      label: t('contacts.address'),
      value: hotel.address[lang],
      href: `https://maps.google.com/?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`,
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
      icon: Clock,
      label: t('contacts.workingHours'),
      value: t('contacts.allDay'),
      href: undefined,
    },
  ];

  const mapProviders: Record<MapProvider, { label: string; src?: string; href: string }> = {
    yandex: {
      label: 'Яндекс',
      src: `https://yandex.com/map-widget/v1/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm&lang=ru_RU`,
      href: `https://yandex.com/maps/?ll=${lng}%2C${lat}&z=16&pt=${lng},${lat},pm2rdm`,
    },
    dgis: {
      label: '2ГИС',
      href: `https://2gis.kz/search/${lat},${lng}`,
    },
    google: {
      label: 'Google Maps',
      src: `https://maps.google.com/?q=${lat},${lng}&z=16&output=embed`,
      href: `https://maps.google.com/?q=${lat},${lng}`,
    },
  };

  const mapUi = {
    ru: { label: 'Карта', choose: 'Выберите карту', externalTitle: 'Открыть маршрут в 2ГИС', externalDescription: 'Точка откроется в новой вкладке 2ГИС.', open: 'Открыть 2ГИС' },
    kz: { label: 'Карта', choose: 'Картаны таңдаңыз', externalTitle: 'Бағытты 2ГИС арқылы ашу', externalDescription: 'Таңдалған орын жаңа бетте ашылады.', open: '2ГИС ашу' },
    en: { label: 'Map', choose: 'Choose a map', externalTitle: 'Open directions in 2GIS', externalDescription: 'The selected location will open in a new tab.', open: 'Open 2GIS' },
  };

  return (
    <section id="contacts" className="bg-secondary/30 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center sm:mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
            Hi Hotel {t(`cities.${city}`)}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mt-4 mb-4 text-balance">
            {t('contacts.title')}
          </h2>
          <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-balance">
            {t('contacts.subtitle')}
          </p>
        </motion.div>

        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="rounded-2xl border border-border/50 bg-card p-5 shadow-lg sm:p-8">
              <div className="space-y-6">
                {contactItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {item.href ? (
                      <a 
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start gap-4 group"
                      >
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          <p className="text-foreground group-hover:text-accent transition-colors">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-accent" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                          <p className="text-foreground">{item.value}</p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* WhatsApp Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 pt-8 border-t border-border"
              >
                <Button
                  asChild
                  className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl"
                >
                  <a
                    href={`https://wa.me/${hotel.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t('contacts.whatsapp')}
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[360px] min-h-[360px] sm:h-[400px] sm:min-h-[400px] lg:h-full"
          >
            <div className="w-full h-full bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden flex flex-col">
              <div className="flex flex-col gap-3 border-b border-border/60 bg-background/70 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{mapUi[lang].label}</p>
                  <p className="text-xs text-muted-foreground">{mapUi[lang].choose}</p>
                </div>
                <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
                  <div className="inline-flex max-w-full overflow-x-auto rounded-full bg-secondary p-1">
                    {(['yandex', 'dgis', 'google'] as MapProvider[]).map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        onClick={() => setSelectedMap(provider)}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                          selectedMap === provider
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {mapProviders[provider].label}
                      </button>
                    ))}
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full rounded-full sm:w-auto">
                    <a
                      href={mapProviders[selectedMap].href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t('common.viewAll')}
                    </a>
                  </Button>
                </div>
              </div>
              <div className="relative flex-1">
                {selectedMap === 'dgis' ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-primary px-6 text-center text-primary-foreground">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10">
                      <Navigation className="h-6 w-6 text-accent" />
                    </span>
                    <h3 className="mt-4 text-xl font-light">{mapUi[lang].externalTitle}</h3>
                    <p className="mt-2 text-sm text-primary-foreground/60">{mapUi[lang].externalDescription}</p>
                    <a
                      href={mapProviders.dgis.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-10 items-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
                    >
                      {mapUi[lang].open}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </div>
                ) : (
                  <iframe
                    key={`${city}-${selectedMap}`}
                    src={mapProviders[selectedMap].src}
                    title={`${mapProviders[selectedMap].label} ${hotel.name}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
