import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono, Montserrat, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Providers } from '@/components/providers'
import { withBasePath } from '@/lib/asset-path'
import './globals.css'

const geist = Geist({ 
  subsets: ["latin"],
  variable: '--font-geist'
});

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

const playfair = Playfair_Display({ 
  subsets: ["latin", "cyrillic"],
  variable: '--font-playfair'
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: '--font-montserrat'
});

export const metadata: Metadata = {
  title: 'MAZA — Уютные мини-отели в Алматы и Астане',
  description: 'MAZA — сеть уютных городских отелей в Казахстане. Комфортные номера, удобное расположение и понятный сервис в Алматы и Астане.',
  keywords: ['отель', 'мини-отель', 'Алматы', 'Астана', 'бронирование', 'hotel', 'Kazakhstan'],
  authors: [{ name: 'MAZA' }],
  generator: 'v0.app',
  openGraph: {
    title: 'MAZA — Уютные мини-отели в Алматы и Астане',
    description: 'Премиальные мини-отели с комфортными номерами и безупречным сервисом',
    type: 'website',
    locale: 'ru_KZ',
    siteName: 'MAZA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAZA — Уютные мини-отели',
    description: 'Премиальные мини-отели с комфортными номерами',
  },
  icons: {
    icon: {
      url: withBasePath('/logofinal.svg'),
      type: 'image/svg+xml',
    },
    shortcut: withBasePath('/logofinal.svg'),
    apple: withBasePath('/logofinal.svg'),
  },
}

export const viewport: Viewport = {
  themeColor: '#c9a86c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${geist.variable} ${geistMono.variable} ${playfair.variable} ${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
