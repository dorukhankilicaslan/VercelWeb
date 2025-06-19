// app/admin/layout.tsx
"use client";

import { useState } from "react";
import ThemeProvider, { ThemeName, ThemeColors } from "@/app/ThemeProvider";
import cvThemesDataJson from "@/styles/cv2-themes.json";
import AdminNavbar from "./components/AdminNavbar";
import SidebarItem from "./components/SidebarItem";
import {
  Home,
  Settings,
  ChartNoAxesCombined,
  PanelsTopLeft,
  BookOpenText,
  Palette,
  FolderKanban,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const themeData: Record<ThemeName, ThemeColors> = cvThemesDataJson as Record<
    ThemeName,
    ThemeColors
  >;

  return (
    <ThemeProvider themeData={themeData} localStorageKey="adminTheme">
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

          <section className="p-6">{children}</section>
        </main>
      </div>
    </ThemeProvider>
  );
}
