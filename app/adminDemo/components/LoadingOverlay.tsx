// components/Admin/LoadingOverlay.tsx

interface LoadingOverlayProps {
  isOpen: boolean;
  animation: {
    enter: string;
    exit: string;
    base: string;
  };
  children: React.ReactNode;
  className?: string;
}

export default function LoadingOverlay({
  isOpen,
  animation,
  children,
  className = "",
}: LoadingOverlayProps) {
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
