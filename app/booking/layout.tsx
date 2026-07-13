import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Бронирование — Hi Hotel',
  description: 'Выберите город, даты проживания и забронируйте номер в Hi Hotel.',
};

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
