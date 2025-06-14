"use client";

import { useState } from "react";

export default function AdminPageClient() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Sidebar */}
      <aside
        className={`
          flex flex-col h-full bg-[var(--sidebar-bg)] shadow-md
          transition-[flex-basis] duration-300 ease-in-out
          ${sidebarOpen ? "flex-basis-[20%]" : "flex-basis-[5%]"}
          min-w-[60px] max-w-[300px]
        `}
      >
        <div className="p-4 flex flex-col h-full">
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className="mb-4 text-left text-sm"
          >
            {sidebarOpen ? "◀ Kapat" : "▶"}
          </button>
          <div className="flex-1 overflow-auto">Sidebar İçeriği</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">
        <header className="mb-4">Navbar buraya</header>
        <section>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p>İçerik buraya gelecek...</p>
        </section>
      </main>
    </div>
  );
}
