import { FaBriefcase, FaGraduationCap } from "react-icons/fa";
import ExperienceItem from "./ExperienceItem";

export default function ExperienceList() {
    return (
        <div className="grid grid-cols-1 pb-20">
            <ul>
                <ExperienceItem
                    icon={<FaBriefcase size={20} />}
                    date="2021 - 2025"
                    title="Tasarımcı & Yazılımcı"
                    place="Freelance "
                    description="UI/UX tasarımı, logo ve web geliştirme projeleri yürüttüm.
React, TypeScript, TailwindCSS ile responsive web uygulamaları geliştirdim.
Tasarım, kodlama ve müşteri iletişimini birlikte yönettim."
                />
                <ExperienceItem
                    icon={<FaBriefcase size={20} />}
                    date="2018 - 2021"
                    title="Grafik Tasarımcı"
                    place="Ratu Medya & Matbaa"
                    description="Kurumsal kimlik, matbaa ve dijital tasarımlar hazırladım.
Adobe programlarıyla özgün görseller ve sosyal medya içerikleri ürettim.
Müşteri ihtiyaçlarına uygun yaratıcı çözümler sundum."
                />
                <ExperienceItem
                    icon={<FaBriefcase size={20} />}
                    date="2017 - 2018"
                    title="Grafik Tasarımcı"
                    place="Jupiter Barkod & Kırtasiye"
                    description="Kurumsal tasarımlar, reklam materyalleri ve sosyal medya görselleri hazırladım.
Photoshop, Illustrator ve CorelDRAW kullandım.
Müşteri iletişimi ve zamanında teslim konusunda sorumluluk aldım."
                />
                <ExperienceItem
                    icon={<FaBriefcase size={20} />}
                    date="2016 - 2017"
                    title="Harita Teknikeri"
                    place="Göktürk Harita"
                    description="AutoCAD ve NetCAD ile sayısal harita projeleri hazırladım.
GNSS ve Total Station ile arazi ölçümlerine katıldım.
ArcGIS ile coğrafi veri analizi ve haritalama yaptım."
                />
                <ExperienceItem
                    icon={<FaGraduationCap />}
                    date="2014 - 2016"
                    title="Harita ve Kadastro (Önlisans)"
                    place="Yıldız Teknik Üniversitesi"
                    description="AutoCAD, arazi ölçümü, sayısallaştırma gibi teknik çizim ve aplikasyon ağırlıklı uygulamalı eğitim aldım."
                />
                <ExperienceItem
                    icon={<FaGraduationCap />}
                    date="2009 - 2013"
                    title="İnşaat Teknolojisi"
                    place="İ.S.O.V Mesleki ve Teknik Anadolu Lisesi"
                    description="Temel mühendislik bilgileri, teknik resim, yapı teknolojileri ve şantiye uygulamaları üzerine mesleki eğitim aldım."
                />
            </ul>
        </div>
    );
}
