// src/componentes/HorizontalScroller.jsx (versión dark estilo Steam)
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const HorizontalScroller = ({ children }) => {
  const ref = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

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
        <motion.button
          onClick={() => scrollBy(-1)}
          className="absolute left-2 z-20 p-3 rounded-full bg-[#1b2838]/80 backdrop-blur-lg shadow-xl border border-[#66c0f4]/20 text-[#66c0f4] hover:text-white hover:bg-[#1b2838]"
          style={{ top: "40%" }}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          initial={{ translateY: "-50%", opacity: 0 }}
          animate={{ translateY: "-50%", opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronLeft size={28} />
        </motion.button>
      )}

      {/* Contenedor del scroll */}
      <div
        ref={ref}
        className="horizontal-scroll flex gap-4 overflow-x-auto no-scrollbar select-none snap-x snap-mandatory touch-pan px-6 py-2"
      >
        {children}
      </div>

      {/* Flecha Derecha */}
      {canScrollRight && (
        <motion.button
          onClick={() => scrollBy(1)}
          className="absolute right-2 z-20 p-3 rounded-full bg-[#1b2838]/80 backdrop-blur-lg shadow-xl border border-[#66c0f4]/20 text-[#66c0f4] hover:text-white hover:bg-[#1b2838]"
          style={{ top: "40%" }}
          whileTap={{ scale: 0.8 }}
          whileHover={{ scale: 1.2 }}
          initial={{ translateY: "-50%", opacity: 0 }}
          animate={{ translateY: "-50%", opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight size={28} />
        </motion.button>
      )}

      {/* Fade izquierda */}
      {canScrollLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b0f15] to-transparent" />
      )}

      {/* Fade derecha */}
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b0f15] to-transparent" />
      )}
    </div>
  );
};

export default HorizontalScroller;
