// app/(cv)/layout.tsx
import ThemeProvider, { ThemeName, ThemeColors } from "@/app/ThemeProvider"; // Global ThemeProvider'ı import et
import cvThemesDataJson from "@/styles/cv-themes.json"; // CV'ye özel temalar
import ClientRoot from "./components/ClientRoot";

export const metadata = {
  title: "Dorukhan KILIÇASLAN | CV",
};

export default function CVLayout({ children }: { children: React.ReactNode }) {
  const themeData: Record<ThemeName, ThemeColors> = cvThemesDataJson as Record<
    ThemeName,
    ThemeColors
  >;

  return (
    <ThemeProvider themeData={themeData} localStorageKey="CVTheme">
      <ClientRoot>{children}</ClientRoot>
    </ThemeProvider>
  );
}
