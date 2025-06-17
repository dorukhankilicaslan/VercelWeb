// @/components/SlidingButton.tsx
import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import { IconType } from "react-icons";

interface SlidingButtonProps {
    onNewTab?: boolean;
    text?: string;
    link?: string;
    // Yeni boyutlandırma prop'ları: Genel butonun genişliği ve yüksekliği
    buttonWidth?: string;  // Örnek: "w-48", "w-full", "200px" (CSS değeri)
    buttonHeight?: string; // Örnek: "h-12", "h-16", "48px" (CSS değeri)

    // Metin ve ikonun boyutlarını ayrı ayrı kontrol etmek için
    textSize?: string;     // Örnek: "text-lg", "text-xl", "18px"
    textLeftMargin?: string;
    iconSize?: number;     // İkonun boyutu (piksel cinsinden)
    iconRight?: string;

    IconComponent?: IconType; // Kullanıcının özel bir ikon geçirebilmesi için

    // Renk prop'ları
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    hoverBackgroundColor?: string; // Hover efekti için arka plan rengi
    setPage?: (page: string) => void;

}

export default function SlidingButton({
    onNewTab = false,
    text = "BUTTON TEXT",
    link = "#buttonLink",
    buttonWidth = "w-48",    // Varsayılan genişlik (Tailwind sınıfı veya CSS değeri)
    buttonHeight = "h-13",   // Varsayılan yükseklik (Tailwind sınıfı veya CSS değeri)
    textSize = "text-lg",    // Varsayılan metin boyutu
    textLeftMargin = "ml-4",
    iconSize = 20,           // Varsayılan ikon boyutu
    iconRight = "mr-2.5",
    IconComponent = FaArrowRight, // Varsayılan ikon bileşeni
    backgroundColor = "var(--background)",
    borderColor = "var(--primary)",
    textColor = "var(--foreground)",
    hoverBackgroundColor = "var(--primary)",
    setPage = () => { },
}: SlidingButtonProps) {

    // Tailwind sınıfları veya CSS değerleri olabileceği için stil objesi kullanalım
    // Bu, hem 'w-48' gibi Tailwind sınıflarını hem de '200px' gibi doğrudan CSS değerlerini destekler.
    const buttonStyles: React.CSSProperties = {
        backgroundColor: backgroundColor,
        border: `1px solid ${borderColor}`,
        cursor: "pointer",
        width: buttonWidth.startsWith('w-') ? undefined : buttonWidth, // Tailwind ise undefined, CSS ise değeri kullan
        height: buttonHeight.startsWith('h-') ? undefined : buttonHeight, // Tailwind ise undefined, CSS ise değeri kullan
    };

    // İkon kapsayıcısının boyutları butonun yüksekliğine göre ayarlanacak
    // Eğer buttonHeight bir Tailwind sınıfıysa (örn: "h-16"), bunu CSS değişkenine çevirip kullanmak daha güvenli.
    // Ancak, direkt olarak className'de kullanmak daha kolay olabilir.
    // Burada hem `h-{val}` hem de `w-{val}` sınıflarını direkt olarak kullanacağız.
    const iconContainerDimensionClass = buttonHeight.replace('h-', ''); // 'h-16' -> '16'

    const iconContainerClasses = `
        absolute right-0 flex items-center justify-end rounded-full 
        transition-[width] group-hover:w-[calc(100%)]
        h-${iconContainerDimensionClass} w-${iconContainerDimensionClass}
    `;
    // Not: Eğer buttonHeight '50px' gibi bir değerse, 'h-50px' Tailwind sınıfı çalışmaz.
    // Bu durumda inline style kullanmak en iyisidir.
    const iconContainerInlineStyles: React.CSSProperties = {};
    if (!buttonHeight.startsWith('h-')) {
        iconContainerInlineStyles.height = buttonHeight;
        iconContainerInlineStyles.width = buttonHeight; // Çemberin kare olması için genişlik de aynı
    }

    return (
        <a
            href={link}
            {...(onNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}

            className={`
                group relative inline-flex items-center justify-start rounded-full 
                ${buttonWidth.startsWith('w-') ? buttonWidth : ''} 
                ${buttonHeight.startsWith('h-') ? buttonHeight : ''}
            `}
            style={buttonStyles}

            onClick={() => setPage(link)}
        >
            <span
                className={`z-2 mr-4 ${textLeftMargin} font-semibold ${textSize}`} // Metin boyutu prop'tan geliyor
                style={{ fontFamily: "Poppins", color: textColor }}
            >
                {text}
            </span>
            <div
                className={iconContainerClasses}
                style={{ ...iconContainerInlineStyles, backgroundColor: hoverBackgroundColor }}
            >
                <div className={`${iconRight} flex items-center justify-center`}>
                    <IconComponent size={iconSize} style={{ color: textColor }} />
                </div>
            </div>
        </a>
    );
}