import type { Hotel } from '@/lib/data/hotels';
import type { SiteLanguage } from '@/lib/i18n/language';

type WhatsAppHotel = Pick<Hotel, 'city' | 'whatsapp'>;

const cityLocations = {
  almaty: { ru: 'городе Алматы', kz: 'Алматы', en: 'Almaty' },
  astana: { ru: 'городе Астане', kz: 'Астана', en: 'Astana' },
} as const;

export function getWhatsAppBookingMessage(city: Hotel['city'], language: SiteLanguage): string {
  const cityLocation = cityLocations[city][language];

  if (language === 'kz') {
    return `Сәлеметсіз бе! MAZA сайтынан жазып отырмын. ${cityLocation} қаласында бөлме брондағым келеді.`;
  }

  if (language === 'en') {
    return `Hello! I'm contacting you through the MAZA website. I'd like to book a room in ${cityLocation}.`;
  }

  return `Здравствуйте! Пишу с сайта MAZA. Хочу забронировать номер в ${cityLocation}.`;
}

export function getWhatsAppBookingUrl(hotel: WhatsAppHotel, language: SiteLanguage): string {
  const phone = hotel.whatsapp.replace(/\D/g, '');
  const message = getWhatsAppBookingMessage(hotel.city, language);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
