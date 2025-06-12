// @/app/page.tsx
"use client";
import { useEffect, useRef, useState } from "react";

import SpotlightBackground from "@/components/OnePageParts/SpotlightBackground";

import AboutSection from "@/components/OnePageParts/AboutSection";
import ExperienceSection from "@/components/OnePageParts/ExperienceSection";
import ProjectsSection from "@/components/OnePageParts/ProjectsSection";

import Sidebar from "@/components/OnePageParts/Sidebar";
import Footer from "@/components/OnePageParts/Footer";

import SectionTitle from "@/components/OnePageParts/SectionTitle";

import "./globals.css";

export default function OnePageCV() {
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    event.preventDefault();
    window.scrollBy({ top: event.deltaY, behavior: "smooth" });
  });

  useEffect(() => {
    const sectionRefs = [
      { id: "about", ref: aboutRef },
      { id: "experience", ref: experienceRef },
      { id: "projects", ref: projectsRef },
      { id: "contact", ref: contactRef },
    ];

    const observer = new window.IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => ({
            id: sectionRefs.find((s) => s.ref.current === entry.target)?.id,
            top: entry.boundingClientRect.top,
          }))
          .filter((s) => s.id);

        if (visibleSections.length > 0) {
          visibleSections.sort((a, b) => a.top - b.top);
          setActiveSection(visibleSections[0].id!);
        }
      },
      { threshold: 0.25 }
    );

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SpotlightBackground />
      <div className="md:flex justify-center h-screen mt-20 md:mt-0">
        <div className="px-4 md:pl-8 lg:pl-16">
          <Sidebar activeSection={activeSection} />
        </div>
        <main
          className="flex-1 h-screen
          md:overflow-y-scroll md:scroll-smooth
          px-4 md:px-8 xl:px-16"
        >
          <SectionTitle title="Hakkımda" />
          <AboutSection aboutRef={aboutRef} />

          <SectionTitle title="İş Deneyimlerim" />
          <ExperienceSection experienceRef={experienceRef} />

          <SectionTitle title="Projelerim" />
          <ProjectsSection projectsRef={projectsRef} />
          <Footer />
        </main>
      </div>
    </>
  );
}
