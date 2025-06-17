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
        bg-[var(--background)]/20
        border border-[var(--background)] 
        shadow-[0_0_10px_rgba(0,0,0,0.25)]
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
            // Image'ı doldurabilmesi için parent'ına relative ekliyoruz
            className="w-full h-full border-none bg-none p-0 cursor-pointer rounded-md overflow-hidden relative"
            type="button"
            onClick={() => onGalleryClick && onGalleryClick(0)}
            tabIndex={0}
            aria-label={`Proje ana görseli: ${title}`}
          >
            <Image
              src={mainImage}
              alt={`Proje ana görseli: ${title}`}
              fill // width ve height prop'larını kaldırdık, fill kullanıyoruz
              className="object-cover" // Sadece object-cover yeterli
              priority
              sizes="(max-width: 768px) 100vw, 120px" // Responsif boyutlar için sizes ekledik
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
              // Image'ı doldurabilmesi için parent'ına relative ekliyoruz
              className="sm:hidden w-10 h-10 border-none bg-[var(--background)] p-0 rounded-md overflow-hidden cursor-pointer 
              flex items-center justify-center relative"
              type="button"
              onClick={() => onGalleryClick && onGalleryClick(0)}
              tabIndex={0}
              aria-label={`Proje ana görseli: ${title}`}
            >
              <Image
                src={mainImage}
                alt={`Proje ana görseli: ${title}`}
                fill // width ve height prop'larını kaldırdık, fill kullanıyoruz
                className="object-cover rounded-md" // Sadece object-cover yeterli
                sizes="40px" // Küçük ekran için sabit boyut belirtiyoruz
              />
            </button>

            {/* Galeri Slotları */}
            {gallerySlots.map((img, i) => (
              <button
                key={i + 1}
                // Image'ı doldurabilmesi için parent'ına relative ekliyoruz
                className="w-10 h-10 lg:w-15 lg:h-15 border-none bg-[var(--background)] p-0 rounded-md overflow-hidden cursor-pointer 
                flex items-center justify-center relative 
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
                    fill // width ve height prop'larını kaldırdık, fill kullanıyoruz
                    className="object-cover rounded-md" // Sadece object-cover yeterli
                    // Responsive boyutlar için sizes ekledik: küçük ekranlarda 40px, büyüklerde 60px
                    sizes="(max-width: 768px) 40px, (min-width: 769px) 60px"
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
