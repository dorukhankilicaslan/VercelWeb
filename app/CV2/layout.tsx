// app/CV2/layout.tsx
import ThemeProvider, { ThemeName, ThemeColors } from "@/app/ThemeProvider";
import cv2ThemesDataJson from "@/styles/cv2-themes.json"; // CV2'ye özel temalar

export default function CV2Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeData: Record<ThemeName, ThemeColors> = cv2ThemesDataJson as Record<
    ThemeName,
    ThemeColors
  >;

  return (
    <ThemeProvider themeData={themeData} localStorageKey="CV2Theme">
      {children}
    </ThemeProvider>
  );
}