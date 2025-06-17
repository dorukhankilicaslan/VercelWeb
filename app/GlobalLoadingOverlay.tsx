// app/GlobalLoadingOverlay.tsx
"use client"; // Bu bileşenin istemci tarafında çalıştığından emin olmak için

import React, { useEffect, useState } from "react";
import { useTheme } from "@/app/ThemeProvider"; // ThemeProvider'dan useTheme hook'unu import edin

const GlobalLoadingOverlay: React.FC = () => {
  const { isThemeLoaded } = useTheme(); // ThemeProvider'dan tema yükleme durumunu alıyoruz
  const [isVisible, setIsVisible] = useState(true); // Overlay'in başta görünür olmasını sağlar
  const [opacity, setOpacity] = useState(1); // Başta tam opak olmasını sağlar

  useEffect(() => {
    if (isThemeLoaded) {
      setOpacity(0);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isThemeLoaded]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black transition-opacity ease-in-out duration-500"
      style={{ opacity: opacity }}
    ></div>
  );
};

export default GlobalLoadingOverlay;
