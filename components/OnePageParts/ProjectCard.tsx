import React from "react";
import Image from "next/image";

interface ProjectCardProps {
  gallery: string[]; // Tüm görseller (en az 1 olmalı)
  title: string;
  description: string;
  onGalleryClick?: (index: number) => void;
}

export default function ProjectCard({
  gallery,
  title,
  description,
  onGalleryClick,
}: ProjectCardProps) {
  const mainImage = gallery[0];
  const gallerySlots = gallery.slice(1, 7); // İlk görsel hariç 6 slot

  return (
    <div
      className={`
        bg-[var(--experience-background-hover)] border border-[var(--background)] shadow-2xl
        rounded-md p-0 mb-4 md:mb-8 relative z-0 overflow-hidden backdrop-blur-md
      `}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-[120px_1fr] 
      gap-0 items-start p-4 sm:p-5"
      >
        <div
          className="hidden sm:flex flex-col items-start justify-start overflow-hidden rounded-md 
        bg-[var(--background)] w-auto h-full shrink-0"
        >
          <button
            className="w-full h-full border-none bg-none p-0 cursor-pointer rounded-md overflow-hidden"
            type="button"
            onClick={() => onGalleryClick && onGalleryClick(0)}
            tabIndex={0}
            aria-label={`Proje ana görseli: ${title}`}
          >
            <Image
              src={mainImage}
              alt={`Proje ana görseli: ${title}`}
              width={120}
              height={120}
              className="w-full h-full object-cover block"
              priority
            />
          </button>
        </div>

        <div className="flex flex-col gap-2 pl-0 sm:pl-4">
          {" "}
          <h3 className="text-foreground text-lg xl:text-2xl font-bold mt-0 mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-secondary text-sm lg:text-base xl:text-lg mt-0 mb-2 leading-snug">
            {description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            <button
              className="sm:hidden w-10 h-10 border-none bg-[var(--background)] p-0 rounded-md overflow-hidden cursor-pointer 
              flex items-center justify-center"
              type="button"
              onClick={() => onGalleryClick && onGalleryClick(0)}
              tabIndex={0}
              aria-label={`Proje ana görseli: ${title}`}
            >
              <Image
                src={mainImage}
                alt={`Proje ana görseli: ${title}`}
                width={40} // Küçük boyut
                height={40} // Küçük boyut
                className="w-full h-full object-cover block rounded-md"
              />
            </button>

            {/* Galeri Slotları */}
            {gallerySlots.map((img, i) => (
              <button
                key={i + 1}
                className="w-10 h-10 lg:w-15 lg:h-15 border-none bg-[var(--background)] p-0 rounded-md overflow-hidden cursor-pointer 
                flex items-center justify-center 
                transition-shadow duration-200"
                type="button"
                onClick={() => onGalleryClick && onGalleryClick(i + 1)}
                tabIndex={0}
                aria-label={`Proje görseli ${i + 2}`}
              >
                {img ? (
                  <Image
                    src={img}
                    alt={`Proje görseli ${i + 2}`}
                    width={40} // Galeri görselleri 40x40
                    height={40} // Galeri görselleri 40x40
                    className="w-full h-full object-cover block rounded-md"
                  />
                ) : (
                  <span className="w-full h-full bg-[var(--background)] rounded-md flex items-center justify-center text-secondary text-xs">
                    {/* Placeholder content if needed */}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
