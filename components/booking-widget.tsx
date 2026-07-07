'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface BookingWidgetProps {
  city: 'almaty' | 'astana';
  variant?: 'hero' | 'standalone';
  className?: string;
}

type BnovoWidgetConfig = {
  type: 'vertical';
  uid: string;
  lang: string;
  currency: string;
  width: string;
  width_mobile: string;
  background: string;
  background_mobile: string;
  bg_alpha: string;
  bg_alpha_mobile: string;
  border_color_mobile: string;
  padding: string;
  padding_mobile: string;
  border_radius: string;
  button_font_size: string;
  button_height: string;
  font_type: string;
  title_color: string;
  title_color_mobile: string;
  title_size: string;
  title_size_mobile: string;
  inp_color: string;
  inp_bordhover: string;
  inp_bordcolor: string;
  inp_alpha: string;
  btn_background: string;
  btn_background_over: string;
  btn_textcolor: string;
  btn_textover: string;
  btn_bordcolor: string;
  btn_bordhover: string;
  min_age: string;
  max_age: string;
  adults_default: string;
  dates_preset: string;
  dfrom_today: string;
  dfrom_value: string;
  dto_nextday: string;
  dto_value: string;
  cancel_color: string;
  onlyrooms: string;
  firstroom: string;
  switch_mobiles_width: string;
};

type BnovoWidgetApi = {
  init: (callback: () => void) => void;
  open: (htmlId: string, config: BnovoWidgetConfig) => void;
};

declare global {
  interface Window {
    Bnovo_Widget?: BnovoWidgetApi;
  }
}

const BNOVO_UID = 'a8395a9c-768d-4038-ae49-cf4072d9dcb4';
const BNOVO_SCRIPT_SRC = 'https://widget.reservationsteps.ru/js/bnovo.js';

const ROOM_FILTERS = {
  almaty: {
    onlyrooms: '551521,551494',
    firstroom: '551521',
  },
  astana: {
    onlyrooms: '551530',
    firstroom: '551530',
  },
} as const;

let bnovoScriptPromise: Promise<void> | null = null;

function loadBnovoScript() {
  if (window.Bnovo_Widget) {
    return Promise.resolve();
  }

  if (bnovoScriptPromise) {
    return bnovoScriptPromise;
  }

  bnovoScriptPromise = new Promise<void>((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${BNOVO_SCRIPT_SRC}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(), { once: true });
      existingScript.addEventListener('error', () => reject(new Error('Bnovo booking script failed to load')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = BNOVO_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Bnovo booking script failed to load'));
    document.body.appendChild(script);
  });

  return bnovoScriptPromise;
}

function getBnovoConfig(city: BookingWidgetProps['city'], lang: string): BnovoWidgetConfig {
  const roomFilter = ROOM_FILTERS[city];

  return {
    type: 'vertical',
    uid: BNOVO_UID,
    lang,
    currency: 'KZT',
    width: '300',
    width_mobile: '300',
    background: '#ffffff',
    background_mobile: '#ffffff',
    bg_alpha: '100',
    bg_alpha_mobile: '100',
    border_color_mobile: '#DED6C4',
    padding: '24',
    padding_mobile: '24',
    border_radius: '18',
    button_font_size: '14',
    button_height: '44',
    font_type: 'inter',
    title_color: '#303039',
    title_color_mobile: '#303039',
    title_size: '22',
    title_size_mobile: '22',
    inp_color: '#303039',
    inp_bordhover: '#C9AD67',
    inp_bordcolor: '#D8D1C3',
    inp_alpha: '100',
    btn_background: '#C9AD67',
    btn_background_over: '#B39245',
    btn_textcolor: '#2B2C34',
    btn_textover: '#2B2C34',
    btn_bordcolor: '#C9AD67',
    btn_bordhover: '#B39245',
    min_age: '0',
    max_age: '17',
    adults_default: '1',
    dates_preset: 'on',
    dfrom_today: 'on',
    dfrom_value: '2',
    dto_nextday: 'on',
    dto_value: '2',
    cancel_color: '#ffffff',
    onlyrooms: roomFilter.onlyrooms,
    firstroom: roomFilter.firstroom,
    switch_mobiles_width: '800',
  };
}

function bnovoCreditMarkup(widgetId: string) {
  return `
    <a
      href="https://bnovo.ru/"
      id="${widgetId}_link"
      target="_blank"
      rel="noopener noreferrer"
      class="sr-only"
    >
      Bnovo
    </a>
  `;
}

export function BookingWidget({ city, variant = 'standalone', className }: BookingWidgetProps) {
  const { i18n } = useTranslation();
  const initializedRef = useRef(false);
  const isHero = variant === 'hero';
  const widgetId = useMemo(() => `_bn_widget_${city}_${variant}`, [city, variant]);
  const widgetLang = i18n.language?.toLowerCase().startsWith('en') ? 'en' : 'ru';

  useEffect(() => {
    let isCancelled = false;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let observer: IntersectionObserver | undefined;
    const container = document.getElementById(widgetId);

    if (!container) return;

    const initializeBnovo = () => {
      container.innerHTML = bnovoCreditMarkup(widgetId);

      loadBnovoScript()
        .then(() => {
          if (isCancelled || initializedRef.current || !window.Bnovo_Widget) return;

          window.Bnovo_Widget.init(() => {
            if (isCancelled || initializedRef.current || !window.Bnovo_Widget) return;

            window.Bnovo_Widget.open(widgetId, getBnovoConfig(city, widgetLang));
            initializedRef.current = true;
          });
        })
        .catch(() => {
          if (!isCancelled) {
            container.innerHTML = '<p class="text-sm text-muted-foreground">Модуль бронирования временно недоступен.</p>';
          }
        });
    };

    const scheduleInitialization = () => {
      timeoutId = setTimeout(initializeBnovo, isHero ? 800 : 100);
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            observer?.disconnect();
            scheduleInitialization();
          }
        },
        { rootMargin: '240px 0px' }
      );
      observer.observe(container);
    } else {
      scheduleInitialization();
    }

    return () => {
      isCancelled = true;
      observer?.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
      container.innerHTML = '';
      initializedRef.current = false;
    };
  }, [city, isHero, widgetId, widgetLang]);

  return (
    <div
      id="booking"
      data-city={city}
      className={cn(
        'booking-shell rounded-[28px] p-3 md:p-5',
        isHero
          ? 'glass border border-white/20'
          : 'border border-accent/25 bg-gradient-to-br from-white via-background to-secondary/70 shadow-2xl shadow-primary/10',
        className
      )}
    >
      <div
        id={widgetId}
        className="relative flex min-h-[390px] items-start justify-center overflow-hidden rounded-[22px] bg-white/90 p-4 text-foreground ring-1 ring-border/70"
      />
    </div>
  );
}
