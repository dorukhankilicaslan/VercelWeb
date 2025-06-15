import React from "react";
import { FaGithub, FaLinkedin, FaCodepen, FaInstagram } from "react-icons/fa";

export default function Sidebar() {
  return (
    <ul className="flex flex-row items-center gap-4 lg:gap-6 mt-2 list-none text-[var(--foreground)]/70">
      <li>
        <a
          href="https://github.com/dorukhankilicaslan"
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary hover:text-[var(--foreground)] transition-colors p-1"
          aria-label="GitHub"
        >
          <FaGithub className="w-5 xl:w-8 h-5 xl:h-8" />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/dorukhankilicaslan/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary hover:text-[var(--foreground)] transition-colors p-1"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="w-5 xl:w-8 h-5 xl:h-8" />
        </a>
      </li>
      <li>
        <a
          href="https://codepen.io/Orway"
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary hover:text-[var(--foreground)] transition-colors p-1"
          aria-label="CodePen"
        >
          <FaCodepen className="w-5 xl:w-8 h-5 xl:h-8" />
        </a>
      </li>
      <li>
        <a
          href="https://www.instagram.com/dorukhan.k/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary hover:text-[var(--foreground)] transition-colors p-1"
          aria-label="Instagram"
        >
          <FaInstagram className="w-5 xl:w-8 h-5 xl:h-8" />
        </a>
      </li>
    </ul>
  );
}
