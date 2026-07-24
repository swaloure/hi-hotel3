'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  BedDouble,
  Car,
  Coffee,
  ConciergeBell,
  Expand,
  Lock,
  Sparkles,
  Tv,
  Users,
  Wifi,
  Wind,
  Wine,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmoothLink } from '@/components/smooth-link';
import { SectionHeading } from '@/components/section-heading';
import { getHotelByCity } from '@/lib/data/hotels';
import { useRoomsCatalog } from '@/hooks/use-rooms-catalog';
import { useBodyScrollLock } from '@/hooks/use-body-scroll-lock';
import type { CatalogRoom } from '@/lib/data/rooms-catalog';
import { resolveLanguage, type SiteLanguage } from '@/lib/i18n/language';
import { cn } from '@/lib/utils';

interface RoomsSectionProps {
  city: 'almaty' | 'astana';
}

const amenityIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  wifi: Wifi,
  ac: Wind,
  tv: Tv,
  minibar: Wine,
  safe: Lock,
  hairdryer: Sparkles,
  bathrobe: Sparkles,
  breakfast: Coffee,
  parking: Car,
  roomService: ConciergeBell,
};

const copy = {
  gallery: { ru: 'Открыть галерею', kz: 'Галереяны ашу', en: 'Open gallery' },
  previous: { ru: 'Предыдущее фото', kz: 'Алдыңғы фото', en: 'Previous photo' },
  next: { ru: 'Следующее фото', kz: 'Келесі фото', en: 'Next photo' },
  showMore: { ru: 'Показать все удобства', kz: 'Барлық қолайлылықтарды көрсету', en: 'Show all amenities' },
  roomDetails: { ru: 'Информация о номере', kz: 'Нөмір туралы ақпарат', en: 'Room details' },
  upToGuests: {
    ru: (count: number) => `до ${count} гостей`,
    kz: (count: number) => `${count} қонаққа дейін`,
    en: (count: number) => `up to ${count} guests`,
  },
} as const;

