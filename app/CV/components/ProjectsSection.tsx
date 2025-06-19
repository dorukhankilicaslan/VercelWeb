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
      className="min-h-screen w-full py-0 md:py-5 xl:scroll-mt-0 md:mt-10 lg:mt-20
      bg-transparent text-[var(--foreground)]"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-0 md:gap-4">
        <ProjectCard
          title="Instagram Sayfası Post Tasarımı"
          description="Instagramda yayınlanmak üzere tasarımını Adobe Illustrator'de hazırlayıp, 3D Modelini Blender'da oluşturduğum bir proje."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264777/Instagram-02_txl5mp.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264778/Instagram-01_eexwnm.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264778/Instagram-03_x27q5b.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264781/Instagram-04_vsa4ge.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264780/Instagram-05_bffykq.png",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264777/Instagram-02_txl5mp.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264778/Instagram-01_eexwnm.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264778/Instagram-03_x27q5b.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264781/Instagram-04_vsa4ge.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264780/Instagram-05_bffykq.png",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Axial Temizlik Tozu"
          description="Şişe etiketi çalışması."
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
          title="Jupiter Barkod"
          description="Islak Mendil ve Katalog kapağı."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264773/1_ls82zc.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264774/2_ixpmd1.jpg",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264773/1_ls82zc.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264774/2_ixpmd1.jpg",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Fomy Temizlik Köpüğü"
          description="Katalog, Koli ve Ürün Etiketi tasarımı."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264775/1_xefwyo.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264776/2_crzjac.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264777/3_rtpwv6.jpg",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264775/1_xefwyo.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264776/2_crzjac.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264777/3_rtpwv6.jpg",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Yakut"
          description="Gıda markası için ürün etiketi tasarımı."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264775/2_f8such.jpg",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264775/3_jbtwby.jpg",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264775/2_f8such.jpg",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264775/3_jbtwby.jpg",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Winkiki"
          description="Karton etiket tasarımı ve montajı."
          gallery={[
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264773/1_wuyfrw.png",
            "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264774/2_sunxog.png",
          ]}
          onGalleryClick={(index) =>
            handleGalleryClick(
              [
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264773/1_wuyfrw.png",
                "https://res.cloudinary.com/ds4suhwnb/image/upload/v1750264774/2_sunxog.png",
              ],
              index
            )
          }
        />
        <ProjectCard
          title="Kanatçı Ezo"
          description="Menü ve Magnet tasarımı."
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
