'use client';

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { RoomsSection } from '@/components/rooms-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';

export default function AlmatyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header city="almaty" />
      <HeroSection city="almaty" />
      <AboutSection city="almaty" />
      <RoomsSection city="almaty" />
      <ContactSection city="almaty" />
      <Footer city="almaty" />
    </main>
  );
}
