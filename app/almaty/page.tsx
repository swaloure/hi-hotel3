'use client';

import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { RoomsSection } from '@/components/rooms-section';
import { ContactSection } from '@/components/contact-section';
import { Footer } from '@/components/footer';
import { BookingWidget } from '@/components/booking-widget';

export default function AlmatyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header city="almaty" />
      <HeroSection city="almaty" />
      <AboutSection city="almaty" />
      <RoomsSection city="almaty" />
      
      {/* Mobile Booking Widget */}
      <section className="py-12 px-4 lg:hidden bg-secondary/30">
        <div className="max-w-xl mx-auto">
          <BookingWidget city="almaty" variant="standalone" />
        </div>
      </section>
      
      <ContactSection city="almaty" />
      <Footer city="almaty" />
    </main>
  );
}
