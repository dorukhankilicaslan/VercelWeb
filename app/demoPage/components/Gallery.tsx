// @/components/DemoPageParts/Gallery.tsx

import React, { useEffect, useRef, useState } from "react";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import type PhotoSwipeLightboxType from "photoswipe/lightbox";
import GalleryItem from "./GalleryItem";

interface ImageItem {
  src: string;
  thumbnailSrc: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}

interface GalleryProps {
  initialImages: Omit<ImageItem, "width" | "height">[];
  galleryId: string;
}

const Gallery: React.FC<GalleryProps> = ({ initialImages, galleryId }) => {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isGalleryReady, setIsGalleryReady] = useState(false);
  const lightboxRef = useRef<PhotoSwipeLightboxType | null>(null);

  useEffect(() => {
    const loadImagesWithDimensions = async () => {
      const promises = initialImages.map((item) => {
        return new Promise<ImageItem>((resolve) => {
          const img = new Image();
          img.onload = () => {
            resolve({
              ...item,
              width: img.naturalWidth,
              height: img.naturalHeight,
            });
          };
          img.onerror = () => {
            console.error(`Failed to load image: ${item.src}`);
            resolve({ ...item, width: 800, height: 600 });
          };
          img.src = item.src;
        });
      });

      const loadedImages = await Promise.all(promises);
      setImages(loadedImages);
      setIsGalleryReady(true);
    };

    if (typeof window !== "undefined" && initialImages.length > 0) {
      loadImagesWithDimensions();
    } else {
      setImages([]);
      setIsGalleryReady(false);
    }
  }, [initialImages]);

  useEffect(() => {
    if (typeof window === "undefined" || !isGalleryReady) return;

    let currentLightbox: PhotoSwipeLightboxType | null = null;

    import("photoswipe").then((module) => {
      const PhotoSwipe = module.default;

      currentLightbox = new PhotoSwipeLightbox({
        gallery: `#${galleryId}`,
        children: "a",
        pswpModule: PhotoSwipe, // BU ÇOK ÖNEMLİ
        secondaryZoomLevel: 1,
        maxZoomLevel: 3,
      });

      currentLightbox.init();
      lightboxRef.current = currentLightbox;
    });

    return () => {
      currentLightbox?.destroy();
    };
  }, [isGalleryReady, galleryId]);

  const handleItemClick = (index: number) => {
    const pswpItems = images.map((item) => ({
      src: item.src,
      width: item.width || 800,
      height: item.height || 600,
      caption: item.caption,
    }));

    lightboxRef.current?.loadAndOpen(index, pswpItems);
  };

  return (
    <>
      {isGalleryReady ? (
        <div
          id={galleryId}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {images.map((image, index) => (
            <GalleryItem
              key={index}
              index={index}
              onClick={handleItemClick}
              {...image}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-[var(--foreground)] mt-10">
          Resimler yükleniyor...
        </div>
      )}
    </>
  );
};

export default Gallery;
