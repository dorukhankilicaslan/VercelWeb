// animations.ts
export const animations = {
  fadeScaleUp: {
    enter: "opacity-100 scale-100 translate-y-0 pointer-events-auto",
    exit: "opacity-0 scale-95 translate-y-4 pointer-events-none",
    base: "transition-all duration-500 ease-in-out transform",
  },
  slideInLeft: {
    enter: "opacity-100 translate-x-0 pointer-events-auto",
    exit: "opacity-0 -translate-x-full pointer-events-none",
    base: "transition-all duration-500 ease-in-out transform",
  },
  zoomIn: {
    enter: "opacity-100 scale-105 pointer-events-auto",
    exit: "opacity-0 scale-75 pointer-events-none",
    base: "transition-transform duration-500 ease-in-out",
  },
};
