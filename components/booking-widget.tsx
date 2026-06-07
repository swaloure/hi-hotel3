'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface BookingWidgetProps {
  city: 'almaty' | 'astana';
  variant?: 'hero' | 'standalone';
  className?: string;
}

type BookingIframeConstructor = new (config: {
  html_id: string;
  uid: string;
  lang: string;
  width: string;
  height: string;
  rooms: string;
  IsMobile: string;
  scroll_to_rooms: string;
  fixed_header_selector: string;
  fixed_mobile_header_width: number;
  fixed_mobile_header_selector: string;
  fixed_footer_selector: string;
  fixed_mobile_footer_width: number;
  fixed_mobile_footer_selector: string;
}) => { init: () => void };

declare global {
  interface Window {
    BookingIframe?: BookingIframeConstructor;
  }
}

const BNOVO_UID = 'a8395a9c-768d-4038-ae49-cf4072d9dcb4';
const BNOVO_SCRIPT_SRC = 'https://widget.reservationsteps.ru/iframe/library/dist/booking_iframe.js';

let bnovoScriptPromise: Promise<void> | null = null;

function loadBnovoScript() {
  if (window.BookingIframe) {
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

function bnovoCreditMarkup(widgetId: string) {
  return `
    <div id="${widgetId}_credit" style="font-family: 'Proxima nova', 'Helvetica Neue', 'Cera Pro Medium', Arial, Helvetica, sans-serif; position: absolute; right: 0; bottom: 0; font-size: 12px; line-height: 1em; opacity: .5; z-index: 10; margin-top: 10px;">
      <div style="color: #1403fc!important; background: rgba(0, 0, 0, 0)!important;">
        <a style="color: #808080!important; background: #fff!important;" href="https://bnovo.ru/bnovo-mb/?utm_source=client_modul_br" id="${widgetId}_link" target="_blank" rel="noopener noreferrer">Система управления отелем Bnovo ©</a>
      </div>
    </div>
  `;
}

export function BookingWidget({ city, variant = 'standalone', className }: BookingWidgetProps) {
  const { i18n } = useTranslation();
  const initializedRef = useRef(false);
  const isHero = variant === 'hero';
  const widgetId = useMemo(() => `booking_iframe_${city}_${variant}`, [city, variant]);
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
          if (isCancelled || initializedRef.current || !window.BookingIframe) return;

          const bookingFrame = new window.BookingIframe({
            html_id: widgetId,
            uid: BNOVO_UID,
            lang: widgetLang,
            width: 'auto',
            height: 'auto',
            rooms: '',
            IsMobile: isHero ? '0' : '1',
            scroll_to_rooms: '0',
            fixed_header_selector: '',
            fixed_mobile_header_width: 800,
            fixed_mobile_header_selector: '',
            fixed_footer_selector: '',
            fixed_mobile_footer_width: 800,
            fixed_mobile_footer_selector: '',
          });

          bookingFrame.init();
          initializedRef.current = true;
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
  }, [isHero, widgetId, widgetLang]);

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
        className="relative min-h-[320px] overflow-hidden rounded-[22px] bg-white/85 pb-8 text-foreground ring-1 ring-border/70"
      />
    </div>
  );
}
