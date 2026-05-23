'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getHotelByCity } from '@/lib/data/hotels';

interface ContactSectionProps {
  city: 'almaty' | 'astana';
}

export function ContactSection({ city }: ContactSectionProps) {
  const { t, i18n } = useTranslation();
  const hotel = getHotelByCity(city);

  if (!hotel) return null;

  const lang = i18n.language as 'ru' | 'kz' | 'en';

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

  return (
    <section id="contacts" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
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

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50">
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
                    href={`https://wa.me/${hotel.whatsapp.replace(/[^+\d]/g, '')}`}
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

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] lg:h-full min-h-[400px]"
          >
            <div className="w-full h-full bg-card rounded-2xl shadow-lg border border-border/50 overflow-hidden relative">
              {/* Map Placeholder UI */}
              <div className="absolute inset-0 bg-secondary/50">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                />
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                  <MapPin className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Google Maps / Yandex Maps
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Map Integration Placeholder
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                  {hotel.coordinates.lat.toFixed(6)}, {hotel.coordinates.lng.toFixed(6)}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="mt-4 rounded-full"
                >
                  <a
                    href={`https://maps.google.com/?q=${hotel.coordinates.lat},${hotel.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t('common.viewAll')}
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
