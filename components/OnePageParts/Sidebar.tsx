import React, { useState, useEffect } from "react";
import SidebarSocials from "./SidebarSocials";
import { Menu, X } from "lucide-react";

interface SidebarProps {
  activeSection: string;
  setActiveSection?: (section: string) => void;
}

export default function Sidebar({ activeSection }: SidebarProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileNavOpen ? "hidden" : "";
  }, [isMobileNavOpen]);

  const navItems = [
    { id: "about", label: "Hakkımda" },
    { id: "experience", label: "Deneyimlerim" },
    { id: "projects", label: "Projelerim" },
  ];

  return (
    <aside className="w-full h-full md:mt-0 relative">
      <div className="h-full flex flex-col justify-center items-center text-center md:items-start md:text-start">
        {/* BAŞLIK VE ALT BAŞLIK */}
        <h1 className="font-bold text-[var(--foreground)] text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Dorukhan KILIÇASLAN
        </h1>
        <h2 className="text-[var(--foreground)]/80 mb-6 md:mb-16 text-base lg:text-1xl xl:text-3xl">
          Grafik / Web Tasarım
        </h2>

        {/* E-POSTA & CV */}
        <div className="flex flex-col gap-2">
          <a
            href="mailto:drkhn.dk@gmail.com"
            className="text-sm text-secondary hidden"
          >
            drkhn.dk@gmail.com
          </a>
          <span>
            <a
              href="/dk_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--foreground)]/80 hover:text-[var(--accent)] transition-colors duration-300 text-sm lg:text-base xl:text-xl"
            >
              Özgeçmiş Görüntüle
            </a>
          </span>
        </div>

        {/* ALINTI */}
        <p className="italic font-serif mt-6 mb-2 leading-7 text-sm lg:text-base xl:text-lg">
          "Çok disiplinli bir tasarımcı olarak,
          <br className="inline" />
          netlik ve kullanıcı deneyimini
          <br className="inline" />
          ön planda tutuyorum."
        </p>

        {/* ----- HAMBURGER MENU BUTTON ----- */}
        <button
          onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
          className={`fixed top-4 right-4 z-20 p-2 bg-[var(--background)] border-1 rounded-lg border-[var(--foreground)] md:hidden`}
          aria-label="Menüyü aç/kapat"
        >
          {isMobileNavOpen ? (
            <X className="w-6 h-6 text-[var(--foreground)]" />
          ) : (
            <Menu className="w-6 h-6 text-[var(--foreground)]" />
          )}
        </button>

        {/* ----- NAVIGATION MENU ----- */}

        {/* Masaüstü versiyon */}
        <nav className="hidden md:flex flex-col gap-4 mt-4 lg:mt-8 mb-8">
          <ul className="list-none m-0 p-0">
            {navItems.map(({ id, label }) => (
              <li key={id} className="mb-2">
                <a
                  href={`#${id}`}
                  className={`group inline-flex items-center gap-3 font-semibold text-sm tracking-wider transition-colors ${
                    activeSection === id
                      ? "text-[var(--foreground)]"
                      : "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                  }`}
                >
                  <span
                    className={`h-[1.5px] rounded transition-all ${
                      activeSection === id
                        ? "w-16 lg:w-24 bg-[var(--foreground)]"
                        : "w-8 lg:w-12 bg-[var(--foreground)]/60 group-hover:w-16 group-hover:bg-[var(--foreground)]"
                    }`}
                  ></span>
                  <span className="font-[500] tracking-wide uppercase text-xs lg:text-[0.75rem] xl:text-[1rem]">
                    {label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobil Menü (her zaman render edilir, sadece görünürlük kontrol edilir) */}
        <div
          className={`
    fixed inset-0 
    flex flex-col items-center justify-center text-center
    bg-[var(--foreground)] dark:bg-[var(--background)]
    transition-all duration-300 ease-in-out
    ${
      isMobileNavOpen
        ? "opacity-100  pointer-events-auto z-50"
        : "opacity-0  pointer-events-none z-[-10] "
    }
  `}
        >
          <button
            onClick={() => setIsMobileNavOpen(false)}
            className="absolute top-4 right-4 p-2 bg-[var(--background)] border-1 rounded-lg border-[var(--foreground)]"
            aria-label="Menüyü kapat"
          >
            <X className="text-[var(--foreground)] w-6 h-6 " />
          </button>

          <ul className="space-y-6 text-xl font-semibold text-[var(--foreground)]">
            {navItems.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsMobileNavOpen(false)}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/dk_resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base text-[var(--foreground)]/80 hover:text-[var(--accent)]"
              >
                Özgeçmiş Görüntüle
              </a>
            </li>
          </ul>

          <div className="mt-12">
            <SidebarSocials />
          </div>
        </div>

        <SidebarSocials />
      </div>
    </aside>
  );
}
