// @/components/ExperienceSection.tsx
import React, { useState } from "react";
import ExperienceCard from "./ExperienceCard";

interface ExperienceSectionProps {
  experienceRef: React.RefObject<HTMLElement | null>;
}

export default function ExperienceSection({
  experienceRef,
}: ExperienceSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const experiences = [
    {
      position: "Tasarım & Yazılım",
      company: "Freelance",
      companyUrl: "https://dorukhankilicaslan.github.io",
      date: "2021 - Günümüz",
      description:
        "UI/UX tasarım, web geliştirme, logo ve kurumsal kimlik tasarımı gibi alanlarda freelance projeler yürütüyorum. React, HTML/CSS, JavaScript ve grafik araçlarıyla müşterilere özel çözümler geliştiriyorum.",
      technologies: ["React", "TypeScript", "TailwindCSS"],
    },
    {
      position: "Grafik Tasarımcı",
      company: "Ratu Medya & Matbaa",
      companyUrl: "https://ratumedya.com/",
      date: "2018 - 2021",
      description:
        "Kurumsal kimlik, katalog, sosyal medya içerikleri ve baskı materyallerinin tasarımından sorumluydum. Adobe Illustrator, Photoshop ve CorelDRAW gibi araçları aktif olarak kullandım.",
      technologies: ["Illustrator", "Photoshop", "Blender"],
    },
    {
      position: "Grafik Tasarımcı",
      company: "Jupiter Barkod & Kırtasiye",
      companyUrl:
        "https://www.sozcu.com.tr/istanbulun-kirtasiye-devi-batti-wp2658705/",
      date: "2017 - 2018",
      description:
        "Kurumsal kimlik, katalog, sosyal medya içerikleri ve baskı materyallerinin tasarımından sorumluydum. Adobe Illustrator, Photoshop ve CorelDRAW gibi araçları aktif olarak kullandım.",
      technologies: ["Illustrator", "Photoshop", "CorelDRAW"],
    },
    {
      position: "Harita Teknikeri",
      company: "Göktürk Harita Mühendislik",
      companyUrl: "https://gokturkharita.com/tr",
      date: "2016 - 2017",
      description:
        "Harita kadastro projelerinde sahadan gelen verilerin AutoCAD ile dijital ortama aktarılması ve pafta düzenlemeleri gibi teknik işlerde görev aldım.",
      technologies: [
        "AutoCAD",
        "NetCAD",
        "ArcGIS",
        "Total Station (Laica)",
        "Spectra GNSS",
        "Nivo",
      ],
    },
    {
      position: "Öğrenci",
      company: "Yıldız Teknik Üniversitesi",
      companyUrl: "https://www.yildiz.edu.tr/",
      date: "2014 - 2016",
      description:
        "Harita kadastro projelerinde sahadan gelen verilerin AutoCAD ile dijital ortama aktarılması ve pafta düzenlemeleri gibi teknik işlerde görev aldım.",
      technologies: ["AutoCAD", "ArcGIS", "Total Station", "Nivo"],
    },
  ];

  /*useEffect(() => {
    console.log("experienceRef.current", experienceRef.current);
  }, [experienceRef]);*/

  return (
    <section
      id="experience"
      ref={experienceRef}
      className="min-h-screen w-full scroll-mt-14
      bg-transparent dark:bg-transparent text-[var(--background)] dark:text-[var(--foreground)]"
    >
      <div className="flex flex-col gap-0 md:gap-4 max-w-5xl mx-auto">
        {experiences.map((exp, i) => (
          <ExperienceCard
            key={i}
            {...exp}
            isActive={activeIndex === i}
            isInactive={activeIndex !== null && activeIndex !== i}
            onHover={() => setActiveIndex(i)}
            onBlur={() => setActiveIndex(null)}
          />
        ))}
      </div>
    </section>
  );
}
