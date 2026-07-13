import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { RoomsSection } from '@/components/rooms-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'MAZA Астана — номера и бронирование',
  description: 'MAZA в Астане: номера, удобства, контакты и онлайн-бронирование.',
};

export default function AstanaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header city="astana" />
      <HeroSection city="astana" />
      <RoomsSection city="astana" />
      <AboutSection city="astana" />
      <ContactSection city="astana" />
      <Footer city="astana" />
    </main>
  );
}
