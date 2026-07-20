import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности Астана — MAZA',
};

export default function AstanaPrivacyPage() {
  return <LegalPage city="astana" kind="privacy" />;
}
