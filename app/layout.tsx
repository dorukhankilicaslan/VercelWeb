// app/layout.tsx
import { Poppins } from "next/font/google";
import "./globals.css";

import ThemeProvider, { ThemeName, ThemeColors } from "./ThemeProvider";
import GlobalLoadingOverlay from "./GlobalLoadingOverlay"; // GlobalLoadingOverlay'i import et

// themes.json dosyasını doğrudan import ederken tipini belirtiyoruz
import themesDataJson from "@/styles/themes.json"; // Ana tema veriniz

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Dorukhan KILIÇASLAN | Portföy",
  keywords: [
    "Dorukhan Kılıçaslan",
    "Portföy",
    "Web Geliştirici",
    "Yazılım Mühendisi",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
  ],
  description: "Dorukhan Kılıçaslan'ın kişisel portföyü",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // themes.json içeriğini belirli bir tipe atıyoruz
  const themeData: Record<ThemeName, ThemeColors> = themesDataJson as Record<
    ThemeName,
    ThemeColors
  >;

  return (
    <html lang="tr" className={`${poppins.variable}`}>
      <head>{/* head içeriği */}</head>
      <body>
        <ThemeProvider themeData={themeData} localStorageKey="appTheme">
          {children}
          <GlobalLoadingOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
