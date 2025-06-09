// @/components/SlidingButton.tsx
import { FaArrowRight } from "react-icons/fa";


export default function SlidingButton() {
    return (
        <a
            href="#test"
            className="group relative inline-flex h-13 items-center justify-center rounded-full pl-6 pr-14 font-medium text-neutral-50"
            style={{ backgroundColor: "var(--background)", border: "1px solid var(--secondary)", cursor: "pointer" }}
        >
            <span className="z-10 pr-2"
                style={{ fontSize: "1rem", color: "var(--foreground)", fontFamily: "Poppins", fontWeight: "600", paddingLeft: "1rem", paddingRight: "1rem" }}>
                MORE ABOUT ME
            </span>
            <div className="absolute right-0 inline-flex h-13 w-13 items-center justify-end rounded-full transition-[width] group-hover:w-[calc(100%)]"
                style={{ backgroundColor: "var(--secondary)", padding: 0, margin: 0 }}>
                <div className="mr-3.5 flex items-center justify-center">
                    <FaArrowRight size={20} style={{ color: "var(--foreground)" }} />
                </div>
            </div>
        </a>
    );
}
