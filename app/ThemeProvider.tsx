// app/ThemeProvider.tsx
"use client";

import {
  useLayoutEffect,
  useState,
  ReactNode,
  createContext,
  useContext,
  useCallback,
} from "react";
// themes.json dosyasını doğrudan import etmiyoruz, prop olarak alacağız.

// Temaların her birinin iç yapısını tanımlayan interface
// themes.json'daki her bir tema objesi (örn: light, dark) bu yapıya uymalıdır.
export interface ThemeColors {
  "--background": string;
  "--foreground": string;
  "--primary": string;
  "--secondary"?: string;
  "--border"?: string;
  "--spotlight"?: string;
  "--success"?: string;
  "--warning"?: string;
  // themes.json dosyanızdaki diğer tüm CSS değişkenlerini buraya ekleyebilirsiniz
}

// Tema adlarını tanımlayan tip
export type ThemeName = "light" | "dark" | "darkBlue";

interface ThemeContextType {
  currentTheme: ThemeName;
  setAppTheme: (themeName: ThemeName) => void;
  isThemeLoaded: boolean;
  currentThemeColors: ThemeColors;
  themeData: Record<string, ThemeColors>; // Tüm temaların ThemeColors tipinde olduğunu belirtiyoruz
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  themeData: Record<string, ThemeColors>; // Prop olarak gelen themeData'nın tipi
}

export default function ThemeProvider({
  children,
  themeData,
}: ThemeProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>("light");
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);

  // currentThemeColors'ı güvenli bir varsayılan ile başlatıyoruz.
  // Bu, themeData'nın henüz tam olarak mevcut olmadığı erken render aşamalarını korur.
  const [currentThemeColors, setCurrentThemeColors] = useState<ThemeColors>({
    "--background": "#FFFFFF", // Fallback varsayılan renkler
    "--foreground": "#000000",
    "--primary": "#0000FF",
  });

  const applyTheme = useCallback(
    (themeName: ThemeName) => {
      const themeVariables = themeData[themeName];
      // themeVariables'ın varlığını kontrol et
      if (!themeVariables) {
        console.warn(
          `Attempted to apply unknown theme: ${themeName}. Using default.`
        );
        // Varsayılan bir tema uygulamaya çalışabiliriz eğer geçersizse
        const defaultThemeVars = themeData["light"] || themeData["dark"];
        if (defaultThemeVars) {
          Object.entries(defaultThemeVars).forEach(([key, value]) => {
            document.documentElement.style.setProperty(key, value);
          });
          setCurrentTheme(themeName); // Yine de seçilen temayı state'e kaydet (UI'da gösterim için)
          setCurrentThemeColors(defaultThemeVars);
        }
        return;
      }

      const root = document.documentElement;

      Object.entries(themeVariables).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
      localStorage.setItem("theme", themeName);
      setCurrentTheme(themeName);
      setCurrentThemeColors(themeVariables); // Tema renklerini context state'ine kaydet
    },
    [themeData]
  ); // themeData prop olarak geldiği için bağımlılıklara ekliyoruz.

  useLayoutEffect(() => {
    // themeData'nın undefined veya boş olup olmadığını kontrol et
    if (!themeData || Object.keys(themeData).length === 0) {
      console.error(
        "ThemeProvider: themeData is undefined or empty. Cannot apply theme."
      );
      setIsThemeLoaded(true); // Overlay'in kapanmasını sağlamak için yüklendi olarak işaretle
      return; // Temayı uygulama işlemini durdur
    }

    const storedTheme =
      typeof window !== "undefined"
        ? (localStorage.getItem("theme") as ThemeName | null)
        : null;
    const prefersDark =
      typeof window !== "undefined"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
        : false;

    // Tarayıcının tercih ettiği temayı belirlerken, themeData içinde gerçekten var olup olmadığını kontrol et
    let browserPreferredTheme: ThemeName = "light"; // Varsayılan olarak light
    if (prefersDark && themeData["dark"]) {
      // 'dark' teması mevcutsa
      browserPreferredTheme = "dark";
    } else if (themeData["light"]) {
      // 'dark' yoksa veya tercih edilmiyorsa ve 'light' mevcutsa
      browserPreferredTheme = "light";
    }

    let themeToApply: ThemeName;

    // Kural 2: Eğer localStorage'da 'darkBlue' gibi özel bir tema seçili ise, bu temayı koru.
    // themeData'da o temanın tanımlı olduğundan emin oluyoruz.
    if (storedTheme === "darkBlue" && themeData["darkBlue"]) {
      themeToApply = storedTheme;
    } else {
      // Kural 1 & 3:
      // Eğer localStorage'da tema yoksa (storedTheme null) VEYA 'dark'/'light' temalarından biri seçiliyse,
      // tarayıcının mevcut tercihine (browserPreferredTheme) uyum sağla.
      // browserPreferredTheme (dark veya light) themeData'da varsa kontrolü de ekledik
      if (themeData[browserPreferredTheme]) {
        themeToApply = browserPreferredTheme;
      } else {
        // Son çare: Tarayıcı tercih edilen tema themes.json'da yoksa
        // ve special theme de seçili değilse, varsayılan 'light'a düş.
        // Bu durum teorik olarak olmamalı eğer themes.json'da 'light' mevcutsa.
        themeToApply = "light";
      }
    }

    applyTheme(themeToApply);
    setIsThemeLoaded(true);
  }, [applyTheme, themeData]); // `applyTheme` ve `themeData` bağımlılıkları

  const setAppTheme = useCallback(
    (themeName: ThemeName) => {
      if (themeData[themeName]) {
        // themeData'da geçerli bir tema adıysa uygula
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
        isThemeLoaded,
        currentThemeColors,
        themeData,
      }}
    >
      {children}
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
