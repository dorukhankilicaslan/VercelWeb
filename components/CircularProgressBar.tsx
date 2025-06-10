import React from "react";

interface CircularProgressBarProps {
    value: number; // 1 ile 5 arası puan
    label: string;
    size?: number;
    strokeWidth?: number;
}

// Daha canlı, kontrast renkler
const colors = [
    "#DC0029", // 1 - koyu kırmızı
    "#CC6129", // 2 - canlı kırmızı-turuncu
    "#EEF400", // 3 - parlak turuncu-sarı
    "#9EF463", // 4 - canlı sarı-yeşil
    "#05F400", // 5 - canlı yeşil
];


const deg2rad = (deg: number) => (deg * Math.PI) / 180;

const describeArc = (
    cx: number,
    cy: number,
    radius: number,
    startAngle: number,
    endAngle: number
) => {
    const start = {
        x: cx + radius * Math.cos(deg2rad(startAngle)),
        y: cy + radius * Math.sin(deg2rad(startAngle)),
    };
    const end = {
        x: cx + radius * Math.cos(deg2rad(endAngle)),
        y: cy + radius * Math.sin(deg2rad(endAngle)),
    };

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        `M ${start.x} ${start.y}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    ].join(" ");
};

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
    value,
    label,
    size = 120,
    strokeWidth = 12,
}) => {
    const radius = (size - strokeWidth) / 2;
    const center = size / 2;

    const segments = colors.length;
    const gapDegrees = 4;
    const segmentDegrees = (360 - gapDegrees * segments) / segments;

    // value tam sayı olarak 1-5 arası (dışarıdan float gelirse yuvarla)
    const score = Math.min(Math.max(Math.round(value), 1), 5);

    // Dolacak segmentlerin rengi: value’ya göre
    const fillColor = colors[score - 1];

    return (
        <div className="flex flex-col items-center">
            <svg width={size} height={size}>
                {/* Boş segmentler */}
                {Array.from({ length: segments }).map((_, i) => {
                    const startAngle = -90 + i * (segmentDegrees + gapDegrees);
                    const endAngle = startAngle + segmentDegrees;
                    return (
                        <path
                            key={"bg" + i}
                            d={describeArc(center, center, radius, startAngle, endAngle)}
                            stroke="#e5e7eb"
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Dolu segmentler */}
                {Array.from({ length: segments }).map((_, i) => {
                    if (score - i <= 0) return null;

                    // Son segment kısmi dolu değil, tam dolu olacak çünkü tam sayı
                    const segmentFill = 1;
                    const startAngle = -90 + i * (segmentDegrees + gapDegrees);
                    const filledEndAngle = startAngle + segmentDegrees * segmentFill;

                    return (
                        <path
                            key={"fill" + i}
                            d={describeArc(center, center, radius, startAngle, filledEndAngle)}
                            stroke={fillColor}
                            strokeWidth={strokeWidth}
                            fill="none"
                            strokeLinecap="round"
                            style={{ transition: "d 0.5s ease" }}
                        />
                    );
                })}

                {/* Ortadaki puan */}
                <text
                    x="50%"
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    className="fill-[var(--foreground)] font-bold font-[Poppins]"
                    style={{ fontSize: size * 0.25 }}
                >
                    {score}
                </text>
            </svg>

            <h6 className="mt-3 text-center uppercase font-bold text-[var(--foreground)] font-[Poppins]">
                {label}
            </h6>
        </div>
    );
};

export default CircularProgressBar;
