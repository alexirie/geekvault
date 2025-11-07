// src/componentes/HorizontalScroller.jsx
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HorizontalScroller = ({ children }) => {
  const ref = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  /** Actualiza si se puede scroll a izquierda/derecha */
  const updateScrollState = () => {
    const el = ref.current;
    if (!el) return;

    const hasOverflow = el.scrollWidth > el.clientWidth;

    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10);

    if (!hasOverflow) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };

  const scrollBy = (direction) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: direction * 300, behavior: "smooth" });
  };

  useEffect(() => {
    updateScrollState();
    const el = ref.current;

    if (!el) return;

    const handler = () => updateScrollState();
    el.addEventListener("scroll", handler);

    window.addEventListener("resize", handler);
    return () => {
      el.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
    };
  }, [children]);

  return (
    <div className="relative">

      {/* Flecha Izquierda */}
      {canScrollLeft && (
        <button
          onClick={() => scrollBy(-1)}
          className="absolute left-0 z-10 top-1/2 -translate-y-1/2 p-2 
                     bg-white/80 backdrop-blur rounded-full shadow hover:scale-110"
        >
          <ChevronLeft size={28} />
        </button>
      )}

      {/* Scroll principal */}
      <div
        ref={ref}
        className="horizontal-scroll 
          flex gap-4 overflow-x-auto 
          no-scrollbar select-none
          snap-x snap-mandatory
          touch-pan-y
          px-8
        "
      >
        {children}
      </div>

      {/* Flecha Derecha */}
      {canScrollRight && (
        <button
          onClick={() => scrollBy(1)}
          className="absolute right-0 z-10 top-1/2 -translate-y-1/2 p-2 
                     bg-white/80 backdrop-blur rounded-full shadow hover:scale-110"
        >
          <ChevronRight size={28} />
        </button>
      )}

      {/* Fade izquierda */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-100 to-transparent"></div>
      )}

      {/* Fade derecha */}
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-100 to-transparent"></div>
      )}
    </div>
  );
};

export default HorizontalScroller;
