"use client";
import { useState } from "react";
import {
  Home,
  Settings,
  ChartNoAxesCombined,
  PanelsTopLeft,
  BookOpenText,
  Palette,
  FolderKanban,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import AdminNavbar from "./AdminNavbar";
import { usePathname } from "next/navigation";

import ProjectsPage from "../projects/page";
import StaticsPage from "../statics/page";
import ContentsPage from "../contents/page";
import ThemesPage from "../themes/page";
import PagesPage from "../pages/page";
import SettingsPage from "../settings/page";

export default function AdminPageClient() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  const renderContent = () => {
    if (pathname === "/admin" || pathname === "/admin/") {
      return (
        <>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p>Hoş geldin! Buradan içerik yönetebilirsin.</p>
        </>
      );
    }

    if (pathname === "/admin/statics") {
      return <StaticsPage key={pathname} />;
    }
    if (pathname === "/admin/projects") {
      return <ProjectsPage key={pathname} />;
    }
    if (pathname === "/admin/pages") {
      return <PagesPage key={pathname} />;
    }
    if (pathname === "/admin/contents") {
      return <ContentsPage key={pathname} />;
    }
    if (pathname === "/admin/themes") {
      return <ThemesPage key={pathname} />;
    }

    if (pathname === "/admin/settings") {
      return <SettingsPage key={pathname} />;
    }

    return (
      <>
        <h1 className="text-2xl font-bold">404</h1>
        <p>Bu sayfa bulunamadı.</p>
      </>
    );
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] min-w-[100vw]">
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
          <nav className="flex-1 flex flex-col justify-between">
            <div className="flex-1 flex flex-col gap-4 ml-4 mt-4">
              <SidebarItem
                icon={<Home size={20} />}
                label="Anasayfa"
                sidebarOpen={sidebarOpen}
                href="/admin"
              />
              <SidebarItem
                icon={<ChartNoAxesCombined size={20} />}
                label="İstatistikler"
                sidebarOpen={sidebarOpen}
                href="/admin/statics"
              />
              <SidebarItem
                icon={<FolderKanban size={20} />}
                label="Projeler"
                sidebarOpen={sidebarOpen}
                href="/admin/projects"
              />
              <SidebarItem
                icon={<PanelsTopLeft size={20} />}
                label="Sayfalar"
                sidebarOpen={sidebarOpen}
                href="/admin/pages"
              />
              <SidebarItem
                icon={<BookOpenText size={20} />}
                label="İçerikler"
                sidebarOpen={sidebarOpen}
                href="/admin/contents"
              />
              <SidebarItem
                icon={<Palette size={20} />}
                label="Temalar"
                sidebarOpen={sidebarOpen}
                href="/admin/themes"
              />
            </div>
            <div className="flex-1 gap-4 ml-4 mt-4">
              <SidebarItem
                icon={<Settings size={20} />}
                label="Ayarlar"
                sidebarOpen={sidebarOpen}
                href="/admin/settings"
              />
            </div>
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

        <section className="p-6">{renderContent()}</section>
      </main>
    </div>
  );
}
