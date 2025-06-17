// app/CV/components/SpotlightBackground.tsx
"use client";
import { useEffect, useRef } from "react";
import { useTheme } from "@/app/ThemeProvider"; // useTheme hook'unu import ediyoruz
// themes.json dosyasını doğrudan import etmiyoruz, renkleri context'ten alacağız

export default function SpotlightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // currentTheme, isThemeLoaded ve currentThemeColors'ı ThemeProvider'dan alıyoruz
  const { currentTheme, isThemeLoaded, currentThemeColors } = useTheme();

  // HEX -> RGBA yardımcı fonksiyonu
  function hexToRgba(hex: string, alpha: number): string {
    // Hex değerini temizle, # kaldır
    let c = hex.replace("#", "").trim();
    // Kısa hex değerlerini (ör: #FFF) tam hex değerlerine (ör: #FFFFFF) dönüştür
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];

    // Hex değerini ondalık sayıya çevir
    const num = parseInt(c, 16);
    // RGB bileşenlerini ayır
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    // RGBA formatında string döndür
    return `rgba(${r},${g},${b},${alpha})`;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    // Tema henüz yüklenmediyse, canvas yoksa veya tema renkleri boşsa fonksiyonu durdur
    if (
      !canvas ||
      !isThemeLoaded ||
      Object.keys(currentThemeColors).length === 0
    ) {
      return;
    }

    // Tema değişkenlerini doğrudan currentThemeColors'tan kullan
    const bgColor = currentThemeColors["--background"] || "#f3f3f5"; // light teması için varsayılan fallback
    const spotlightColor = currentThemeColors["--spotlight"] || "#000000"; // light teması için varsayılan fallback

    function setCanvasSize() {
      if (!canvas) return; // Null check ekledik
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }

    // İlk çizimi yapmadan önce boyutu ayarla
    setCanvasSize();

    function draw(x: number, y: number) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bgColor; // Tema arka plan rengini kullan
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 900);
      gradient.addColorStop(0, spotlightColor); // Tema spot ışığı rengini kullan
      // Arka plan renginin şeffaf versiyonunu kullan (spot ışığının kenarlarının yumuşak geçişi için)
      gradient.addColorStop(1, hexToRgba(bgColor, 0));

      // Işık temasında spot ışığı siyah ise, "multiply" modunu kullan.
      // Bu, açık arka plan üzerinde siyahın daha belirgin görünmesini sağlar.
      // Diğer durumlarda "lighter" (parlatıcı) modu kullanmaya devam et.
      if (currentTheme === "light" && spotlightColor === "#000000") {
        ctx.globalCompositeOperation = "multiply";
      } else {
        ctx.globalCompositeOperation = "lighter";
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(x - 1050, y - 1050, 2100, 2100);
      // İşlem bittikten sonra kompozisyon modunu varsayılana (source-over) sıfırlamak iyi bir pratiktir.
      ctx.globalCompositeOperation = "source-over";
    }

    function handleMouseMove(e: MouseEvent) {
      draw(e.clientX, e.clientY);
    }

    // Başlangıçta ortadan çizimi yap
    draw(window.innerWidth / 2, window.innerHeight / 2);

    // Olay dinleyicilerini ekle
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      setCanvasSize();
      draw(window.innerWidth / 2, window.innerHeight / 2); // Boyut değişince ortadan tekrar çiz
    });

    // Temizleme fonksiyonu: Bileşen unmount edildiğinde olay dinleyicilerini kaldır
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, [currentTheme, isThemeLoaded, currentThemeColors]); // Bağımlılıkları güncellendi.
  // currentTheme, isThemeLoaded veya currentThemeColors değiştiğinde useEffect tekrar çalışır.

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none", // Canvas'ın fare olaylarını engellemesini sağlar
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
