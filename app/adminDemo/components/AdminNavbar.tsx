// app/admin/components/AdminNavbar.tsx (Sadece örnek, mevcut AdminNavbar kodunuzu kullanın ve ThemeSwitcherButton'ı ekleyin)
"use client";

import { Menu } from "lucide-react";
import ThemeSwitcherButton from "./ThemeSwitcherButton"; // Yeni eklenen import

interface AdminNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminNavbar({
  sidebarOpen,
  setSidebarOpen,
}: AdminNavbarProps) {
  return (
    <div className="flex justify-between items-center h-[42px] px-4 bg-[var(--navbar-bg)] text-[var(--foreground)] shadow-sm border-b border-[var(--border)]">
      <button onClick={() => setSidebarOpen(!sidebarOpen)}>
        <Menu size={24} />
      </button>
      <div className="flex items-center gap-4">
        {/* Diğer navbar öğeleri buraya gelebilir */}
        <ThemeSwitcherButton /> {/* Tema değiştirici düğmesini ekledik */}
      </div>
    </div>
  );
}
