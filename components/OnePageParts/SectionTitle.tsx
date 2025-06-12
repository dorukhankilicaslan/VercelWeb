// @/components/SectionTitle.tsx
import React from "react";

export default function SectionTitle({ title }: { title: string | null }) {
  return (
    <div className="md:hidden mt-6 mb-4">
      <div className="flex flex-col justify-center items-center">
        <span className="text-shadow-xl text-xl font-semibold ">{title}</span>
      </div>
      <hr className="border-t-2 mt-1 rounded-full" />
    </div>
  );
}
