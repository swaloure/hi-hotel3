import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Montserrat } from 'next/font/google'
import { Providers } from '@/components/providers'
import { withBasePath } from '@/lib/asset-path'
import './globals.css'

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
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
  openGraph: {
    title: 'MAZA — Уютные мини-отели в Алматы и Астане',
    description: 'Спокойные городские отели с чистыми номерами, удобным расположением и понятным сервисом.',
    type: 'website',
    locale: 'ru_KZ',
    siteName: 'MAZA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAZA — Уютные мини-отели',
    description: 'Спокойные городские отели в Алматы и Астане без лишнего пафоса.',
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
    <html lang="ru" className={`${geistMono.variable} ${montserrat.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
