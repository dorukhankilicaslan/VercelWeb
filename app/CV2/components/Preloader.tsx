"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

interface PreloaderProps {
  isAppReady: boolean;
}

export default function Preloader({ isAppReady }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // animasyon süresi
      return () => clearTimeout(timer);
    }
  }, [isAppReady]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-transparent flex items-center justify-center overflow-hidden">
      {/* Sol perde */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 bg-gray-950 z-10 transition-transform duration-1000 ease-in-out ${
          isAnimatingOut ? "-translate-x-full" : "translate-x-0"
        }`}
      />
      {/* Sağ perde */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 bg-gray-950 z-10 transition-transform duration-1000 ease-in-out ${
          isAnimatingOut ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {/* Merkezde logo */}
      <div
        className={`z-20 transition-opacity duration-500 ${
          isAnimatingOut ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
      >
        <div className="w-24 h-24 animate-spin-slow relative">
          <div
            className="absolute inset-0 rounded-full border-4 border-white border-dashed 
          animate-[spin_10s_linear_infinite]"
          ></div>
          <Image
            src="/DK_LogoWhite.png"
            alt="Logo"
            style={{ width: "100%", height: "100%" }}
            width={64}
            height={64}
            className="absolute inset-0 m-auto"
            priority={true}
          />
        </div>
      </div>
    </div>
  );
}
