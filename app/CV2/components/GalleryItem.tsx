import React, { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";

type Direction = "left" | "right" | "top" | "bottom" | null;

interface GalleryItemProps {
  index: number;
  onClick: (index: number) => void;
  src: string;
  thumbnailSrc: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
  index,
  onClick,
  src,
  thumbnailSrc,
  alt,
  caption,
  width = 800,
  height = 600,
}) => {
  const containerRef = useRef<HTMLAnchorElement>(null);

  const [enterDirection, setEnterDirection] = useState<Direction>(null);
  const [leaveDirection, setLeaveDirection] = useState<Direction>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isReadyToAnimate, setIsReadyToAnimate] = useState(false);

  // Mouse'un hangi taraftan girdiğini belirler
  const getDirection = (e: React.MouseEvent) => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    const fromLeft = Math.abs(x - rect.left);
    const fromRight = Math.abs(rect.right - x);
    const fromTop = Math.abs(y - rect.top);
    const fromBottom = Math.abs(rect.bottom - y);

    const min = Math.min(fromLeft, fromRight, fromTop, fromBottom);

    if (min === fromLeft) return "left";
    if (min === fromRight) return "right";
    if (min === fromTop) return "top";
    return "bottom";
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const dir = getDirection(e);
    setEnterDirection(dir);
    setLeaveDirection(null);
    setIsHovered(true);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    const dir = getDirection(e);
    setLeaveDirection(dir);
    setIsHovered(false);
  };

  // overlay'ın animasyon için hazır hale gelmesi ve ışınlanma etkisi için useLayoutEffect
  useLayoutEffect(() => {
    if (isHovered) {
      // Önce animasyonu kapat (ışınlanma pozisyonu için)
      setIsReadyToAnimate(false);

      // Hemen ardından (bir frame sonra) animasyonu aç
      const animationFrame = requestAnimationFrame(() => {
        setIsReadyToAnimate(true);
      });

      return () => cancelAnimationFrame(animationFrame);
    } else {
      // Hover bitince animasyon kapansın
      setIsReadyToAnimate(false);
    }
  }, [isHovered, enterDirection]);

  const getInitialTranslate = () => {
    switch (enterDirection) {
      case "left":
        return "translate-x-[-100%] translate-y-0";
      case "right":
        return "translate-x-[100%] translate-y-0";
      case "top":
        return "translate-x-0 translate-y-[-100%]";
      case "bottom":
        return "translate-x-0 translate-y-[100%]";
      default:
        return "translate-x-0 translate-y-[100%]";
    }
  };

  const getExitTranslate = () => {
    switch (leaveDirection) {
      case "left":
        return "translate-x-[-100%] translate-y-0";
      case "right":
        return "translate-x-[100%] translate-y-0";
      case "top":
        return "translate-x-0 translate-y-[-100%]";
      case "bottom":
        return "translate-x-0 translate-y-[100%]";
      default:
        return "translate-x-0 translate-y-[100%]";
    }
  };

  const overlayClass = isHovered
    ? isReadyToAnimate
      ? "translate-x-0 translate-y-0 transition-transform duration-300 ease-in-out"
      : getInitialTranslate()
    : leaveDirection
    ? `transition-transform duration-300 ease-in-out ${getExitTranslate()}`
    : "translate-x-0 translate-y-[100%]";

  return (
    <a
      href={src}
      ref={containerRef}
      onClick={(e) => {
        e.preventDefault();
        onClick(index);
      }}
      aria-label={alt}
      data-pswp-width={width}
      data-pswp-height={height}
      className="relative block overflow-hidden rounded-xl"
      style={{ aspectRatio: `${width} / ${height}` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Image
        src={thumbnailSrc}
        alt={alt}
        title={caption}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover w-full h-full"
        loading="lazy"
      />
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 
          flex items-center justify-center 
          text-[var(--foreground)] text-center p-4 rounded-xl pointer-events-none
          transform opacity-90
          ${overlayClass}
        `}
      >
        {caption}
      </div>
    </a>
  );
};

export default GalleryItem;
