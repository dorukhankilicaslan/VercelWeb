// @/app/OnePageCV/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import "./styles.css";

import AboutSection from "@/app/CV/components/AboutSection";
import ExperienceSection from "@/app/CV/components/ExperienceSection";
import ProjectsSection from "@/app/CV/components/ProjectsSection";

import Sidebar from "@/app/CV/components/Sidebar";
import Footer from "@/app/CV/components/Footer";

import SectionTitle from "@/app/CV/components/SectionTitle";

import LoadingOverlay from "@/app/CV/components/LoadingOverlay";

export default function OnePageCV() {
  const aboutRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    localStorage.setItem("theme", "dark");
  }, []);

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
      <LoadingOverlay />

      <div className="md:flex justify-center h-screen mt-20 md:mt-0">
        <div className="px-4 md:pl-8 lg:pl-16">
          <Sidebar activeSection={activeSection} />
        </div>
        <main className="flex-1 h-screen md:overflow-y-scroll md:scroll-smooth px-4 md:px-8 xl:px-16 ">
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
