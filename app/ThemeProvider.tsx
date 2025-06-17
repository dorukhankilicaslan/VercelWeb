// app/ThemeProvider.tsx (Önceki Cevaptaki ile aynı, değişmedi)
"use client";

import {
  useLayoutEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
import GlobalLoadingOverlay from "@/app/GlobalLoadingOverlay";

export interface ThemeColors {
  "--background": string;
  "--foreground": string;
  "--primary": string;
  "--secondary"?: string;
  "--border"?: string;
  "--spotlight"?: string;
  "--success"?: string;
  "--warning"?: string;
}

export type ThemeName = "light" | "dark" | "darkBlue" | string;

interface ThemeContextType {
  currentTheme: ThemeName;
  setAppTheme: (themeName: ThemeName) => void;
  isThemeLoaded: boolean;
  currentThemeColors: ThemeColors;
  themeData: Record<string, ThemeColors>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  themeData: Record<string, ThemeColors>;
  localStorageKey?: string; // Yeni prop
}

export default function ThemeProvider({
  children,
  themeData,
  localStorageKey = "theme", // Varsayılan değer 'theme'
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  const [currentThemeColors, setCurrentThemeColors] = useState<ThemeColors>({
    "--background": "#FFFFFF",
    "--foreground": "#000000",
    "--primary": "#0000FF",
  });

  const applyTheme = useCallback(
    (themeName: ThemeName) => {
      const themeVariables = themeData[themeName];
      if (!themeVariables) {
        console.warn(
          `Attempted to apply unknown theme: ${themeName}. Using default.`
        );
        const defaultThemeVars = themeData["light"] || themeData["dark"];
        if (defaultThemeVars) {
          Object.entries(defaultThemeVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
          });
          setCurrentTheme(themeName);
          setCurrentThemeColors(defaultThemeVars);
        }
        return;
      }

      const root = document.documentElement;

      Object.entries(themeVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      localStorage.setItem(localStorageKey, themeName); // localStorageKey kullanıldı
      setCurrentTheme(themeName);
      setCurrentThemeColors(themeVariables);
    },
    [themeData, localStorageKey]
  );

  useLayoutEffect(() => {
    if (!themeData || Object.keys(themeData).length === 0) {
      console.error(
        "ThemeProvider: themeData is undefined or empty. Cannot apply theme."
      );
      setIsThemeLoaded(true);
      return;
    }

    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem(localStorageKey) as ThemeName | null)
        : null;
    const prefersDark =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;

    let browserPreferredTheme: ThemeName = "light";
    if (prefersDark && themeData["dark"]) {
      browserPreferredTheme = "dark";
    } else if (themeData["light"]) {
      browserPreferredTheme = "light";
    }

    let themeToApply: ThemeName;

    if (storedTheme && themeData[storedTheme]) {
      themeToApply = storedTheme;
    } else if (themeData[browserPreferredTheme]) {
      themeToApply = browserPreferredTheme;
    } else {
      themeToApply = (Object.keys(themeData)[0] as ThemeName) || "light";
      if (!themeData[themeToApply]) {
        console.warn(
          "No valid theme found in themeData. Falling back to hardcoded light."
        );
        themeToApply = "light";
      }
    }

    applyTheme(themeToApply);
    setIsThemeLoaded(true);
  }, [applyTheme, themeData, localStorageKey]);

  const setAppTheme = useCallback(
    (themeName: ThemeName) => {
      if (themeData[themeName]) {
        applyTheme(themeName);
      }
    },
    [applyTheme, themeData]
  );

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setAppTheme,
        isThemeLoaded, // Bu state artık GlobalLoadingOverlay tarafından kullanılabilir
        currentThemeColors,
        themeData,
      }}
    >
      {isThemeLoaded ? children : <GlobalLoadingOverlay />}
      {/* Buraya taşıdık */}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("`useTheme` hook must be used within a `ThemeProvider`");
  }
  return context;
};
