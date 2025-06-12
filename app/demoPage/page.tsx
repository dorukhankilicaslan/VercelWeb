// @/app/page.tsx
"use client"; // Bu satırın olduğundan emin olun

import SideNavbar from "@/components/DemoPageParts/SideNavbar";
import HomePage from "@/pages/HomePage/HomePage";
import AboutPage from "@/pages/AboutPage/AboutPage";
import ContactPage from "@/pages/ContactPage/ContactPage";
import PortfolioPage from "@/pages/PortfolioPage/PortfolioPage";

import TransitionOverlay from "@/components/DemoPageParts/TransitionOverlay";

import Preloader from "@/components/DemoPageParts/Preloader";

import { useState, useEffect } from "react";

export default function App() {
  // localStorage'dan başlangıç sayfasını oku veya varsayılan olarak #home kullan
  // State'i varsayılan bir değerle başlat, hidrasyon sonrası localStorage'dan güncelle
  const [currentPage, setPage] = useState("#home");
  const [showOverlay, setShowOverlay] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  // Bileşen mount olduktan sonra localStorage'dan değeri oku ve state'i güncelle.
  useEffect(() => {
    const initializeApp = async () => {
      const startTime = Date.now();
      let pageFromStorage = "#home"; // Varsayılan sayfa

      if (typeof window !== "undefined") {
        const savedPage = localStorage.getItem("currentPage");
        if (savedPage) {
          pageFromStorage = savedPage;
        }
      }
      setPage(pageFromStorage);
      const timeElapsed = Date.now() - startTime;
      const minLoadTime = 500; // Minimum yükleme süresi (0.5 saniye)
      const remainingTime = Math.max(0, minLoadTime - timeElapsed);

      setTimeout(() => {
        setIsAppReady(true); // Uygulama hazır, preloader animasyonla çıkabilir
      }, remainingTime);
    };
    initializeApp();
  }, []); // Boş bağımlılık dizisi: sadece bileşen mount olduğunda çalışır

  // currentPage her değiştiğinde localStorage'a kaydet.
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentPage", currentPage);
    }
  }, [currentPage]); // currentPage değiştiğinde localStorage'ı güncelle
  const handlePageChange = (page: string) => {
    // perdeyi indir
    setShowOverlay(true);

    // 500ms sonra sayfayı değiştir ve perdeyi kaldır
    setTimeout(() => {
      setPage(page);
      setShowOverlay(false);
    }, 500);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "#home":
        return <HomePage setPage={handlePageChange} />;
      case "#about":
        return <AboutPage />;
      case "#portfolio":
        return <PortfolioPage />;
      case "#contact":
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <>
      <Preloader isAppReady={isAppReady} />
      {isAppReady && (
        <>
          <TransitionOverlay show={showOverlay} />
          <SideNavbar currentPage={currentPage} setPage={handlePageChange} />
          <div className="page-content-wrapper">{renderCurrentPage()}</div>
        </>
      )}
    </>
  );
}
