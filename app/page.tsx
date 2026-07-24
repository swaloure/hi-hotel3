import { CitySelector } from '@/components/city-selector';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background font-home">
      <Header city="home" />
      <CitySelector />
      <Footer city="home" />
    </main>
  );
}
