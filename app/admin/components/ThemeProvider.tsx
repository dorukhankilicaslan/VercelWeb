"use client";

import { useLayoutEffect, useState, ReactNode } from "react";
import themes from "@/styles/themes.json";

type Theme = "light" | "dark";

interface Props {
  children: ReactNode;
}

export default function ThemeProvider({ children }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = useState<Theme>("light");

  useLayoutEffect(() => {
    const stored = localStorage.getItem("theme") as Theme | null;

    if (stored && themes[stored]) {
      applyTheme(stored);
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      const preferredTheme: Theme =
        prefersDark && themes["dark"] ? "dark" : "light";
      applyTheme(preferredTheme);
      setTheme(preferredTheme);
    }
  }, []);

  const applyTheme = (themeName: Theme) => {
    const themeVariables = themes[themeName];
    if (!themeVariables) return;

    const root = document.documentElement;

    Object.entries(themeVariables).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  };

  return <>{children}</>;
}
