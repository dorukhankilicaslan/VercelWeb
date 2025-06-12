// @/components/ProjectsSection.tsx
import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

interface ProjectsSectionProps {
  projectsRef: React.RefObject<HTMLElement | null>;
}

export default function ProjectsSection({ projectsRef }: ProjectsSectionProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState<{ src: string }[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const handleGalleryClick = (gallery: string[], index: number) => {
    setLightboxSlides(gallery.map((src) => ({ src })));
    setLightboxIndex(index);
    setModalOpen(true);
  };

  return (
    <section
      id="projects"
      ref={projectsRef}
      className="min-h-screen w-full py-0 md:py-5 scroll-mt-20
      bg-transparent text-[var(--background)] dark:text-[var(--foreground)]"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-0 md:gap-4">
        <ProjectCard
          title="Instagram Sayfası Post Tasarımı"
          description="Instagramda yayınlanmak üzere tasarımını Adobe Illustrator'de hazırlayıp, 3D Modelini Blender'da oluşturduğum bir proje."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080954/RollupRender_y6g1wb.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/KartvizitRender_xudxkp.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/UsbBoxRender_ayj3tw.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080945/MagnetRender_ihkr4j.png",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080954/RollupRender_y6g1wb.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/KartvizitRender_xudxkp.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080950/UsbBoxRender_ayj3tw.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749080945/MagnetRender_ihkr4j.png",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Instagram Sayfası Post Tasarımı"
          description="Axial adlı temizlik tozu ürününe ait şişe etiketi çalışması. Adobe Illustrator ve Photoshop kullanılarak hazırlanmıştır."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/3_bytrzt.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/2_unrngc.jpg",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/3_bytrzt.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088652/2_unrngc.jpg",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Instagram Sayfası Post Tasarımı"
          description="Kanatçı Ezo isimli restorana ait menü tasarımı. Adobe Illustrator ve Photoshop kullanılarak hazırlanmıştır."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_ArkaKapak_ke3bvq.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_OnKapakTest2_s0yyqi.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088556/1_Magnet_us2k6a.jpg",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_ArkaKapak_ke3bvq.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088557/1_OnKapakTest2_s0yyqi.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1749088556/1_Magnet_us2k6a.jpg",
              ],
              index
            )
          }
        />
      </div>

      <Lightbox
        open={modalOpen}
        close={() => setModalOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Zoom]}
        on={{
          view: ({ index }) => setLightboxIndex(index),
        }}
      />
    </section>
  );
}