export function RoomsSection({ city }: RoomsSectionProps) {
  const { t, i18n } = useTranslation();
  const hotel = getHotelByCity(city);
  const [selectedRoom, setSelectedRoom] = useState<CatalogRoom | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const lang = resolveLanguage(i18n.language);
  const { rooms, isLoading } = useRoomsCatalog(city);

  const closeGallery = useCallback(() => setSelectedRoom(null), []);
  const showPreviousImage = () => {
    setGalleryIndex((index) => selectedRoom?.images.length ? (index - 1 + selectedRoom.images.length) % selectedRoom.images.length : 0);
  };
  const showNextImage = () => {
    setGalleryIndex((index) => selectedRoom?.images.length ? (index + 1) % selectedRoom.images.length : 0);
  };

  if (!hotel || isLoading || rooms.length === 0) return null;

  return (
    <>
      <section id="rooms" className="bg-background py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
          >
            <SectionHeading
              eyebrow={`MAZA · ${t(`cities.${city}`)}`}
              title={t('rooms.title')}
              description={t('rooms.subtitle')}
              align="center"
            />
          </motion.div>

          <div className={cn('mt-12 grid gap-5 sm:mt-14 lg:gap-7', rooms.length > 1 ? 'lg:grid-cols-2' : 'mx-auto max-w-2xl')}>
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{ duration: 0.58, delay: (index % 2) * 0.08 }}
              >
                <RoomCard
                  room={room}
                  city={city}
                  lang={lang}
                  onViewGallery={() => {
                    setSelectedRoom(room);
                    setGalleryIndex(0);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRoom && (
          <GalleryModal
            room={selectedRoom}
            city={city}
            lang={lang}
            currentIndex={galleryIndex}
            onClose={closeGallery}
            onPrev={showPreviousImage}
            onNext={showNextImage}
            onSelectIndex={setGalleryIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface RoomCardProps {
  room: CatalogRoom;
  city: RoomsSectionProps['city'];
  lang: SiteLanguage;
  onViewGallery: () => void;
}

function RoomCard({ room, city, lang, onViewGallery }: RoomCardProps) {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const roomAmenities = room.amenities[lang];
  const displayedAmenities = showAllAmenities ? roomAmenities : roomAmenities.slice(0, 4);
  const hiddenAmenities = roomAmenities.length - displayedAmenities.length;
  const formattedPrice = room.price.toLocaleString('ru-RU');

  const previousImage = () => setCurrentImage((index) => (index - 1 + room.images.length) % room.images.length);
  const nextImage = () => setCurrentImage((index) => (index + 1) % room.images.length);

  return (
    <article className="group overflow-hidden rounded-[26px] border border-border/80 bg-card transition duration-300 hover:-translate-y-1 hover:border-accent/35 hover:shadow-[0_24px_60px_rgba(28,30,34,0.1)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {room.images.length > 0 ? (
          room.images.map((image, index) => (
            <Image
              key={image}
              src={image}
              alt={index === currentImage ? room.name[lang] : ''}
              fill
              unoptimized
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition duration-700',
                index === currentImage ? 'scale-100 opacity-100 group-hover:scale-[1.025]' : 'scale-105 opacity-0',
              )}
            />
          ))
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-muted text-muted-foreground">
            <BedDouble className="h-10 w-10 text-accent" />
            <span className="mt-3 text-xs font-semibold uppercase tracking-[0.22em]">MAZA</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/46 via-transparent to-black/10" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {room.price > 0 && (
            <span className="rounded-full border border-white/22 bg-black/28 px-3.5 py-2 text-xs font-medium text-white backdrop-blur-md">
              {t('rooms.from')} <strong className="ml-1 text-sm">{formattedPrice} {room.currency}</strong>
              <span className="ml-1 text-white/65">{t('rooms.perNight')}</span>
            </span>
          )}
          {room.badge[lang] && (
            <span className="rounded-full bg-accent px-3.5 py-2 text-xs font-semibold text-accent-foreground">
              {room.badge[lang]}
            </span>
          )}
        </div>

        {room.images.length > 0 && (
          <button
            type="button"
            onClick={onViewGallery}
            className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/28 text-white backdrop-blur-md transition hover:bg-white hover:text-foreground"
            aria-label={copy.gallery[lang]}
          >
            <Expand className="h-4 w-4" />
          </button>
        )}

        {room.images.length > 1 && <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
          <div className="flex gap-1.5" aria-label={copy.gallery[lang]}>
            {room.images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={cn(
                  'h-1.5 rounded-full transition-all',
                  currentImage === index ? 'w-7 bg-white' : 'w-1.5 bg-white/45 hover:bg-white/75',
                )}
                aria-label={`${copy.gallery[lang]} ${index + 1}`}
                aria-current={currentImage === index ? 'true' : undefined}
              />
            ))}
          </div>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={previousImage}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/28 text-white backdrop-blur-md transition hover:bg-white hover:text-foreground"
              aria-label={copy.previous[lang]}
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white text-foreground transition hover:bg-accent"
              aria-label={copy.next[lang]}
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>}
      </div>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl font-light tracking-[-0.02em] text-foreground">{room.name[lang]}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{room.bedType[lang]}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><BedDouble className="h-3.5 w-3.5 text-accent" />{room.area} {t('rooms.sqm')}</span>
            <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5 text-accent" />{room.maxGuests}</span>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted-foreground">{room.description[lang]}</p>

        <div className="mt-5 flex min-h-16 flex-wrap content-start gap-2">
          {displayedAmenities.map((amenity) => {
            const Icon = getAmenityIcon(amenity);
            return (
              <span key={amenity} className="inline-flex items-center gap-1.5 rounded-full bg-secondary/75 px-3 py-1.5 text-[11px] font-medium text-foreground/68">
                <Icon className="h-3.5 w-3.5 text-accent" />
                {getAmenityLabel(amenity, t)}
              </span>
            );
          })}
          {!showAllAmenities && hiddenAmenities > 0 && (
            <button
              type="button"
              onClick={() => setShowAllAmenities(true)}
              className="rounded-full border border-border px-3 py-1.5 text-[11px] font-semibold text-muted-foreground transition hover:border-accent hover:text-foreground"
              aria-label={copy.showMore[lang]}
            >
              +{hiddenAmenities}
            </button>
          )}
        </div>

        <div className="mt-6 grid grid-cols-[1fr_auto] gap-2.5 border-t border-border pt-5">
          <Button asChild className="h-11 rounded-full bg-accent text-accent-foreground shadow-none hover:bg-gold-light">
            <SmoothLink href={`/booking/${city}`}>{t('rooms.book')}</SmoothLink>
          </Button>
          <Button variant="outline" className="h-11 rounded-full px-5" onClick={onViewGallery}>
            {t('rooms.details')}
          </Button>
        </div>
      </div>
    </article>
  );
}

