'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { MapPin, Mountain, Building2 } from 'lucide-react';

const cityCards = [
  {
    id: 'almaty',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    icon: Mountain,
    gradient: 'from-emerald-900/80 to-emerald-700/60',
  },
  {
    id: 'astana',
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1200&q=80',
    icon: Building2,
    gradient: 'from-slate-900/80 to-slate-700/60',
  },
] as const;

export function CitySelector() {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground mb-4">
          Hi Hotel
        </h1>
        <div className="w-20 h-[2px] bg-accent mx-auto mb-6" />
        <h2 className="text-2xl md:text-3xl font-light text-foreground/80 mb-4">
          {t('cities.title')}
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto text-balance">
          {t('cities.subtitle')}
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 lg:gap-10 w-full max-w-5xl">
        {cityCards.map((city, index) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
          >
            <Link href={`/${city.id}`} className="block group">
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-xl">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${city.image})` }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${city.gradient} transition-opacity duration-500 group-hover:opacity-90`} />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center mb-6 group-hover:border-white/80 transition-colors"
                  >
                    <city.icon className="w-8 h-8" />
                  </motion.div>
                  
                  <h3 className="text-3xl md:text-4xl font-light mb-3 tracking-wide">
                    {t(`cities.${city.id}`)}
                  </h3>
                  
                  <p className="text-white/80 text-center max-w-xs text-sm md:text-base text-balance">
                    {t(`cities.${city.id}Desc`)}
                  </p>
                  
                  <div className="mt-8 flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm uppercase tracking-widest">
                      Hi Hotel {t(`cities.${city.id}`)}
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent/0 group-hover:bg-accent transition-colors duration-500" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
