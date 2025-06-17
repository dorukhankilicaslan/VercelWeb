// app/CV2/components/ThemeSwitcher.tsx
"use client";

import { useState } from "react";
import { FaPalette } from "react-icons/fa";
// ThemeProvider'dan useTheme hook'unu ve ThemeColors, ThemeName tiplerini import ediyoruz
import { useTheme, ThemeColors, ThemeName } from "@/app/ThemeProvider";

export default function ThemeSwitcher() {
  // useTheme() hook'u artık doğru tipi döndürecektir, bu yüzden 'as' anahtar kelimesine gerek kalmadı.
  const { setAppTheme, themeData } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menünün açık/kapalı durumu için state

  // Her bir tema renk örneği için render edilecek bileşen
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
    <div
      className="fixed top-6  right-8 z-50 group" // fixed positioning and group for hover
      onMouseEnter={() => setIsMenuOpen(true)} // Fare üzerine gelince menüyü aç
      onMouseLeave={() => setIsMenuOpen(false)} // Fare ayrılınca menüyü kapat
    >
      {/* Tema Değiştirme Butonu */}
      <button
        className={`relative h-12 w-12 rounded-full transition-all duration-300 
                    hover:min-w-40 bg-[var(--foreground)]/10 
                    hover:bg-[var(--primary)]
                    flex items-center justify-center cursor-pointer overflow-hidden`}
      >
        {/* Buton genişleyince görünecek metin */}
        <div
          className="absolute left-0 w-full flex justify-center 
                     opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-150"
        >
          <span
            className="whitespace-nowrap"
            style={{
              marginRight: "1.5rem", // Palet ikonuna yer açmak için
              fontWeight: 600,
              color: "var(--foreground)", // Metin rengini temadan al
              fontFamily: "Poppins",
            }}
          >
            Temalar
          </span>
        </div>

        <div className="absolute right-3 flex items-center justify-center h-full w-auto text-[var(--foreground)]">
          <FaPalette size={24} />
        </div>
      </button>

      {/* Tema Seçenekleri Menüsü */}
      {isMenuOpen && (
        <div
          className="absolute top-full right-0 p-2 rounded-b-md shadow-lg 
                     bg-[var(--background)] border border-[var(--border)] border-t-0
                     flex flex-col gap-2 w-40"
        >
          {/* themeData'nın null/undefined olup olmadığını kontrol ediyoruz, defensive coding için || {} kullanmaya devam edebiliriz */}
          {Object.keys(themeData || {}).map((themeName: string) => {
            // themeData[themeName] artık doğrudan ThemeColors tipindedir
            const theme: ThemeColors = themeData![themeName]; // ! operatörü ile null/undefined olmadığını garanti ediyoruz

            return (
              <button
                key={themeName}
                onClick={() => {
                  setAppTheme(themeName as ThemeName); // Temayı değiştir
                  setIsMenuOpen(false); // Menüyü kapat
                }}
                className="w-full text-left p-2 rounded-md hover:bg-[var(--active-bg)] 
                           transition-colors duration-200 flex items-center gap-2"
              >
                {/* Tema Adı */}
                <span className="text-sm text-[var(--foreground)] whitespace-nowrap capitalize">
                  {themeName
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
            );
          })}
        </div>
      )}
    </div>
  );
}
