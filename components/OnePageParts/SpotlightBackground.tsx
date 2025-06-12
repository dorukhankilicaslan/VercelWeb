"use client";
import { useEffect, useRef } from "react";

export default function SpotlightBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  function getColorVar(name: string, fallback: string) {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue(name)
      .trim();
    return value && value !== "" ? value : fallback;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    function setCanvasSize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
    }

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    function draw(x: number, y: number) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Her zaman fallback ile oku
      const bgColor = getColorVar("--background", "#0a192f");
      const spotlightColor = getColorVar("--spotlight", "#94a3b8");

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 900);
      gradient.addColorStop(0, spotlightColor);
      gradient.addColorStop(1, hexToRgba(bgColor, 0));
      ctx.globalCompositeOperation = "lighter";
      ctx.fillStyle = gradient;
      ctx.fillRect(x - 700, y - 700, 1400, 1400);
      ctx.globalCompositeOperation = "source-over";
    }

    function handleMouseMove(e: MouseEvent) {
      draw(e.clientX, e.clientY);
    }

    draw(window.innerWidth / 2, window.innerHeight / 2);
    window.addEventListener("mousemove", handleMouseMove);

    window.addEventListener("resize", () => {
      setCanvasSize();
      draw(window.innerWidth / 2, window.innerHeight / 2);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  // HEX -> RGBA yardımcı fonksiyonu
  function hexToRgba(hex: string, alpha: number) {
    let c = hex.replace("#", "").trim();
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}
