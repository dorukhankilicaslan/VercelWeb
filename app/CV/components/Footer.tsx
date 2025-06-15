// src/components/OnePageParts/Footer.tsx
import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-6 flex justify-center md:justify-end pr-0 md:pr-2 lg:pr-4 xl:pr-20 text-[var(--foreground)]/100 
    text-[0.65rem] md:text-[0.75rem] text-nowrap"
    >
      <p>&copy; {currentYear} Dorukhan KILIÇASLAN. Tüm hakları saklıdır.</p>
    </footer>
  );
}
