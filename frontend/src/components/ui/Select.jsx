import { useState, useRef, useEffect, useLayoutEffect } from "react";
import Button from "./Button";
import { IconSelector, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Select({
  options = [],
  value,
  onChange,
  placeholder = "Sélectionner",
  text,
  variant = 1,
}) {
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, []);

  useLayoutEffect(() => {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (!rect) return;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const updatePosition = () => {
      const rect = buttonRef.current?.getBoundingClientRect();
      if (!rect) return;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      setOpenUpward(spaceBelow < 200 && spaceAbove > spaceBelow);
    };
    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  const select = (
    <div ref={ref} className="relative inline-block font-main text-text">
      <Button
        ref={buttonRef}
        onClick={() => setOpen(!open)}
        className={`${variant == 1 ? "bg-back!" : "bg-contaner!"} min-w-52 justify-between hover:bg-main! focus:bg-main! relative `}
      >
        <span className={`${selected ? "" : "opacity-60"}`}>
          {selected ? selected.label : placeholder}
        </span>
        <span
          className={`absolute right-2 transition-transform duration-300 ${open ? "scale-0" : "scale-100"}`}
        >
          <IconSelector />
        </span>
        <span
          className={`absolute right-2 transition-transform duration-300 ${open ? "scale-100" : "scale-0"}`}
        >
          <IconX />
        </span>
      </Button>

      <AnimatePresence>
        {open && ready && (
          <motion.div
            initial={{ opacity: 0, y: openUpward ? 5 : -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: openUpward ? 5 : -5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={`absolute left-0 w-full z-50
              ${openUpward ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top"}
            `}
          >
            <div
              className={`${variant == 1 ? "bg-contaner!" : "bg-back!"} rounded-xl shadow-2xl p-2 flex flex-col gap-1 border border-overlay/10 backdrop-blur`}
            >
              {options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    onChange?.(opt.value);
                    setOpen(false);
                  }}
                  className={`
                    px-3 py-2 rounded-lg text-left transition-all duration-150
                    hover:bg-main hover:scale-[1.02]
                    ${value === opt.value ? "bg-main/80" : "bg-transparent"}
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const selectWichText = (
    <div
      className={`flex flex-row ${variant == 1 ? "bg-contaner" : "bg-back"}  py-2 px-3 rounded-lg items-center gap-5`}
    >
      <p>{text}</p>
      {select}
    </div>
  );

  return text ? selectWichText : select;
}

/* Melina david prime */
