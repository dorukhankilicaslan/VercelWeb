// @/components/SidebarNavbarButton.tsx
import React from "react"; // React.ReactNode için gerekli

// Bileşenin prop'ları için tipleri tanımla
interface SideNavbarButtonProps {
    text: string;
    href: string;
    icon: React.ReactNode;
    isActive?: boolean;
    onClick: () => void;
}

export default function SideNavbarButton({ text, href, icon, isActive = false, onClick }: SideNavbarButtonProps) {

    return (
        <button
            className={
                `group relative inline-flex h-12 w-12 items-center justify-start overflow-hidden
                rounded-full transition-all duration-300  hover:w-40 bg-[var(--passive)]  hover:bg-[var(--secondary)]
                hover:cursor-pointer ${isActive ? 'active' : ''}`
            }
            style={{ backgroundColor: isActive ? 'var(--secondary)' : '' }}
            onClick={onClick}
        >
            {/* Metin İçeriği */}
            <div className="absolute left-0 w-full flex justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-hover:delay-150">
                <span className="whitespace-nowrap"
                    style={{ marginRight: "1.5rem", fontWeight: 600, color: "var(--foreground)", fontFamily: "Poppins" }}>
                    {text}
                </span>
            </div>

            {/* İkon Konteyneri */}
            <div className="absolute right-3.5 flex items-center justify-center h-full w-auto">
                {icon}
            </div>
        </button>
    );
}