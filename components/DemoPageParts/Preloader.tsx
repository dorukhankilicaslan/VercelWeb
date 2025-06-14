// components/Preloader.tsx
"use client";
import { useState, useEffect } from 'react';

interface PreloaderProps {
    isAppReady: boolean; // Uygulama hazır olduğunda ve preloader'ın animasyonla çıkması gerektiğinde true olur
}

export default function Preloader({ isAppReady }: PreloaderProps) {
    const [isVisible, setIsVisible] = useState(true); // DOM'da olup olmayacağını kontrol eder
    const [isAnimatingOut, setIsAnimatingOut] = useState(false); // Animasyon durumunu kontrol eder

    useEffect(() => {
        if (isAppReady) {
            setIsAnimatingOut(true); // "Açılma" animasyonunu başlat
            // Animasyondan sonra DOM'dan kaldır
            const animationDuration = 500; // ms, CSS ile eşleşmeli
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, animationDuration);
            return () => clearTimeout(timer);
        }
    }, [isAppReady]);

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`
        fixed inset-0 z-[10000] flex flex-col items-center justify-center
        bg-[var(--background)]
        transition-transform duration-500 ease-in-out
        transform-origin-top
        ${isAnimatingOut ? 'scale-x-0' : 'scale-x-100'}
      `}
        >
            {/* Preloader tam ekran iken görünecek spinner veya logo */}
            {!isAnimatingOut && (
                <>
                    {/* Örnek bir logo veya metin ekleyebilirsiniz */}
                    {/* <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">SİTENİZ</h1> */}
                    <div className="w-16 h-16 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    {/* <p className="mt-4 text-lg text-[var(--foreground)]">Yükleniyor...!</p> */}
                </>
            )}
        </div>
    );
}
