'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
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
      <section id="rooms" className="py-24 lg:py-32 bg-background">
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
              {t('rooms.title')}
            </h2>
            <div className="w-16 h-[2px] bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground max-w-xl mx-auto text-balance">
              {t('rooms.subtitle')}
            </p>
          </motion.div>

          {/* Rooms Grid */}
          <div className="grid md:grid-cols-2 gap-8">
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
  lang: 'ru' | 'kz' | 'en';
  onViewGallery: () => void;
}

function RoomCard({ room, lang, onViewGallery }: RoomCardProps) {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-shadow duration-500">
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
              onClick={() => setCurrentImage(idx)}
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
          onClick={onViewGallery}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
        >
          <Expand className="w-5 h-5" />
        </button>

        {/* Price Badge */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2">
          <span className="text-sm text-muted-foreground">{t('rooms.from')}</span>
          <span className="text-lg font-medium text-foreground ml-1">
            {room.price.toLocaleString()} ₸
          </span>
          <span className="text-sm text-muted-foreground">{t('rooms.perNight')}</span>
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
          {room.amenities.slice(0, 5).map((amenity) => {
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
          {room.amenities.length > 5 && (
            <span className="inline-flex items-center text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1.5">
              +{room.amenities.length - 5}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl">
            {t('rooms.book')}
          </Button>
          <Button 
            variant="outline" 
            className="rounded-xl"
            onClick={onViewGallery}
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
  lang: 'ru' | 'kz' | 'en';
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelectIndex: (index: number) => void;
}

function GalleryModal({ 
  room, 
  lang, 
  currentIndex, 
  onClose, 
  onPrev, 
  onNext,
  onSelectIndex 
}: GalleryModalProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/95 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6">
        <div>
          <h3 className="text-white text-xl font-light">{room.name[lang]}</h3>
          <p className="text-white/60 text-sm">{currentIndex + 1} / {room.images.length}</p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image */}
      <div className="flex-1 relative flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={room.images[currentIndex]}
            alt={room.name[lang]}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="max-h-[70vh] max-w-full object-contain rounded-lg"
          />
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={onPrev}
          className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="p-4 md:p-6">
        <div className="flex justify-center gap-2">
          {room.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={cn(
                'w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all',
                idx === currentIndex 
                  ? 'ring-2 ring-accent opacity-100' 
                  : 'opacity-50 hover:opacity-80'
              )}
            >
              <img
                src={img}
                alt={`${room.name[lang]} ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
