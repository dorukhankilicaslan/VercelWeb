// src/pages/PortfolioPage/PortfolioPage.tsx

import React from "react";
import Gallery from "@/components/Gallery";
import portfolioData from "@/data/portfolioData.json"; // JSON dosyasını import et

// ImageItem arayüzünü burada da tanımlayalım veya ayrı bir types.ts dosyasında tutalım
interface ImageItem {
  src: string;
  thumbnailSrc: string;
  alt: string;
  caption: string;
  width?: number;
  height?: number;
}

interface ProjectData {
  id: string;
  "firm-name": string;
  "project-desc": string;
  "project-images": Omit<ImageItem, "width" | "height">[]; // Boyutlar sonra eklenecek
}

const PortfolioPage: React.FC = () => {
  const projects: ProjectData[] = portfolioData as ProjectData[];

  return (
    <div className="relative min-h-screen bg-[var(--background)] overflow-y-auto overflow-x-hidden font-[poppins]">
      <h1 className="isolate justify-self-center text-center grid place-items-center mb-10 pt-25 sm:pt-10">
        <span className="col-start-1 row-start-1 text-6xl sm:text-9xl font-black text-[var(--passive)] z-0">
          PORTFOLIO
        </span>
        <span className="col-start-1 row-start-1 text-4xl sm:text-6xl font-black text-[var(--foreground)] z-1">
          ÇALIŞMALAR<span className="text-[var(--primary)]">IM</span>
        </span>
      </h1>
      {projects.map((project) => (
        <div
          key={project.id}
          className="mx-5 lg:mx-30 my-10 bg-[var(--passive)] rounded-2xl p-[1rem]"
        >
          <div className="w-full max-w-7xl mx-auto">
            <div className="col-span-full flex flex-col justify-center text-center mb-4">
              {" "}
              {/* Başlık ve çizgi arasına boşluk */}
              <h2 className="flex flex-col text-lg font-[Poppins] font-semibold text-[var(--foreground)] md:text-2xl">
                <span className="text-nowrap">{project["firm-name"]}</span>
                <span className="md:ml-6 text-lg font-normal opacity-80">
                  {project["project-desc"]}
                </span>
              </h2>
              <hr className="mt-1 border-t-2 border-[var(--foreground)] opacity-50 rounded-full" />
            </div>
            {/* Gallery bileşenine o projeye ait resimleri gönder */}
            <Gallery
              galleryId={project.id}
              initialImages={project["project-images"]}
            />
          </div>
        </div>
      ))}
      <div className="h-20"></div> {/* En altta biraz boşluk bırakır */}
    </div>
  );
};

export default PortfolioPage;
