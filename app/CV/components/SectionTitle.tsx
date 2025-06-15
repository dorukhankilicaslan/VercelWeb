// @/components/SectionTitle.tsx
import React from "react";

export default function SectionTitle({ title }: { title: string | null }) {
  return (
    <div className="md:hidden mt-10 mb-4">
      <div className="flex flex-col justify-center items-center">
        <span className="text-shadow-xl text-xl font-semibold text-[var(--foreground)] ">{title}</span>
      </div>
      <hr className="border-t-2 mt-1 border-[var(--foreground)] rounded-full" />
    </div>
  );
}
