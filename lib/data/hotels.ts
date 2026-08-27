export interface Hotel {
  id: string;
  city: 'almaty' | 'astana';
  name: string;
  address: {
    ru: string;
    kz: string;
    en: string;
  };
  phone: string;
  email: string;
  whatsapp: string;
  instagram: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const hotels: Hotel[] = [
  {
    id: 'almaty',
    city: 'almaty',
    name: 'MAZA Almaty',
    address: {
      ru: 'проспект Достык 162к6, 050051',
      kz: 'Достық даңғылы 162к6, 050051',
      en: '162k6 Dostyk Avenue, Almaty 050051',
    },
    phone: '+7 747 470 0422',
    email: 'hihotel@mail.ru',
    whatsapp: '+77474700422',
    instagram: 'https://www.instagram.com/maza_almaty.kz/',
    coordinates: {
      lat: 43.2342975,
      lng: 76.959896,
    },
  },
  {
    id: 'astana',
    city: 'astana',
    name: 'MAZA Astana',
    address: {
      ru: 'Мангилик Ел 29/1, Z05M7E4',
      kz: 'Мәңгілік Ел 29/1, Z05M7E4',
      en: '29/1 Mangilik El Avenue, Astana Z05M7E4',
    },
    phone: '+7 707 470 0422',
    email: 'hihotel@mail.ru',
    whatsapp: '+77074700422',
    instagram: 'https://www.instagram.com/maza_astana.kz/',
    coordinates: {
      lat: 51.1087416,
      lng: 71.4289125,
    },
  },
];

export const getHotelByCity = (city: 'almaty' | 'astana'): Hotel | undefined => {
  return hotels.find((h) => h.city === city);
};
