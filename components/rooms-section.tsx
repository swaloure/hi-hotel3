'use client';

import { type MouseEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { 
  Wifi, 
  Wind, 
  Tv, 
  Wine, 
  Lock, 
  Sparkles,
  Coffee,
  Car,
  ConciergeBell,
  Expand,
  Users,
  Bed,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmoothLink } from '@/components/smooth-link';
import { getHotelByCity, type Room } from '@/lib/data/hotels';
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

export function RoomsSection({ city }: RoomsSectionProps) {
  const { t, i18n } = useTranslation();
  const hotel = getHotelByCity(city);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  if (!hotel) return null;

  const lang = i18n.language as 'ru' | 'kz' | 'en';

  return (
    <>
      <section id="rooms" className="bg-background py-16 sm:py-24 lg:py-32">
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
              {t('rooms.title')}
            </h2>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-balance">
              {t('rooms.subtitle')}
            </p>
          </motion.div>

          {/* Rooms Grid */}
          <div className="grid gap-5 sm:gap-8 md:grid-cols-2">
            {hotel.rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
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

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <GalleryModal
            room={selectedRoom}
            city={city}
            lang={lang}
            currentIndex={galleryIndex}
            onClose={() => setSelectedRoom(null)}
            onPrev={() => setGalleryIndex((i) => (i > 0 ? i - 1 : selectedRoom.images.length - 1))}
            onNext={() => setGalleryIndex((i) => (i < selectedRoom.images.length - 1 ? i + 1 : 0))}
            onSelectIndex={setGalleryIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
}

interface RoomCardProps {
  room: Room;
  city: 'almaty' | 'astana';
  lang: 'ru' | 'kz' | 'en';
  onViewGallery: () => void;
}

function RoomCard({ room, city, lang, onViewGallery }: RoomCardProps) {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const hiddenAmenitiesCount = Math.max(room.amenities.length - 5, 0);
  const displayedAmenities = showAllAmenities ? room.amenities : room.amenities.slice(0, 5);
  const isKazakh = lang === 'kz';
  const formattedPrice = room.price.toLocaleString();
  const stopCardClick = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onViewGallery}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onViewGallery();
        }
      }}
      className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-500 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {/* Image Carousel */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <div className="relative w-full h-full">
          {room.images.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                'absolute inset-0 transition-opacity duration-500',
                idx === currentImage ? 'opacity-100' : 'opacity-0'
              )}
            >
              <img
                src={img}
                alt={room.name[lang]}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {room.images.map((_, idx) => (
            <button
              key={idx}
              onClick={(event) => {
                event.stopPropagation();
                setCurrentImage(idx);
              }}
              className={cn(
                'w-2 h-2 rounded-full transition-all',
                idx === currentImage 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 hover:bg-white/70'
              )}
            />
          ))}
        </div>

        {/* Expand Button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onViewGallery();
          }}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <Expand className="w-5 h-5" />
        </button>

        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2">
          {isKazakh ? (
            <>
              <span className="text-sm text-muted-foreground">Бір түнге</span>
              <span className="text-base font-medium text-foreground ml-1">
                {formattedPrice}
              </span>
              <span className="text-sm text-muted-foreground"> теңгеден бастап</span>
            </>
          ) : (
            <>
              <span className="text-sm text-muted-foreground">{t('rooms.from')}</span>
              <span className="text-base font-medium text-foreground ml-1">
                {formattedPrice} ₸
              </span>
              <span className="text-sm text-muted-foreground">{t('rooms.perNight')}</span>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-medium text-foreground mb-1">
              {room.name[lang]}
            </h3>
            <p className="text-sm text-muted-foreground">{room.bedType[lang]}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              {room.area} {t('rooms.sqm')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {room.maxGuests} {t('rooms.guests')}
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
          {room.description[lang]}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mb-6">
          {displayedAmenities.map((amenity) => {
            const Icon = amenityIcons[amenity] || Sparkles;
            return (
              <span
                key={amenity}
                className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1.5"
              >
                <Icon className="w-3.5 h-3.5" />
                {t(`amenities.${amenity}`)}
              </span>
            );
          })}
          {!showAllAmenities && hiddenAmenitiesCount > 0 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setShowAllAmenities(true);
              }}
              className="inline-flex items-center text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1.5 hover:bg-secondary/80 transition-colors"
            >
              +{hiddenAmenitiesCount}
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button asChild className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl" onClick={stopCardClick}>
            <SmoothLink href={`/booking/${city}`}>
              {t('rooms.book')}
            </SmoothLink>
          </Button>
          <Button 
            variant="outline" 
            className="rounded-xl"
            onClick={(event) => {
              event.stopPropagation();
              onViewGallery();
            }}
          >
            {t('rooms.details')}
          </Button>
        </div>
      </div>
    </div>
  );
}

interface GalleryModalProps {
  room: Room;
  city: 'almaty' | 'astana';
  lang: 'ru' | 'kz' | 'en';
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

function GalleryModal({ 
  room, 
  city,
  lang, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext,
  onSelectIndex 
}: GalleryModalProps) {
  const { t } = useTranslation();
  const isKazakh = lang === 'kz';
  const formattedPrice = room.price.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/45 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto flex h-[88vh] w-[94vw] max-h-[760px] max-w-[1220px] flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-2xl md:h-[72vh] md:flex-row"
      >
        <button
          onClick={onClose}
          aria-label={t('common.close')}
          className="absolute right-4 top-4 z-40 p-1.5 text-black transition-colors hover:text-black/70"
        >
          <X className="h-6 w-6 stroke-[2.5]" />
        </button>

        {/* Gallery */}
        <div className="relative grid h-[48%] w-full min-h-0 grid-rows-[minmax(0,1fr)_64px] bg-background p-3 md:h-full md:w-[52%] md:grid-rows-[minmax(0,1fr)_76px] md:p-4">
          <div className="absolute left-4 top-4 rounded-full bg-black/50 px-3 py-1 text-xs text-white/85">
            {currentIndex + 1} / {room.images.length}
          </div>

          <div className="relative row-start-1 h-full min-h-0 w-full overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={room.images[currentIndex]}
                alt={room.name[lang]}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={onPrev}
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75 md:left-4 md:h-12 md:w-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={onNext}
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white transition-colors hover:bg-black/75 md:right-4 md:h-12 md:w-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="row-start-2 z-20 flex h-16 items-end justify-center pt-2 md:h-[76px] md:pt-3">
            <div className="flex items-center justify-center gap-2 overflow-x-auto px-1">
              {room.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectIndex(idx)}
                  className={cn(
                    'h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all',
                    idx === currentIndex
                      ? 'opacity-100 ring-2 ring-accent'
                      : 'opacity-70 hover:opacity-95'
                  )}
                >
                  <img
                    src={img}
                    alt={`${room.name[lang]} ${idx + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
              </div>
          
        </div>

        {/* Full Room Details */}
        <div className="h-[52%] w-full border-t border-border/60 bg-background md:h-full md:w-[48%] md:border-l md:border-t-0">
          <div className="h-full overflow-y-auto p-4 md:p-5">
            <h3 className="text-xl font-light text-foreground sm:text-2xl">
              {room.name[lang]}
            </h3>

            <div className="mt-5 rounded-xl bg-secondary/60 p-4 border border-border/50">
              {isKazakh ? (
                <>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-muted-foreground">Бір түнге</span>
                    <span className="text-lg font-medium text-foreground">
                      {formattedPrice}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">теңгеден бастап</p>
                </>
              ) : (
                <>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm text-muted-foreground">{t('rooms.from')}</span>
                    <span className="text-lg font-medium text-foreground">
                      {formattedPrice} ₸
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{t('rooms.perNight')}</p>
                </>
              )}

              <div className="mt-4 grid gap-2 text-sm text-foreground">
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-accent" />
                  <span>{room.bedType[lang]}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Expand className="w-4 h-4 text-accent" />
                  <span>
                    {room.area} {t('rooms.sqm')}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-accent" />
                  <span>
                    {room.maxGuests} {t('rooms.guests')}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              {room.description[lang]}
            </p>

            <div className="mt-6">
              <h4 className="text-sm font-medium text-foreground mb-3">
                {t('rooms.amenities')}
              </h4>
              <div className="grid gap-2">
                {room.amenities.map((amenity) => {
                  const Icon = amenityIcons[amenity] || Sparkles;
                  return (
                    <div
                      key={amenity}
                      className="inline-flex items-center gap-2 text-sm text-foreground/90 rounded-lg bg-card border border-border/60 px-3 py-2"
                    >
                      <Icon className="w-4 h-4 text-accent" />
                      <span>{t(`amenities.${amenity}`)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button asChild className="mt-6 w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
              <SmoothLink href={`/booking/${city}`}>
                {t('rooms.book')}
              </SmoothLink>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

