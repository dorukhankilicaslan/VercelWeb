// components/ExperienceItem.tsx
import React from "react";

interface ExperienceItemProps {
    icon: React.ReactNode;  // İkon JSX olarak geçilecek
    date: string;
    title: string;
    place: string;
    description: string;
}

export default function ExperienceItem({
    icon,
    date,
    title,
    place,
    description,
}: ExperienceItemProps) {
    return (
        <li className="relative mb-8 last:mb-0 pl-14">
            <span className="absolute top-0 left-7 bottom-0 border-l-2 border- border-[var(--passive)]"></span>

            <div className="flex space-x-4 mb-2 relative -ml-10">
                <div className="text-[var(--foreground)] text-2xl bg-[var(--primary)] rounded-full border border-[var(--primary)]
                 w-10 h-10 flex items-center justify-center -ml-2">
                    {icon}
                </div>

                <span className="font-open-sans uppercase text-sm font-semibold text-[var(--foreground)] px-2 py-1 rounded-full">
                    {date}
                </span>
            </div>

            <h5 className="font-poppins uppercase font-semibold text-lg relative">
                {title}{" "}
                <span className="font-open-sans text-sm font-normal text-[var(--foreground)] opacity-90">
                    {place}
                </span>
            </h5>

            <p className="font-open-sans mt-2 text-[var(--foreground)] text-lg relative">
                {description}
            </p>

        </li>
    );
}
