// src/components/GalleryItem.tsx

import React, { useRef, useState, useEffect } from 'react';

interface GalleryItemProps {
    src: string;
    thumbnailSrc: string;
    alt: string;
    caption: string;
    dataSize: string;
    index: number;
    onClick: (index: number) => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
    src,
    thumbnailSrc,
    alt,
    caption,
    dataSize,
    index,
    onClick,
}) => {
    const itemRef = useRef<HTMLAnchorElement>(null);
    // Overlay div'ine erişmek için yeni bir ref ekliyoruz
    const overlayRef = useRef<HTMLDivElement>(null);

    const [overlayTransform, setOverlayTransform] = useState<string>('translate-x-full');
    const [isTransitionEnabled, setIsTransitionEnabled] = useState<boolean>(true);

    const exitAnimationTimer = useRef<NodeJS.Timeout | null>(null);

    const ANIMATION_DURATION = 500; // ms

    useEffect(() => {
        setOverlayTransform('translate-x-full');
        setIsTransitionEnabled(true);
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        onClick(index);
    };

    const getMouseDirection = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (!itemRef.current) {
            return '';
        }

        const { width, height, top, left } = itemRef.current.getBoundingClientRect();

        let x = e.pageX - left - (width / 2);
        let y = e.pageY - top - (height / 2);

        x = x * (width > height ? (height / width) : 1);
        y = y * (height > width ? (width / height) : 1);

        const angle = Math.atan2(y, x) * (180 / Math.PI);
        const threshold = 45;

        let direction = '';

        if (angle >= -threshold && angle < threshold) {
            direction = 'right';
        } else if (angle >= threshold && angle < (180 - threshold)) {
            direction = 'bottom';
        } else if (angle >= (180 - threshold) || angle < -(180 - threshold)) {
            direction = 'left';
        } else {
            direction = 'top';
        }

        return direction;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (exitAnimationTimer.current) {
            clearTimeout(exitAnimationTimer.current);
            exitAnimationTimer.current = null;
        }

        // Mouse enter olduğunda transitionend event listener'ı kaldırılsın
        if (overlayRef.current) {
            overlayRef.current.removeEventListener('transitionend', handleTransitionEnd);
        }

        const direction = getMouseDirection(e);
        let initialOverlayTransform = '';

        switch (direction) {
            case 'top':
                initialOverlayTransform = '-translate-y-full';
                break;
            case 'right':
                initialOverlayTransform = 'translate-x-full';
                break;
            case 'bottom':
                initialOverlayTransform = 'translate-y-full';
                break;
            case 'left':
                initialOverlayTransform = '-translate-x-full';
                break;
            default:
                initialOverlayTransform = 'translate-x-full';
                break;
        }

        setIsTransitionEnabled(false);
        setOverlayTransform(initialOverlayTransform);

        requestAnimationFrame(() => {
            // setOverlayTransform(initialOverlayTransform); // Bu satır gereksiz, yukarıda zaten ayarlandı

            setTimeout(() => {
                setIsTransitionEnabled(true);
                setOverlayTransform('translate-x-0 translate-y-0');
            }, 50);
        });
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (exitAnimationTimer.current) {
            clearTimeout(exitAnimationTimer.current);
            exitAnimationTimer.current = null;
        }

        const direction = getMouseDirection(e);
        let exitOverlayTransform = '';

        switch (direction) {
            case 'top':
                exitOverlayTransform = '-translate-y-full';
                break;
            case 'right':
                exitOverlayTransform = 'translate-x-full';
                break;
            case 'bottom':
                exitOverlayTransform = 'translate-y-full';
                break;
            case 'left':
                exitOverlayTransform = '-translate-x-full';
                break;
            default:
                exitOverlayTransform = 'translate-x-full';
                break;
        }

        setIsTransitionEnabled(true);
        setOverlayTransform(exitOverlayTransform);

        // Animasyon bittiğinde overlay'i başlangıç durumuna döndürmek için listener ekle
        if (overlayRef.current) {
            overlayRef.current.addEventListener('transitionend', handleTransitionEnd, { once: true });
        }
    };

    // Transition bittiğinde çağrılacak fonksiyon
    const handleTransitionEnd = () => {
        //console.log('Transition ended for overlay:', index);
        // Overlay'i başlangıç durumu olan 'translate-x-full' olarak ayarla
        // Ama bunu sadece eğer şu anki transform hala bir çıkış transformu ise yap.
        // Bu, hızlı giriş-çıkışlarda sorun yaşamamızı engeller.
        if (overlayTransform !== 'translate-x-0 translate-y-0') {
            // Geçişleri geçici olarak kapatıp pozisyonu sıfırla, sonra tekrar aç
            setIsTransitionEnabled(false);
            setOverlayTransform('translate-x-full');
            // Yeni bir frame'de transition'ı tekrar etkinleştir.
            requestAnimationFrame(() => {
                setIsTransitionEnabled(true);
            });
        }
    };


    return (
        <a
            ref={itemRef}
            className="relative block overflow-hidden group rounded-lg"
            href={src}
            data-size={dataSize}
            data-caption={caption}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <img
                decoding="async"
                src={thumbnailSrc}
                data-caption={caption}
                alt={alt}
                className="block w-full h-full object-cover"
            />

            <div
                ref={overlayRef}
                className={`absolute inset-0 ml-[-1px] bg-[var(--primary)] opacity-80 ${isTransitionEnabled ? `transition-all duration-${ANIMATION_DURATION}` : ''} ${overlayTransform} flex items-center justify-center`}
            >
                <span
                    className={`inline-block text-white text-lg font-semibold text-center p-4`}
                >
                    {caption}
                </span>
            </div>
        </a>
    );
};

export default GalleryItem;