interface GalleryModalProps {
  room: CatalogRoom;
  city: RoomsSectionProps['city'];
  lang: SiteLanguage;
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

function GalleryModal({ room, city, lang, currentIndex, onClose, onPrev, onNext, onSelectIndex }: GalleryModalProps) {
  const { t } = useTranslation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = `room-dialog-${room.id}`;

  useBodyScrollLock(true);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') onPrev();
      if (event.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      previousActiveElement?.focus();
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[80] flex items-center justify-center overscroll-none bg-black/72 p-2 backdrop-blur-md sm:p-5"
    >
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: 0.24 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[94svh] w-full max-w-6xl flex-col overflow-hidden overscroll-none rounded-[26px] bg-background shadow-2xl lg:h-[84vh] lg:max-h-[760px] lg:flex-row"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/42 text-white backdrop-blur-md transition hover:bg-white hover:text-foreground sm:right-4 sm:top-4"
          aria-label={t('common.close')}
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative h-[46vh] min-h-[300px] bg-graphite lg:h-full lg:w-[62%]">
          {room.images.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={room.images[currentIndex]}
                initial={{ opacity: 0.4 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0.3 }}
                transition={{ duration: 0.22 }}
                className="absolute inset-0"
              >
                <Image
                  src={room.images[currentIndex]}
                  alt={room.name[lang]}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 62vw, 100vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-graphite to-primary text-white/60">
              <BedDouble className="h-14 w-14 text-accent" />
              <span className="mt-4 text-xs font-semibold uppercase tracking-[0.24em]">MAZA</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
          {room.images.length > 1 && <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4">
            <div className="flex gap-2">
              {room.images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => onSelectIndex(index)}
                  className={cn(
                    'relative h-12 w-16 overflow-hidden rounded-lg border-2 transition sm:h-14 sm:w-20',
                    currentIndex === index ? 'border-accent' : 'border-transparent opacity-65 hover:opacity-100',
                  )}
                  aria-label={`${copy.gallery[lang]} ${index + 1}`}
                >
                  <Image src={image} alt="" fill unoptimized sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={onPrev} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/92 text-foreground transition hover:bg-accent" aria-label={copy.previous[lang]}>
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={onNext} className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-foreground transition hover:bg-accent" aria-label={copy.next[lang]}>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>}
        </div>

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-y-contain p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">{copy.roomDetails[lang]}</p>
          <h2 id={titleId} className="mt-3 font-serif text-3xl font-light tracking-[-0.025em] text-foreground sm:text-4xl">{room.name[lang]}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{room.bedType[lang]}</p>

          <div className="mt-6 flex gap-5 border-y border-border py-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><BedDouble className="h-4 w-4 text-accent" />{room.area} {t('rooms.sqm')}</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4 text-accent" />{copy.upToGuests[lang](room.maxGuests)}</span>
          </div>

          <p className="mt-6 text-sm leading-7 text-muted-foreground">{room.description[lang]}</p>

          <h3 className="mt-7 text-sm font-semibold text-foreground">{t('rooms.amenities')}</h3>
          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3">
            {room.amenities[lang].map((amenity) => {
              const Icon = getAmenityIcon(amenity);
              return (
                <div key={amenity} className="flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                  <Icon className="h-4 w-4 text-accent" />
                  {getAmenityLabel(amenity, t)}
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-8">
            {room.price > 0 && <p className="mb-3 text-sm text-muted-foreground">
              {t('rooms.from')} <strong className="ml-1 text-xl text-foreground">{room.price.toLocaleString('ru-RU')} {room.currency}</strong> {t('rooms.perNight')}
            </p>}
            <Button asChild className="h-12 w-full rounded-full bg-accent text-accent-foreground hover:bg-gold-light">
              <SmoothLink href={`/booking/${city}`}>{t('rooms.book')}</SmoothLink>
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function getAmenityLabel(amenity: string, t: TFunction) {
  return amenityIcons[amenity] ? t(`amenities.${amenity}`) : amenity;
}

function getAmenityIcon(amenity: string) {
  if (amenityIcons[amenity]) return amenityIcons[amenity];

  const normalized = amenity.trim().toLowerCase();
  if (/wi-?fi|вайфай|интернет/.test(normalized)) return Wifi;
  if (/кондиционер|air conditioning|conditioner|климат/.test(normalized)) return Wind;
  if (/телевизор|smart tv|tv/.test(normalized)) return Tv;
  if (/мини-?бар|minibar/.test(normalized)) return Wine;
  if (/сейф|safe/.test(normalized)) return Lock;
  if (/фен|hair ?dryer/.test(normalized)) return Wind;
  if (/завтрак|breakfast/.test(normalized)) return Coffee;
  if (/парков|parking/.test(normalized)) return Car;
  if (/room service|обслуживание/.test(normalized)) return ConciergeBell;
  return Sparkles;
}
