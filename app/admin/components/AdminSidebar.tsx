"use client";

import { Home, Settings, LogOut } from "lucide-react";
import SidebarItem from "./SidebarItem";

export default function AdminSidebar(sidebarOpen: boolean) {
  return (
    <nav className="flex-1 flex flex-col gap-4">
      <SidebarItem
        icon={<Home size={20} />}
        label="Anasayfa"
        sidebarOpen={sidebarOpen}
        href="#home"
      />
      <SidebarItem
        icon={<Settings size={20} />}
        label="Ayarlar"
        sidebarOpen={sidebarOpen}
        href="#settings"
      />
      <SidebarItem
        icon={<LogOut size={20} />}
        label="Çıkış Yap"
        sidebarOpen={sidebarOpen}
        href="#logout"
      />
    </nav>
  );
}
