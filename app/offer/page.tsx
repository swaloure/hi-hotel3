import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Публичная оферта — Hi Hotel',
};

export default function OfferPage() {
  return <LegalPage kind="offer" />;
}
