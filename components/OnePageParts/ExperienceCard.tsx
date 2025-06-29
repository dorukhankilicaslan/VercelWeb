import React from "react";

interface ExperienceCardProps {
  position: string;
  company: string;
  companyUrl?: string;
  date: string;
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
  date,
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
        rounded-md p-0 mb-4 md:mb-8 relative z-0 overflow-hidden backdrop-blur-md
        transition-opacity duration-200
        ${isActive ? "opacity-100" : ""}
        ${isInactive ? "opacity-60" : ""}
        bg-[var(--experience-background-hover)] shadow-2xl
        focus-within:bg-[var(--experience-background-hover)]
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
          <span
            className="inline-block text-foreground border-none font-medium
          text-xs lg:text-base xl:text-lg"
          >
            {date}
          </span>
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
                  className="text-foreground no-underline text-[var(--accent)] transition-colors"
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
                  className="bg-[var(--accent)]/10 lg:py-1 lg:px-4 
                  text-accent font-medium 
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
