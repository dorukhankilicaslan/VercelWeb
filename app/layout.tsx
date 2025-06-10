import { useState, useEffect } from "react";
// app/layout.tsx
import type { Metadata } from "next";
import TransitionOverlay from "@/components/TransitionOverlay";

import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";


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

export const metadata: Metadata = {
  title: "Dorukhan KILIÇASLAN",
  description: "Porfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={` ${poppins.variable} ${opensans.variable} `} style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
        <div className="page-content-wrapper">
          {children}
        </div>
      </body>
    </html>
  );
}
