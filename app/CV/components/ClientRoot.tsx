"use client";

import SpotlightBackground from "./SpotlightBackground";
import { LocalizationProvider } from "./LocalizationProvider";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SpotlightBackground />
      <LocalizationProvider>{children}</LocalizationProvider>
    </>
  );
}
