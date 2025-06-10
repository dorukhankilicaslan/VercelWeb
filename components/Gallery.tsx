// src/components/Gallery.tsx

import React, { useEffect, useRef } from 'react'; // useState kaldırıldı
import dynamic from 'next/dynamic';
// ProjectDetailsPanel ve ReactDOMServer import'ları kaldırıldı

import GalleryItem from './GalleryItem';

// Justified Gallery Wrapper'ı
const DynamicJustifiedGalleryWrapper = dynamic(
    () => import('./JustifiedGalleryWrapper'),
    { ssr: false }
);

// ImageItem arayüzünü basitleştirdik
interface ImageItem {
    src: string;
    thumbnailSrc: string;
    alt: string;
    caption: string;
    dataSize: string; // "genişlikxyükseklik" formatında
}

const Gallery: React.FC = () => {
    const lightboxRef = useRef<any>(null);

    const images: ImageItem[] = [
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/3_bytrzt.jpg",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/3_bytrzt.jpg",
            alt: "Mistery Prague",
            caption: "Mistery Prague",
            dataSize: "1920x1440",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/2_unrngc.jpg",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/2_unrngc.jpg",
            alt: "Second Image",
            caption: "A beautiful landscape",
            dataSize: "1200x800",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_OnKapakTest2_s0yyqi.jpg",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_OnKapakTest2_s0yyqi.jpg",
            alt: "Third Image",
            caption: "City lights",
            dataSize: "1000x750",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_ArkaKapak_ke3bvq.jpg",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_ArkaKapak_ke3bvq.jpg",
            alt: "Arka Kapak",
            caption: "Book Back Cover",
            dataSize: "1000x750",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088556/1_Magnet_us2k6a.jpg",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088556/1_Magnet_us2k6a.jpg",
            alt: "Magnet",
            caption: "Promotional Magnet",
            dataSize: "1000x750",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080954/RollupRender_y6g1wb.png",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080954/RollupRender_y6g1wb.png",
            alt: "Rollup Banner",
            caption: "Exhibition Rollup",
            dataSize: "1000x750",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/KartvizitRender_xudxkp.png",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/KartvizitRender_xudxkp.png",
            alt: "Business Card",
            caption: "Business Card Design",
            dataSize: "1000x750",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/UsbBoxRender_ayj3tw.png",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/UsbBoxRender_ayj3tw.png",
            alt: "USB Box",
            caption: "Custom USB Box",
            dataSize: "1000x750",
        },
        {
            src: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080945/MagnetRender_ihkr4j.png",
            thumbnailSrc: "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080945/MagnetRender_ihkr4j.png",
            alt: "Another Magnet",
            caption: "Another Promotional Magnet",
            dataSize: "1000x750",
        }
    ];

    const galleryOptions: JustifiedGallery.Settings = {
        rowHeight: 200,
        margins: 20,
        lastRow: 'nojustify',
        captions: false,
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('photoswipe/lightbox').then(module => {
                const PhotoSwipeLightbox = module.default;
                // Gallery.tsx useEffect içinde
                const lightbox = new PhotoSwipeLightbox({
                    // ... diğer ayarlar
                    initialZoomLevel: 'fit', // Resmin viewport'a sığdırılmasını sağlar
                    secondaryZoomLevel: 'original', // Çift tıklamada orijinal boyutuna zoom yapar
                    maxZoomLevel: 3, // Maksimum 3 kat zoom
                    // ...
                });

                lightbox.init();
                lightboxRef.current = lightbox;

            }).catch(error => {
                console.error("PhotoSwipeLightbox import or initialization failed:", error);
            });

            return () => {
                if (lightboxRef.current) {
                    lightboxRef.current.destroy();
                    lightboxRef.current = null;
                }
            };
        }
    }, []); // Bağımlılık dizisi boş bırakılabilir

    const handleItemClick = (index: number) => {
        // PhotoSwipe'a tüm resim öğelerini gönderiyoruz
        const pswpItems = images.map(item => {
            const [width, height] = item.dataSize.split('x').map(Number);
            return {
                src: item.src,
                width: width,
                height: height,
                caption: item.caption, // PhotoSwipe'ın kendi altyazısını kullan
            };
        });

        // PhotoSwipe'ı tıklanan öğenin indeksiyle açıyoruz
        if (lightboxRef.current) {
            lightboxRef.current.loadAndOpen(index, pswpItems);
        } else {
            console.warn("PhotoSwipeLightbox instance not found in lightboxRef.current. Cannot open.");
        }
    };

    return (
        <>
            {/* Görünüm seçim butonları kaldırıldı */}

            <DynamicJustifiedGalleryWrapper options={galleryOptions} id="portfolioGallery" className="p-4">
                {images.map((image, index) => (
                    <GalleryItem
                        key={index}
                        index={index}
                        onClick={handleItemClick}
                        src={image.src}
                        thumbnailSrc={image.src}
                        alt={image.alt}
                        caption={image.caption}
                        dataSize={image.dataSize}
                    />
                ))}
            </DynamicJustifiedGalleryWrapper>
        </>
    );
};

export default Gallery;