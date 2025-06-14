"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react"; // lucide-react veya Heroicons kullanabilirsin
import themes from "@/styles/themes.json";

type Theme = keyof typeof themes;

const ThemeSwitcherButton = () => {
  const [theme, setTheme] = useState<Theme>("light");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    const initial =
      stored ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const applyTheme = (themeName: Theme) => {
    const themeVariables = themes[themeName];
    if (!themeVariables) return;
    const root = document.documentElement;
    Object.entries(themeVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setOpen(false);
  };

  // Menü dışına tıklanınca kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-3 py-2 rounded-md border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] transition"
      >
        🌓
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-fit rounded-md shadow-lg bg-[var(--background)] border border-[var(--border)] z-50">
          <ul className="py-1">
            {Object.keys(themes).map((t) => (
              <li key={t}>
                <button
                  onClick={() => handleThemeChange(t as Theme)}
                  className={`w-full text-left px-4 py-2 hover:bg-[var(--experience-background-hover)] text-[var(--foreground)] ${
                    theme === t ? "font-semibold" : ""
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)} {/* Örn: Light */}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcherButton;
