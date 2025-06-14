// app/layout.tsx
import ClientRoot from "@/components/OnePageParts/ClientRoot";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";

import ThemeProvider from "@/components/Admin/ThemeProvider";
import Preloader from "@/components/DemoPageParts/Preloader";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-opensans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
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
  return (
    <html
      lang="tr"
      className={`${poppins.variable} ${opensans.variable} 
      scroll-smooth m-0 p-0 bg-transparent 
      text-[var(--foreground)] font-[poppins] 
      flex min-h-screen`}
    >
      <head></head>
      <body>
        <ThemeProvider>
          <ClientRoot>{children}</ClientRoot>
        </ThemeProvider>
      </body>
    </html>
  );
}
