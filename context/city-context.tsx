'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type City = 'almaty' | 'astana' | null;

interface CityContextType {
  currentCity: City;
  setCurrentCity: (city: City) => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export function CityProvider({ children }: { children: ReactNode }) {
  const [currentCity, setCurrentCity] = useState<City>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hihotel-city') as City;
    if (stored) {
      setCurrentCity(stored);
    }
  }, []);

  const handleSetCity = (city: City) => {
    setCurrentCity(city);
    if (city) {
      localStorage.setItem('hihotel-city', city);
    } else {
      localStorage.removeItem('hihotel-city');
    }
  };

  return (
    <CityContext.Provider value={{ currentCity, setCurrentCity: handleSetCity }}>
      {children}
    </CityContext.Provider>
  );
}

export function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}
