// src/components/Gallery.tsx

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import GalleryItem from './GalleryItem';

const DynamicJustifiedGalleryWrapper = dynamic(
    () => import('./JustifiedGalleryWrapper'),
    { ssr: false }
);

interface ImageItem {
    src: string;
    thumbnailSrc: string;
    alt: string;
    caption: string;
    width?: number;
    height?: number;
}

interface GalleryProps {
    initialImages: Omit<ImageItem, 'width' | 'height'>[];
    galleryId: string; // Yeni prop: Galerinin benzersiz ID'si
}

const Gallery: React.FC<GalleryProps> = ({ initialImages, galleryId }) => { // galleryId'yi proplardan al
    const lightboxRef = useRef<any>(null);
    const [images, setImages] = useState<ImageItem[]>([]);
    const [isGalleryReady, setIsGalleryReady] = useState(false); // Galeri hazır bayrağı

    const galleryOptions: JustifiedGallery.Settings = {
        rowHeight: 200,
        margins: 20,
        lastRow: 'nojustify',
        captions: false,
    };

    // Resim boyutlarını yükleme efekti
    useEffect(() => {
        const loadImagesWithDimensions = async () => {
            const promises = initialImages.map(item => {
                return new Promise<ImageItem>((resolve) => {
                    const img = new (window as any).Image();
                    img.onload = () => {
                        resolve({
                            ...item,
                            width: img.naturalWidth,
                            height: img.naturalHeight,
                        });
                    };
                    img.onerror = () => {
                        console.error(`Failed to load image: ${item.src}. Using fallback dimensions.`);
                        resolve({ ...item, width: 800, height: 600 }); // Varsayılan değerler
                    };
                    img.src = item.src;
                });
            });

            const loadedImages = await Promise.all(promises);
            setImages(loadedImages);
            // Tüm resimler yüklendiğinde ve boyutlar belirlendiğinde Justified Gallery'nin yeniden düzenlenmesini tetikleyebiliriz.
            // Justified Gallery'nin bu duruma nasıl tepki verdiğini dokümantasyonundan kontrol edin.
            // Genellikle yeniden render edildiğinde veya bir metot çağrıldığında kendini günceller.
            // Eğer JustifiedGalleryWrapper bunu otomatik yapmıyorsa, manuel bir tetikleyici gerekebilir.
            // Şimdilik sadece PhotoSwipe için hazır olduğunu işaretliyoruz.
            setIsGalleryReady(true); // Resimler ve boyutlar hazır
        };

        if (typeof window !== 'undefined' && initialImages.length > 0) {
            loadImagesWithDimensions();
        } else if (initialImages.length === 0) {
            // Eğer hiç resim yoksa, yükleme durumunu sıfırla
            setImages([]);
            setIsGalleryReady(false);
        }
    }, [initialImages]);

    useEffect(() => {
        if (typeof window === 'undefined' || !isGalleryReady) {
            return;
        }

        let currentLightbox: any = null; // Use a local variable for immediate cleanup

        import('photoswipe/lightbox').then(module => {
            const PhotoSwipeLightbox = module.default;
            currentLightbox = new PhotoSwipeLightbox({ // Assign to local variable
                gallery: `#${galleryId}`,
                children: 'a',
                pswpModule: () => import('photoswipe').then(pswp => pswp.default),
                initialZoomLevel: 'fit',
                secondaryZoomLevel: 1,
                maxZoomLevel: 3,
                ui: {
                    caption: { display: 'block' },
                },
            });

            currentLightbox.init();
            lightboxRef.current = currentLightbox; // Assign to ref AFTER init

        }).catch(error => {
            console.error("PhotoSwipeLightbox import or initialization failed:", error);
        });

        return () => {
            // Ensure we destroy the specific instance created by THIS effect run
            if (currentLightbox) { // Use the local variable here
                console.log(`Destroying PhotoSwipeLightbox for galleryId: ${galleryId}`);
                currentLightbox.destroy();
                // No need to set lightboxRef.current = null here, as the next effect run will overwrite it
            }
        };
    }, [isGalleryReady, galleryId]);

    const handleItemClick = (index: number) => {
        const pswpItems = images.map(item => {
            // width ve height mutlaka Number olmalı ve NaN/undefined olmamalı
            const width = item.width || 800; // Varsayılan değer atama
            const height = item.height || 600; // Varsayılan değer atama
            return {
                src: item.src,
                width: width,
                height: height,
                caption: item.caption,
            };
        });

        if (lightboxRef.current) {
            lightboxRef.current.loadAndOpen(index, pswpItems);
        } else {
            console.warn("PhotoSwipeLightbox instance not found in lightboxRef.current. Cannot open.");
        }
    };

    return (
        <>
            {isGalleryReady ? ( // Galeri hazır olduğunda render et
                <DynamicJustifiedGalleryWrapper options={galleryOptions} id={galleryId}>
                    {images.map((image, index) => (
                        <GalleryItem
                            key={index}
                            index={index}
                            onClick={handleItemClick}
                            src={image.src}
                            thumbnailSrc={image.thumbnailSrc}
                            alt={image.alt}
                            caption={image.caption}
                        // Justified Gallery'nin de doğru boyutları kullanması için bu attributeleri ekleyebiliriz
                        // Eğer JustifiedGalleryWrapper bunları zaten render ediyorsa gereksiz olabilir.
                        // dataWidth={image.width} // Örnek
                        // dataHeight={image.height} // Örnek
                        />
                    ))}
                </DynamicJustifiedGalleryWrapper>
            ) : (
                <div className="text-center text-[var(--foreground)] mt-10">Resimler yükleniyor...</div>
            )}
        </>
    );
};

export default Gallery;