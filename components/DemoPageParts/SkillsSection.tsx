import CircularProgressBar from "./CircularProgressBar";
import { useEffect, useState } from "react";


export default function SkillsSection() {

    const [primaryColor, setPrimaryColor] = useState("#000"); // default siyah

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement);
        const color = rootStyles.getPropertyValue("--primary").trim();
        setPrimaryColor(color || "#000"); // boşsa siyah koy
    }, []);



    return (
        <>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-6 gap-y-15 mb-20">
                <div className="col-span-full flex flex-col justify-center text-center">
                    <span className="text-4xl font-[Poppins] font-semibold text-[var(--foreground)]">
                        Grafik Tasarım
                    </span>
                    <hr className="mt-4 border-t-4 border-[var(--foreground)] rounded-full" />
                </div>
                <CircularProgressBar value={5} label="Adobe Photoshop" />
                <CircularProgressBar value={5} label="Adobe Illustrator" />
                <CircularProgressBar value={5} label="CorelDraw" />
                <CircularProgressBar value={4} label="Adobe Indesign" />
                <CircularProgressBar value={4} label="Blender (3D)" />
                <CircularProgressBar value={4} label="UX/UI Tasarımı" />
                <CircularProgressBar value={3} label="3ds Max (3D)" />
                <CircularProgressBar value={3} label="Adobe XD" />
                <CircularProgressBar value={2} label="Adobe After Effects" />
            </div>


            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-6 gap-y-15 mb-20">
                <div className="col-span-full flex flex-col justify-center text-center">
                    <span className="text-4xl font-[Poppins] font-semibold text-[var(--foreground)]">
                        Yazılım / Web Tasarım
                    </span>
                    <hr className="mt-4 border-t-4 border-[var(--foreground)] rounded-full" />
                </div>
                <CircularProgressBar value={5} label="HTML" />
                <CircularProgressBar value={5} label="CSS" />
                <CircularProgressBar value={5} label="Bootstrap" />
                <CircularProgressBar value={5} label="TailwindCSS" />
                <CircularProgressBar value={4} label="JavaScript" />
                <CircularProgressBar value={4} label="NodeJS" />
                <CircularProgressBar value={4} label="React" />
                <CircularProgressBar value={3} label="Python" />
            </div>
            <div className="p-4 grid grid-cols-2 sm:grid-cols-4 gap-6 gap-y-15 mb-30">
                <div className="col-span-full flex flex-col justify-center text-center">
                    <span className="text-4xl font-[Poppins] font-semibold text-[var(--foreground)]">
                        Harita
                    </span>
                    <hr className="mt-4 border-t-4 border-[var(--foreground)] rounded-full" />
                </div>
                <CircularProgressBar value={5} label="Saha Deneyimi" />
                <CircularProgressBar value={4} label="Autocad" />
                <CircularProgressBar value={4} label="ArcGIS" />
                <CircularProgressBar value={3} label="NetCAD" />
            </div>
        </>
    );
}
