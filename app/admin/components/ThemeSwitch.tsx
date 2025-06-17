// adminPage/ThemeSwitcherButton.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react"; // lucide-react veya Heroicons kullanabilirsin
// Ana ThemeProvider'dan useTheme hook'unu ve ThemeName, ThemeColors tiplerini import ediyoruz
import { useTheme, ThemeName } from "@/app/ThemeProvider";

const ThemeSwitcherButton = () => {
  // useTheme hook'undan gerekli değerleri alıyoruz
  const {
    currentTheme, // Şu anki aktif tema
    setAppTheme, // Tema değiştirmek için fonksiyon
    themeData, // Tüm tema verileri (themes.json'dan gelen)
  } = useTheme();

  const [open, setOpen] = useState(false); // Menünün açık/kapalı durumu için state
  const dropdownRef = useRef<HTMLDivElement>(null); // Dış tıklamaları algılamak için ref

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Tema değişikliğini yöneten fonksiyon
  const handleThemeChange = (newTheme: ThemeName) => {
    setAppTheme(newTheme); // Tema değişikliğini merkezi sağlayıcıya gönder
    setOpen(false); // Menüyü kapat
  };

  const DiagonalColorPreview = ({
    background,
    foreground,
    primary,
  }: {
    background: string;
    foreground: string;
    primary: string;
  }) => {
    return (
      <div className="flex w-full h-5 rounded-sm overflow-hidden relative">
        {/* Background Color Segment */}
        <div
          className="relative flex-1 h-full"
          style={{ backgroundColor: background }}
        >
          {/* Diagonal separator (covers part of the next segment) */}
          <div
            className="absolute top-0 right-0 w-3 h-full transform origin-bottom-right skew-x-12"
            style={{ backgroundColor: foreground, zIndex: 1 }}
          ></div>
        </div>

        {/* Foreground Color Segment */}
        <div
          className="relative flex-1 h-full"
          style={{ backgroundColor: foreground }}
        >
          {/* Diagonal separator (covers part of the next segment) */}
          <div
            className="absolute top-0 right-0 w-3 h-full transform origin-bottom-right skew-x-12"
            style={{ backgroundColor: primary, zIndex: 1 }}
          ></div>
        </div>

        {/* Primary Color Segment */}
        <div
          className="flex-1 h-full"
          style={{ backgroundColor: primary }}
        ></div>
      </div>
    );
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition"
      >
        {/* Mevcut temayı temsil eden bir simge veya metin */}
        {currentTheme.charAt(0).toUpperCase() + currentTheme.slice(1)}
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-[var(--background)] border border-[var(--border)] z-50">
          <ul className="py-1">
            {/* themeData'nın null/undefined olup olmadığını kontrol et */}
            {Object.keys(themeData || {}).map((t) => {
              const theme = themeData![t as ThemeName]; // Tip güvenliği için `!` ve `as ThemeName`

              if (!theme) return null; // Tema objesi yoksa atla

              return (
                <li key={t}>
                  <button
                    onClick={() => handleThemeChange(t as ThemeName)}
                    className={`w-full text-left px-4 py-2 hover:bg-[var(--active-bg)] text-[var(--foreground)] ${
                      currentTheme === t ? "font-semibold" : ""
                    }`}
                  >
                    <span className="capitalize">
                      {t
                        .replace("darkBlue", "Koyu Mavi")
                        .replace("dark", "Koyu")
                        .replace("light", "Açık")}
                    </span>
                    {/* Renk Önizlemesi */}
                    <div className="ml-auto w-16">
                      <DiagonalColorPreview
                        background={theme["--background"]}
                        foreground={theme["--foreground"]}
                        primary={theme["--primary"]}
                      />
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcherButton;
