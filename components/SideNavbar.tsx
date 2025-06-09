// @/components/SideNavbar.tsx
"use client"
import { FaHome, FaInfoCircle, FaEnvelope } from "react-icons/fa";
import SidebarNavbarButton from './SidebarNavbarButton';
import { useState } from "react";


// Prop'ların tipini tanımla
interface SideNavbarProps {
    currentPage: string;
    setPage: (page: string) => void;
}

export default function SideNavbar({ currentPage, setPage }: SideNavbarProps) {

    return (
        <div className="sideNav absolute top-0 right-0 h-dvh flex items-center pr-5 z-2">
            <div className="flex flex-col items-end space-y-4">
                <SidebarNavbarButton
                    text="Home"
                    href="#home"
                    icon={<FaHome size={20} />}
                    isActive={currentPage === "#home"}
                    onClick={() => setPage("#home")}
                />
                <SidebarNavbarButton
                    text="About"
                    href="#about"
                    icon={<FaInfoCircle size={20} />}
                    isActive={currentPage === "#about"}
                    onClick={() => setPage("#about")}
                />
                <SidebarNavbarButton
                    text="Contact"
                    href="#contact"
                    icon={<FaEnvelope size={20} />}
                    isActive={currentPage === "#contact"}
                    onClick={() => setPage("#contact")}
                />
            </div>
        </div>
    );
}