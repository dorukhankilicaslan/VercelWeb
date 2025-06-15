// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./styles.css";

import ThemeProvider from "./components/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Dorukhan KILIÇASLAN",
  description: "Porfolio Website",
};

export default function DemoPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${poppins.variable} page-content-wrapper`}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <ThemeProvider>{children}</ThemeProvider>
    </div>
  );
}
