import type { Metadata } from 'next';
import { LegalPage } from '@/components/legal-page';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности Алматы — MAZA',
};

export default function AlmatyPrivacyPage() {
  return <LegalPage city="almaty" kind="privacy" />;
}
