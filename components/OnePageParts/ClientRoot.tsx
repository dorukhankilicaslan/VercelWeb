"use client";
import { useEffect, useState } from "react";
import SpotlightBackground from "@/components/OnePageParts/SpotlightBackground";
import LoadingOverlay from "@/components/OnePageParts/LoadingOverlay";
import { LocalizationProvider } from "./LocalizationProvider";
import { usePathname } from "next/navigation";

export default function ClientRoot({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.add("onepage-body");
    return () => {
      document.body.classList.remove("onepage-body");
    };
  }, []);

  useEffect(() => {
    const handle = () => setLoading(false);
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handle);
      return () => window.removeEventListener("load", handle);
    }
  }, []);

  return (
    <>
      {pathname === "/" && (
        <LocalizationProvider>
          <SpotlightBackground />
          {loading && <LoadingOverlay />}
          {children}
        </LocalizationProvider>
      )}
      {pathname !== "/" && { children }}
    </>
  );
}
