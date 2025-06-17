// @/components/SideNavbar.tsx
"use client";
import {
  FaHome,
  FaUser,
  FaEnvelopeOpen,
  FaToolbox,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import SidebarNavbarButton from "./SidebarNavbarButton";
import { useState } from "react";
import AnimatedOverlay from "./AnimatedOverlay";
import { animations } from "@/data/animations";

// Prop'ların tipini tanımla
interface SideNavbarProps {
  currentPage: string;
  setPage: (page: string) => void;
}

export default function SideNavbar({ currentPage, setPage }: SideNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileLinkClick = (page: string) => {
    setPage(page);
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col justify-center absolute top-0 right-[10px] h-dvh items-center pr-5 z-5">
        <div className="flex flex-col items-end space-y-4">
          <SidebarNavbarButton
            text="Home"
            icon={<FaHome />}
            isActive={currentPage === "#home"}
            onClick={() => setPage("#home")}
          />
          <SidebarNavbarButton
            text="About"
            icon={<FaUser />}
            isActive={currentPage === "#about"}
            onClick={() => setPage("#about")}
          />
          <SidebarNavbarButton
            text="Portfolio"
            icon={<FaToolbox />}
            isActive={currentPage === "#portfolio"}
            onClick={() => setPage("#portfolio")}
          />
          <SidebarNavbarButton
            text="Contact"
            icon={<FaEnvelopeOpen />}
            isActive={currentPage === "#contact"}
            onClick={() => setPage("#contact")}
          />
        </div>
      </div>

      {/* Mobile Menu Button (Hamburger/Close Icon) */}
      <div className="lg:hidden fixed top-8 right-8 z-100">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-3 rounded-md text-[var(--background)] bg-[var(--primary)] hover:bg-[var(--hover-background)] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--primary)] transition-colors duration-200"
          aria-label={isMobileMenuOpen ? "Close main menu" : "Open main menu"}
          style={{ border: "1px solid var(--foreground)/10" }}
        >
          <div className="relative w-6 h-6">
            {" "}
            {/* İkonlar için sarmalayıcı */}
            <FaBars
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 ease-in-out
                ${
                  isMobileMenuOpen
                    ? "opacity-0 transform rotate-90 scale-50"
                    : "opacity-100 transform rotate-0 scale-100"
                }`}
            />
            <FaTimes
              size={24}
              className={`absolute top-0 left-0 transition-all duration-300 ease-in-out
                ${
                  isMobileMenuOpen
                    ? "opacity-100 transform rotate-0 scale-100"
                    : "opacity-0 transform -rotate-90 scale-50"
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatedOverlay
        isOpen={isMobileMenuOpen}
        animation={animations.slideInLeft}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col space-y-8"
        >
          <a
            href="#home"
            onClick={() => handleMobileLinkClick("#home")}
            className={`text-3xl font-semibold ${
              currentPage === "#home"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)]"
            } hover:text-[var(--primary)] transition-colors`}
          >
            <span className="col flex flex-nowrap items-center">
              <FaHome className="mr-4" size={24} />
              Anasayfa
            </span>
          </a>
          <a
            href="#about"
            onClick={() => handleMobileLinkClick("#about")}
            className={`text-3xl font-semibold ${
              currentPage === "#about"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)]"
            } hover:text-[var(--primary)] transition-colors`}
          >
            <span className="col flex flex-nowrap items-center">
              <FaUser className="mr-4" size={24} />
              Hakkımda
            </span>
          </a>
          <a
            href="#portfolio"
            onClick={() => handleMobileLinkClick("#portfolio")}
            className={`text-3xl font-semibold ${
              currentPage === "#portfolio"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)]"
            } hover:text-[var(--primary)] transition-colors`}
          >
            <span className="col flex flex-nowrap items-center">
              <FaToolbox className="mr-4" size={24} />
              Çalışmalar
            </span>
          </a>
          <a
            href="#contact"
            onClick={() => handleMobileLinkClick("#contact")}
            className={`text-3xl font-semibold ${
              currentPage === "#contact"
                ? "text-[var(--primary)]"
                : "text-[var(--foreground)]"
            } hover:text-[var(--primary)] transition-colors`}
          >
            <span className="col flex flex-nowrap items-center">
              <FaEnvelopeOpen className="mr-4" size={24} />
              İletişim
            </span>
          </a>
        </div>
      </AnimatedOverlay>
    </>
  );
}
