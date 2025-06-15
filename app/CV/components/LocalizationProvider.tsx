"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

type Locale = "tr" | "en";
type DBJson = {
  about: Record<Locale, { description: string }>;
  experience: Record<Locale, { description: string }>;
  projects: Record<Locale, { description: string }>;
  // gerekirse diğer bölümler...
};

const LocalizationContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  db: DBJson | null;
}>({
  locale: "tr",
  setLocale: () => {},
  db: null,
});

export function LocalizationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>("tr");
  const [db, setDb] = useState<DBJson | null>(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then(setDb);
  }, []);

  return (
    <LocalizationContext.Provider value={{ locale, setLocale, db }}>
      {children}
    </LocalizationContext.Provider>
  );
}

export function useLocalization() {
  return useContext(LocalizationContext);
}
