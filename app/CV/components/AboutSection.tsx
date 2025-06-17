// @/components/AboutSection.tsx
import React from "react";
import { useLocalization } from "./LocalizationProvider";

export default function AboutSection({
  aboutRef,
}: {
  aboutRef: React.RefObject<HTMLElement | null>;
}) {
  const { db, locale } = useLocalization();

  const defaultText = `Tasarım, yazılım ve 3D modelleme gibi farklı alanlarda üretim yapmaktan keyif alıyorum. Görsel estetikle teknik çözüm üretmenin kesiştiği alanlarda çalışmak, hem yaratıcı hem de analitik düşünmemi sağlıyor.\n\nGrafik tasarım, web arayüz geliştirme ve 3D görselleştirme alanlarında aktifim. React, Blender, Illustrator gibi araçlarla kullanıcı odaklı, modern ve işlevsel projeler geliştiriyorum. Estetik anlayışımı, kullanıcı deneyimi ilkeleriyle birleştirerek dijital ürünler ortaya koyuyorum.\n\nDisiplinler arası bakış açısına ve farklı sektörlerde edindiğim deneyimlere sahibim. Hem yaratıcı hem teknik süreçlerde rol almak, detaylara verdiğim önemin yanı sıra ekip içi uyum ve hızlı adaptasyon kabiliyetimi de öne çıkarıyor.\n\nKariyerimi tasarım ile teknolojinin buluştuğu alanda ilerletmek istiyorum. Yeni araçlar öğrenmeye, farklı projelerde sorumluluk almaya ve her üretim sürecinde gelişmeye istekliyim. Merak, tutku ve öğrenme motivasyonu benim için ön planda.`;

  return (
    <section
      id="about"
      ref={aboutRef}
      className="
      
      flex flex-col justify-center items-center md:min-h-screen scroll-mt-[40px]
      text-[var(--foreground)] opacity-80"
    >
      <div className="px-0 lg:px-4 ">
        <p
          className="
          
          whitespace-pre-line text-[var(--foreground)]
        lg:mt-8 xl:mt-[-0.5rem]
        lg:leading-5 xl:leading-6.5 2xl:leading-8
        lg:max-h-screen 
        text-sm md:text-sm lg:text-base xl:text-lg"
        >
          {db?.about?.[locale]?.description || defaultText}
        </p>
      </div>
    </section>
  );
}
