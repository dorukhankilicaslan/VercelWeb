// app/layout.tsx

import { Poppins } from "next/font/google";
import "./globals.css";

import ThemeProvider from "./ThemeProvider"; // ThemeProvider'ı import edin

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
  return (
    <html lang="tr" className={`${poppins.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
