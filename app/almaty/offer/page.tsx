import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Публичная оферта Алматы — MAZA',
};

export default function AlmatyOfferPage() {
  return <LegalPage city="almaty" kind="offer" />;
}
