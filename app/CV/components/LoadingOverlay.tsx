"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingOverlay() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1.5 saniye sonra loading kalkar

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-[var(--background)] z-50 flex items-center justify-center transition-opacity duration-300">
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Dönen daire */}
        <div className="absolute inset-0 border-4 border-[var(--foreground)] border-t-transparent rounded-full animate-spin" />

        {/* Ortadaki logo */}
        <Image
          src="/DK_LogoWhite.png"
          alt="Logo"
          className="w-14 h-14 object-contain z-10"
          width={100}
          height={100}
          priority={true}
        />
      </div>
    </div>
  );
}
