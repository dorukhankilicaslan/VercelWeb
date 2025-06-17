// app/GlobalLoadingOverlay.tsx
"use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function GlobalLoadingOverlay() {
  const { isThemeLoaded } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const animaion_duration = 500;

  useEffect(() => {
    if (isThemeLoaded) {
      setIsFadingOut(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, animaion_duration);

      return () => clearTimeout(timer);
    }
  }, [isThemeLoaded]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center
                  bg-white dark:bg-black transition-opacity duration-${animaion_duration} ease-out
                  ${isFadingOut ? "opacity-0" : "opacity-100"}`}
    >
      <span className="text-3xl font-bold text-gray-800 dark:text-gray-200"></span>
    </div>
  );
}
