export interface Room {
  id: string;
  type: 'standard' | 'superior' | 'deluxe' | 'suite';
  name: {
    ru: string;
    kz: string;
    en: string;
  };
  description: {
    ru: string;
    kz: string;
    en: string;
  };
  area: number;
  maxGuests: number;
  bedType: {
    ru: string;
    kz: string;
    en: string;
  };
  amenities: string[];
  price: number;
  images: string[];
}

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
  coordinates: {
    lat: number;
    lng: number;
  };
  heroImage: string;
  rooms: Room[];
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
    phone: '+7 (727) 123-45-67',
    email: 'almaty@maza.kz',
    whatsapp: '+77271234567',
    coordinates: {
      lat: 43.2342975,
      lng: 76.959896,
    },
    heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80',
    rooms: [
      {
        id: 'almaty-standard-1',
        type: 'standard',
        name: {
          ru: 'Стандарт',
          kz: 'Стандарт',
          en: 'Standard',
        },
        description: {
          ru: 'Уютный номер с современным интерьером, идеально подходит для деловых поездок или короткого отдыха.',
          kz: 'Заманауи интерьері бар жайлы бөлме, іссапарлар немесе қысқа демалыс үшін өте қолайлы.',
          en: 'Cozy room with modern interior, perfect for business trips or short stays.',
        },
        area: 22,
        maxGuests: 2,
        bedType: {
          ru: 'Двуспальная кровать',
          kz: 'Қос адамдық төсек',
          en: 'Double bed',
        },
        amenities: ['wifi', 'ac', 'tv', 'safe', 'hairdryer'],
        price: 25000,
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
        ],
      },
      {
        id: 'almaty-superior-1',
        type: 'superior',
        name: {
          ru: 'Супериор',
          kz: 'Супериор',
          en: 'Superior',
        },
        description: {
          ru: 'Просторный номер повышенной комфортности с панорамным видом на город и горы.',
          kz: 'Қала мен тауларға панорамалық көрінісі бар жоғары жайлылығы бар кең бөлме.',
          en: 'Spacious room with enhanced comfort and panoramic views of the city and mountains.',
        },
        area: 30,
        maxGuests: 2,
        bedType: {
          ru: 'Королевская кровать',
          kz: 'Патшалық төсек',
          en: 'King size bed',
        },
        amenities: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'hairdryer', 'bathrobe'],
        price: 35000,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
        ],
      },
      {
        id: 'almaty-deluxe-1',
        type: 'deluxe',
        name: {
          ru: 'Делюкс',
          kz: 'Делюкс',
          en: 'Deluxe',
        },
        description: {
          ru: 'Роскошный номер с отдельной гостиной зоной и премиальными удобствами для взыскательных гостей.',
          kz: 'Талғампаз қонақтар үшін жеке қонақ бөлмесі және премиум қолайлылықтары бар сәнді бөлме.',
          en: 'Luxurious room with separate living area and premium amenities for discerning guests.',
        },
        area: 42,
        maxGuests: 3,
        bedType: {
          ru: 'Королевская кровать + диван',
          kz: 'Патшалық төсек + диван',
          en: 'King size bed + sofa',
        },
        amenities: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'hairdryer', 'bathrobe', 'breakfast', 'roomService'],
        price: 50000,
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        ],
      },
      {
        id: 'almaty-suite-1',
        type: 'suite',
        name: {
          ru: 'Люкс',
          kz: 'Люкс',
          en: 'Suite',
        },
        description: {
          ru: 'Эксклюзивный двухкомнатный люкс с панорамными окнами и индивидуальным дизайном интерьера.',
          kz: 'Панорамалық терезелері және жеке интерьер дизайны бар эксклюзивті екі бөлмелі люкс.',
          en: 'Exclusive two-room suite with panoramic windows and custom interior design.',
        },
        area: 55,
        maxGuests: 4,
        bedType: {
          ru: 'Королевская кровать + раскладной диван',
          kz: 'Патшалық төсек + жиналмалы диван',
          en: 'King size bed + sofa bed',
        },
        amenities: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'hairdryer', 'bathrobe', 'breakfast', 'roomService', 'parking'],
        price: 75000,
        images: [
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        ],
      },
    ],
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
    phone: '+7 (717) 234-56-78',
    email: 'astana@maza.kz',
    whatsapp: '+77172345678',
    coordinates: {
      lat: 51.1087416,
      lng: 71.4289125,
    },
    heroImage: '/cities/astana-embankment.jpg',
    rooms: [
      {
        id: 'astana-standard-1',
        type: 'standard',
        name: {
          ru: 'Стандарт',
          kz: 'Стандарт',
          en: 'Standard',
        },
        description: {
          ru: 'Комфортабельный номер в современном стиле с видом на столицу.',
          kz: 'Астанаға көрінісі бар заманауи стильдегі жайлы бөлме.',
          en: 'Comfortable room in modern style with views of the capital.',
        },
        area: 24,
        maxGuests: 2,
        bedType: {
          ru: 'Двуспальная кровать',
          kz: 'Қос адамдық төсек',
          en: 'Double bed',
        },
        amenities: ['wifi', 'ac', 'tv', 'safe', 'hairdryer'],
        price: 28000,
        images: [
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        ],
      },
      {
        id: 'astana-superior-1',
        type: 'superior',
        name: {
          ru: 'Супериор',
          kz: 'Супериор',
          en: 'Superior',
        },
        description: {
          ru: 'Улучшенный номер с видом на Байтерек и левый берег столицы.',
          kz: 'Бәйтерек пен астананың сол жағалауына көрінісі бар жақсартылған бөлме.',
          en: 'Enhanced room with views of Baiterek and the left bank of the capital.',
        },
        area: 32,
        maxGuests: 2,
        bedType: {
          ru: 'Королевская кровать',
          kz: 'Патшалық төсек',
          en: 'King size bed',
        },
        amenities: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'hairdryer', 'bathrobe'],
        price: 38000,
        images: [
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
        ],
      },
      {
        id: 'astana-deluxe-1',
        type: 'deluxe',
        name: {
          ru: 'Делюкс',
          kz: 'Делюкс',
          en: 'Deluxe',
        },
        description: {
          ru: 'Премиальный номер с просторной гостиной и эксклюзивными удобствами.',
          kz: 'Кең қонақ бөлмесі және эксклюзивті қолайлылықтары бар премиум бөлме.',
          en: 'Premium room with spacious living area and exclusive amenities.',
        },
        area: 45,
        maxGuests: 3,
        bedType: {
          ru: 'Королевская кровать + диван',
          kz: 'Патшалық төсек + диван',
          en: 'King size bed + sofa',
        },
        amenities: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'hairdryer', 'bathrobe', 'breakfast', 'roomService'],
        price: 55000,
        images: [
          'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
          'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80',
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
        ],
      },
      {
        id: 'astana-suite-1',
        type: 'suite',
        name: {
          ru: 'Люкс',
          kz: 'Люкс',
          en: 'Suite',
        },
        description: {
          ru: 'Роскошный двухкомнатный люкс с панорамным видом на Астану.',
          kz: 'Нұр-Сұлтанға панорамалық көрінісі бар сәнді екі бөлмелі люкс.',
          en: 'Luxurious two-room suite with panoramic views of the capital.',
        },
        area: 60,
        maxGuests: 4,
        bedType: {
          ru: 'Королевская кровать + раскладной диван',
          kz: 'Патшалық төсек + жиналмалы диван',
          en: 'King size bed + sofa bed',
        },
        amenities: ['wifi', 'ac', 'tv', 'minibar', 'safe', 'hairdryer', 'bathrobe', 'breakfast', 'roomService', 'parking'],
        price: 85000,
        images: [
          'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80',
          'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80',
        ],
      },
    ],
  },
];

export const getHotelByCity = (city: 'almaty' | 'astana'): Hotel | undefined => {
  return hotels.find((h) => h.city === city);
};
