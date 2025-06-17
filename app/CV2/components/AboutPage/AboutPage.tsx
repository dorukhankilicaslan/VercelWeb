// @/components/AboutPage/AboutPage.tsx
"use client";
import React, { forwardRef } from "react";

import PersonalInfo from "../PersonalInfo";
import ExperienceSection from "../ExpirenceSection";
import SkillsSection from "../SkillsSection";

const AboutPage = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="px-5 md:px-10 lg:px-25 font-[poppins]">
      <h1 className="isolate justify-self-center text-center grid place-items-center mb-10 pt-25 sm:pt-10">
        <span className="col-start-1 row-start-1 text-7xl sm:text-9xl font-black text-[var(--foreground)]/10 z-0">
          RESUME
        </span>
        <span className="col-start-1 row-start-1 text-5xl sm:text-6xl font-black text-[var(--foreground)] z-1">
          <span className="text-[var(--primary)]">ÖZ</span>GEÇMİŞ
        </span>
      </h1>

      <PersonalInfo />
      <SkillsSection />
      <ExperienceSection />
    </div>
  );
});

AboutPage.displayName = "AboutPage";
export default AboutPage;
