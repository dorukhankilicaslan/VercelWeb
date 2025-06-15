// components/DemoPageParts/AnimatedOverlay.tsx

interface AnimatedOverlayProps {
  isOpen: boolean;
  animation: {
    enter: string;
    exit: string;
    base: string;
  };
  children: React.ReactNode;
  className?: string;
}

export default function AnimatedOverlay({
  isOpen,
  animation,
  children,
  className = "",
}: AnimatedOverlayProps) {
  return (
    <div
      className={`
        fixed inset-0 z-20 flex items-center justify-center bg-[var(--background)] bg-opacity-95 backdrop-blur-sm
        ${animation.base} ${
        isOpen ? animation.enter : animation.exit
      } ${className}
      `}
    >
      {children}
    </div>
  );
}
