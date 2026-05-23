'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { MapPin, Award, Clock } from 'lucide-react';

interface AboutSectionProps {
  city: 'almaty' | 'astana';
}

const features = [
  { key: 'feature1', icon: MapPin },
  { key: 'feature2', icon: Award },
  { key: 'feature3', icon: Clock },
];

export function AboutSection({ city }: AboutSectionProps) {
  const { t } = useTranslation();

  const images = city === 'almaty' 
    ? [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
      ]
    : [
        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80',
      ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src={images[0]}
                alt="Hotel interior"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-8 border-background hidden md:block"
            >
              <img
                src={images[1]}
                alt="Hotel room"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
              {t('about.subtitle')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-foreground mt-4 mb-6 text-balance">
              {t('about.title')}
            </h2>
            <div className="w-16 h-[2px] bg-accent mb-8" />
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              {t('about.description')}
            </p>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {t(`about.${feature.key}`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`about.${feature.key}Desc`)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
