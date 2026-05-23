'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Menu, 
  X, 
  Phone, 
  Globe, 
  ChevronDown,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getHotelByCity } from '@/lib/data/hotels';

const languages = [
  { code: 'ru', label: 'RU', name: 'Русский' },
  { code: 'kz', label: 'KZ', name: 'Қазақша' },
  { code: 'en', label: 'EN', name: 'English' },
];

interface HeaderProps {
  city: 'almaty' | 'astana';
}

export function Header({ city }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const hotel = getHotelByCity(city);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${city}`, label: t('nav.home') },
    { href: `/${city}#rooms`, label: t('nav.rooms') },
    { href: `/${city}#about`, label: t('nav.about') },
    { href: `/${city}#contacts`, label: t('nav.contacts') },
  ];

  const otherCity = city === 'almaty' ? 'astana' : 'almaty';

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <span className={`text-2xl font-light tracking-tight transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}>
                Hi Hotel
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm uppercase tracking-widest transition-colors hover:text-accent ${
                    isScrolled ? 'text-foreground/80' : 'text-white/90'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* City Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`gap-2 ${isScrolled ? 'text-foreground' : 'text-white hover:bg-white/10'}`}
                  >
                    <MapPin className="w-4 h-4" />
                    {t(`cities.${city}`)}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/${otherCity}`} className="cursor-pointer">
                      {t(`cities.${otherCity}`)}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`gap-2 ${isScrolled ? 'text-foreground' : 'text-white hover:bg-white/10'}`}
                  >
                    <Globe className="w-4 h-4" />
                    {languages.find(l => l.code === i18n.language)?.label || 'RU'}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem 
                      key={lang.code}
                      onClick={() => i18n.changeLanguage(lang.code)}
                      className="cursor-pointer"
                    >
                      <span className="font-medium mr-2">{lang.label}</span>
                      <span className="text-muted-foreground">{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Phone */}
              {hotel && (
                <a 
                  href={`tel:${hotel.phone.replace(/[^+\d]/g, '')}`}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    isScrolled ? 'text-foreground/80' : 'text-white/90'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  {hotel.phone}
                </a>
              )}

              {/* CTA */}
              <Button 
                asChild
                className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full px-6"
              >
                <Link href={`/${city}#booking`}>
                  {t('nav.book')}
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-background z-50 lg:hidden shadow-2xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <span className="text-xl font-light">Hi Hotel</span>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2"
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 py-8 px-6">
                  <ul className="space-y-6">
                    {navItems.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg font-light text-foreground/80 hover:text-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 pt-10 border-t border-border space-y-6">
                    {/* City Switch */}
                    <Link
                      href={`/${otherCity}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      <span>{t(`cities.${otherCity}`)}</span>
                    </Link>

                    {/* Languages */}
                    <div className="flex gap-4">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => i18n.changeLanguage(lang.code)}
                          className={`text-sm font-medium transition-colors ${
                            i18n.language === lang.code 
                              ? 'text-accent' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>

                    {/* Phone */}
                    {hotel && (
                      <a 
                        href={`tel:${hotel.phone.replace(/[^+\d]/g, '')}`}
                        className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Phone className="w-5 h-5" />
                        {hotel.phone}
                      </a>
                    )}
                  </div>
                </nav>

                <div className="p-6 border-t border-border">
                  <Button 
                    asChild 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground rounded-full"
                  >
                    <Link 
                      href={`/${city}#booking`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.book')}
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
