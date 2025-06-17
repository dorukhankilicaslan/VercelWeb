import React from "react";

interface ExperienceCardProps {
  position: string;
  company: string;
  companyUrl?: string;
  date1: string;
  date2: string;
  description: string;
  technologies?: string[];
  isActive?: boolean;
  isInactive?: boolean;
  onHover?: () => void;
  onBlur?: () => void;
}

export default function ExperienceCard({
  position,
  company,
  companyUrl,
  date1,
  date2,
  description,
  technologies = [],
  isActive = false,
  isInactive = false,
  onHover,
  onBlur,
}: ExperienceCardProps) {
  return (
    <div
      className={`
        bg-[var(--background)]/20

        rounded-md p-0 mb-4 md:mb-8 relative z-0 overflow-hidden backdrop-blur-md
        transition-opacity duration-200
        ${isActive ? "opacity-100" : ""}
        ${isInactive ? "opacity-60" : ""}
        bg-[var(--foreground)]/2 shadow-[0_0_10px_rgba(0,0,0,0.25)]
        focus-within:bg-[var(--foreground)]/5
      `}
      onMouseEnter={onHover}
      onMouseLeave={onBlur}
      onFocus={onHover}
      onBlur={onBlur}
      tabIndex={0}
    >
      <div
        className="grid lg:grid-cols-[100px_1fr] items-start grid-cols-1 
      p-4 sm:p-5 md:p-6 lg:p-4 xl:p-6"
      >
        {" "}
        <div className="flex items-start justify-start h-full sm:mb-2">
          <div className="flex flex-col justify-between h-full items-start">
            <span className="text-foreground font-medium text-xs lg:text-base xl:text-lg">
              {date1}
            </span>

            <div className="w-px bg-foreground/40 flex-1 my-1 border-1 ml-4" />

            <span className="text-foreground font-medium text-xs lg:text-base xl:text-lg">
              {date2}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3
            className="text-[var(--foreground)] font-bold mt-0 mb-2
           text-xl lg:text-lg xl:text-2xl"
          >
            {" "}
            {/* font-size 1.2rem -> xl, margin ayarları */}
            {position}{" "}
            <span className="text-foreground">
              •{" "}
              {companyUrl ? (
                <a
                  href={companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground no-underline text-[var(--foreground)]/50 hover:text-[var(--foreground)] transition-colors"
                >
                  {company}
                </a>
              ) : (
                company
              )}
            </span>
          </h3>
          <p
            className="text-secondary mt-0 mb-2
           text-sm lg:text-base xl:text-lg
           "
          >
            {" "}
            {description}
          </p>
          {technologies.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-4 ml-0 p-0 list-none">
              {" "}
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="bg-[var(--foreground)]/5 lg:py-1 lg:px-4 
                  text-[var(--foreground)] font-medium 
                  rounded-full whitespace-nowrap transition-colors
                  text-xs lg:text-base xl:text-lg"
                >
                  {tech}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
