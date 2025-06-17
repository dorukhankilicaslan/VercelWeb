// app/layout.tsx

import { Poppins } from "next/font/google";
import "./globals.css";

// ThemeProvider'dan hem bileşeni hem de ilgili tipleri import ediyoruz
import ThemeProvider, { ThemeName, ThemeColors } from "./ThemeProvider";
import GlobalLoadingOverlay from "./GlobalLoadingOverlay";

// themes.json dosyasını import ederken tipini belirtiyoruz
import themesDataJson from "@/styles/themes.json";

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
      <head>
        {/*
          Önceki hidrasyon hatasına neden olan inline script kaldırıldı.
          Artık tema yüklenene kadar sayfayı gizlemek için GlobalLoadingOverlay kullanıyoruz.
        */}
      </head>
      <body>
        <ThemeProvider themeData={themeData}>
          <GlobalLoadingOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
