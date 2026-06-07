'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { getHotelByCity } from '@/lib/data/hotels';
import { withBasePath } from '@/lib/asset-path';

interface HeroSectionProps {
  city: 'almaty' | 'astana';
}

export function HeroSection({ city }: HeroSectionProps) {
  const { t } = useTranslation();
  const hotel = getHotelByCity(city);

  if (!hotel) return null;
  const isAlmaty = city === 'almaty';
  const heroBackgroundImage =
    city === 'astana'
      ? '/cities/astana-embankment.jpg'
      : city === 'almaty'
        ? '/cities/almaty-cityscape.jpg'
        : hotel.heroImage;

  return (
    <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${withBasePath(heroBackgroundImage)})` }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            isAlmaty
              ? 'from-black/45 via-black/30 to-black/65'
              : 'from-black/40 via-black/20 to-black/60'
          }`}
        />
        {isAlmaty && (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,223,179,0.28),transparent_45%)]" />
        )}
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
          >
            {hotel.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: '5rem' }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-[2px] bg-accent mx-auto mb-6"
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="text-xl md:text-2xl font-light text-white/80 max-w-2xl mx-auto mb-10 text-balance"
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-8 text-base"
            >
              <Link href="/booking">
                {t('hero.cta')}
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/50 bg-transparent text-white hover:border-white/50 hover:bg-transparent hover:text-white rounded-full px-8 text-base"
            >
              <Link href={`#rooms`}>
                {t('hero.explore')}
              </Link>
            </Button>
          </motion.div>
        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </motion.div>
    </section>
  );
}
