// app/admin/components/SidebarItem.tsx

"use client";

import { ReactNode } from "react";
import Link from "next/link";

type SidebarItemProps = {
  icon: ReactNode;
  label: string;
  sidebarOpen: boolean;
  href: string; // Eklendi
};

export default function SidebarItem({
  icon,
  label,
  sidebarOpen,
  href,
}: SidebarItemProps) {
  return (
    <Link href={href}>
      <div
        className="flex items-center gap-2 cursor-pointer p-2 hover:bg-[var(--sidebar-hover)] rounded-md transition-all duration-300"
        title={!sidebarOpen ? label : ""}
      >
        <span className="text-xl">{icon}</span>
        <span
          className={`
            text-sm transition-opacity duration-300 
            ${
              sidebarOpen
                ? "opacity-100 delay-200"
                : "opacity-0 w-0 overflow-hidden"
            }
            whitespace-nowrap
          `}
        >
          {label}
        </span>
      </div>
    </Link>
  );
}
