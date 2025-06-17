// @/app/page.tsx
"use client"; // Bu satırın olduğundan emin olun
import { useState, useEffect } from "react";

import SideNavbar from "./components/SideNavbar";

import HomePage from "./components/HomePage/HomePage";
import AboutPage from "./components/AboutPage/AboutPage";
import ContactPage from "./components/ContactPage/ContactPage";
import PortfolioPage from "./components/PortfolioPage/PortfolioPage";

import TransitionOverlay from "./components/TransitionOverlay";
import ThemeSwitcher from "./components/ThemeSwitcher";
import Preloader from "./components/Preloader";

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
      const minLoadTime = 1000; // Minimum yükleme süresi (0.5 saniye)
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
    }, 300);
    setTimeout(() => {
      setShowOverlay(false);
    }, 1000);
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
        return <HomePage setPage={handlePageChange} />;
    }
  };

  return (
    <>
      <Preloader isAppReady={isAppReady} />
      <TransitionOverlay show={showOverlay} />
      <ThemeSwitcher />
      <SideNavbar currentPage={currentPage} setPage={handlePageChange} />
      <div className="page-content-wrapper">{renderCurrentPage()}</div>
    </>
  );
}
