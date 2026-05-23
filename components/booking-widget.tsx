'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { ru, kk, enUS } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface BookingWidgetProps {
  city: 'almaty' | 'astana';
  variant?: 'hero' | 'standalone';
}

const locales = {
  ru: ru,
  kz: kk,
  en: enUS,
};

export function BookingWidget({ city, variant = 'standalone' }: BookingWidgetProps) {
  const { t, i18n } = useTranslation();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  
  const locale = locales[i18n.language as keyof typeof locales] || ru;

  const isHero = variant === 'hero';

  return (
    <div 
      id="booking"
      data-city={city}
      className={cn(
        'rounded-2xl p-6 md:p-8',
        isHero 
          ? 'glass border border-white/20' 
          : 'bg-card border border-border shadow-lg'
      )}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Check-in Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            {t('booking.checkIn')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  isHero 
                    ? 'bg-white/10 border-white/20 text-black hover:bg-white/20'
                    : '',
                  !checkIn && 'text-black'
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, 'dd MMM yyyy', { locale }) : 'Выберите дату'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                locale={locale}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check-out Date */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            {t('booking.checkOut')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  isHero 
                    ? 'bg-white/10 border-white/20 text-black hover:bg-white/20'
                    : '',
                  !checkOut && 'text-black'
                )}
              >
                <Calendar className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, 'dd MMM yyyy', { locale }) : 'Выберите дату'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                locale={locale}
                disabled={(date) => date < (checkIn || new Date())}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="block text-sm font-medium mb-2 text-black">
            {t('booking.guests')}
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  isHero 
                    ? 'bg-white/10 border-white/20 text-black hover:bg-white/20'
                    : ''
                )}
              >
                <Users className="mr-2 h-4 w-4" />
                {adults} {t('booking.adults')}, {children} {t('booking.children')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64" align="start">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('booking.adults')}</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(Math.max(1, adults - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{adults}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setAdults(Math.min(10, adults + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{t('booking.children')}</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(Math.max(0, children - 1))}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{children}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setChildren(Math.min(6, children + 1))}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button 
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-xl h-10"
          >
            <Search className="w-4 h-4 mr-2" />
            {t('booking.search')}
          </Button>
        </div>
      </div>
    </div>
  );
}
