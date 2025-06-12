// src/components/JustifiedGalleryWrapper.tsx (next/dynamic ile düzeltilmiş)

import React, { useEffect, useRef, ReactNode } from 'react';
// const $ = require('jquery'); // Artık global import yapmamıza gerek yok
// require('justifiedGallery'); // Çünkü bunlar sadece client tarafında yüklenecek

interface JustifiedGalleryWrapperProps {
    children: ReactNode;
    options?: JustifiedGallery.Settings;
    className?: string;
    id?: string;
}

const JustifiedGalleryWrapper: React.FC<JustifiedGalleryWrapperProps> = ({
    children,
    options,
    className,
    id = "justified_gallery",
}) => {
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Bu useEffect sadece client tarafında çalışır
        // Burada jQuery ve Justified Gallery'yi import ediyoruz
        // Bu şekilde, kodun sunucu tarafında çalışması engellenir
        const $ = require('jquery');
        require('justifiedGallery'); // Bu, jQuery objesine justifiedGallery metodunu ekler

        if (galleryRef.current) {
            // Justified Gallery'yi başlat
            if (typeof $.fn.justifiedGallery === 'function') {
                $(galleryRef.current).justifiedGallery(options);
            } else {
                console.error("Justified Gallery is not properly attached to jQuery. This might be due to incorrect import order or environment.");
            }
        }

        // Temizleme fonksiyonu
        return () => {
            if (galleryRef.current && $(galleryRef.current).data('justifiedGallery')) {
                $(galleryRef.current).justifiedGallery('destroy');
            }
        };
    }, [options, children]); // children ve options değiştiğinde yeniden çalıştır

    return (
        <div
            id={id}
            className={`justified-gallery ${className || ''}`}
            ref={galleryRef}
        >
            {children}
        </div>
    );
};

export default JustifiedGalleryWrapper;