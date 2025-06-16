"use client";
import { useState, useEffect } from "react";
import { Home, Settings, LogOut } from "lucide-react";

import Preloader from "./PreLoader";

import SidebarItem from "./SidebarItem";
import AdminNavbar from "./AdminNavbar";

export default function AdminPageClient() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const startTime = Date.now();
      let pageFromStorage = "#home"; // Varsayılan sayfa

      if (typeof window !== "undefined") {
        const savedPage = localStorage.getItem("currentPage");
        if (savedPage) {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          pageFromStorage = savedPage;
        }
      }
      const timeElapsed = Date.now() - startTime;
      const minLoadTime = 1000; // Minimum yükleme süresi (0.5 saniye)
      const remainingTime = Math.max(0, minLoadTime - timeElapsed);

      setTimeout(() => {
        setIsAppReady(true); // Uygulama hazır, preloader animasyonla çıkabilir
      }, remainingTime);
    };
    initializeApp();
  }, []); // Boş bağımlılık dizisi: sadece bileşen mount olduğunda çalışır

  return (
    <>
      <Preloader isAppReady={isAppReady} />
      <div
        className="flex h-screen bg-[var(--background)] text-[var(--foreground)] min-w-[100vw]
    "
      >
        <aside
          className={`
          flex flex-col h-full bg-[var(--sidebar-bg)] shadow-md
          border-r-1 border-[var(--border)]
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "basis-[250px]" : "basis-[70px]"}
          overflow-hidden
        `}
        >
          <div className="flex flex-col h-full">
            <div
              className="flex h-[42px] w-full justify-center items-center
          text-[var(--foreground)] bg-[var(--navbar-bg)] text-nowrap"
            >
              {sidebarOpen ? <span>Open Test</span> : <span>Test</span>}
            </div>
            <nav className="flex-1 flex flex-col gap-4 ml-4 mt-4">
              <SidebarItem
                icon={<Home size={20} />}
                label="Anasayfa"
                sidebarOpen={sidebarOpen}
              />
              <SidebarItem
                icon={<Settings size={20} />}
                label="Ayarlar"
                sidebarOpen={sidebarOpen}
              />
              <SidebarItem
                icon={<LogOut size={20} />}
                label="Çıkış Yap"
                sidebarOpen={sidebarOpen}
              />
            </nav>
          </div>
        </aside>

        <main className="flex-1 overflow-auto">
          <header>
            <AdminNavbar
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </header>
          <section className="p-6">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p>İçerik buraya gelecek...</p>
          </section>
        </main>
      </div>
    </>
  );
}
