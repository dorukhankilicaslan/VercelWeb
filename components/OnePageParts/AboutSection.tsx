// @/components/AboutSection.tsx
import React from "react";
import { useLocalization } from "./LocalizationProvider";

export default function AboutSection({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement | null>;
}) {
  const { db, locale } = useLocalization();

  return (
    <section
      id="about"
      ref={aboutRef}
      className="flex flex-col justify-center items-center md:min-h-screen scroll-mt-[40px]
      text-[var(--background)] dark:text-[var(--foreground)] opacity-80 mb-4"
    >
      <div className="px-0 lg:px-4">
        <p
          className="whitespace-pre-line 
        lg:mt-8 xl:mt-[-0.5rem]
        lg:leading-5 xl:leading-8 
        lg:max-h-screen 
        text-sm md:text-sm lg:text-base xl:text-base"
        >
          {db?.about?.[locale]?.description || ""}
        </p>
      </div>
    </section>
  );
}
