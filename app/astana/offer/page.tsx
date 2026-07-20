import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Публичная оферта Астана — MAZA',
};

export default function AstanaOfferPage() {
  return <LegalPage city="astana" kind="offer" />;
}
