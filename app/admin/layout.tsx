// app/CV2/layout.tsx
import ThemeProvider, { ThemeName, ThemeColors } from "@/app/ThemeProvider";
import cvThemesDataJson from "@/styles/cv2-themes.json";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const themeData: Record<ThemeName, ThemeColors> = cvThemesDataJson as Record<
    ThemeName,
    ThemeColors
  >;

  return (
    <ThemeProvider themeData={themeData} localStorageKey="adminTheme">
      {children}
    </ThemeProvider>
  );
}
