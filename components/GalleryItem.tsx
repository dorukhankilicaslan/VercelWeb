// src/components/GalleryItem.tsx (önceki haliyle uyumlu)

import React from 'react';

interface GalleryItemProps {
    index: number;
    onClick: (index: number) => void;
    src: string;
    thumbnailSrc: string; // Ekledik
    alt: string;
    caption: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({
    index,
    onClick,
    src,
    thumbnailSrc, // thumbnailSrc de props olarak alınmalı
    alt,
    caption,
}) => {
    return (
        <a
            href={src}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
                e.preventDefault();
                onClick(index);
            }}
            aria-label={alt}
        >
            <img
                src={thumbnailSrc} // Thumbnail kaynağını kullan
                alt={alt}
                title={caption}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="caption">
                <h4>{caption}</h4>
            </div>
        </a>
    );
};

export default GalleryItem;