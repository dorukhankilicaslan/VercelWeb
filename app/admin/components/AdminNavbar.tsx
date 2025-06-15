"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import LogoutButton from "./LogoutButton";
import themes from "@/styles/themes.json";

type Theme = keyof typeof themes;

export default function AdminNavbar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (value: boolean) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>("light");
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
    setThemeMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
        setThemeMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between w-full text-[var(--foreground)] bg-[var(--navbar-bg)]">
      <div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex justify-center items-center text-center h-full"
        >
          <span className="p-1 bg-[var(--active-bg)] border-2 border-[var(--border)] w-full h-full">
            {sidebarOpen ? <Menu size={30} /> : <ArrowRight size={30} />}
          </span>
        </button>
      </div>
      <div className="relative inline-block w-fit" ref={dropdownRef}>
        <button
          onClick={() => {
            setMenuOpen((prev) => {
              const next = !prev;
              if (!next) {
                setThemeMenuOpen(false); // ana menü kapanıyorsa alt menüyü de kapat
              }
              return next;
            });
          }}
          className="flex items-center justify-between gap-2 px-3 py-2 w-full"
        >
          {"ProfileImage"}
        </button>

        {menuOpen && (
          <ul
            className="
        absolute left-0 top-full
        w-full border border-t-0 border-[var(--border)]
        rounded-b-md bg-[var(--background)]
        z-50
      "
          >
            <li className="px-4 py-2 hover:bg-white/20">
              <LogoutButton />
            </li>
            <li className="px-4 py-2 hover:bg-white/20">
              <button
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                className="w-full text-left"
              >
                <div className="nowrap flex items-center  gap-2">
                  Tema: {theme.charAt(0).toUpperCase() + theme.slice(1)}
                  <ChevronDown
                    size={16}
                    className={`ml-auto transition-transform ${
                      themeMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </button>
            </li>
            {themeMenuOpen &&
              Object.keys(themes).map((t) => (
                <li key={t}>
                  <button
                    onClick={() => handleThemeChange(t as Theme)}
                    className={`w-full text-left px-6 py-2 hover:bg-white/20 text-[var(--foreground)] ${
                      theme === t ? "font-semibold" : ""
                    }`}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
