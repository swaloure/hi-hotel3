import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Бронирование — MAZA',
  description: 'Выберите город, даты проживания и забронируйте номер в MAZA.',
};

export default function BookingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
