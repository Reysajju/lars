import React from "react";
import { motion } from "framer-motion";

const Covenant = () => {
  return (
    <section
      id="covenant"
      className="relative py-28 sm:py-36 overflow-hidden"
      data-testid="covenant-section"
    >
      {/* Map texture background, heavily darkened */}
      <div className="absolute inset-0 map-bg" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #060a0e 0%, rgba(6,10,14,0.55) 50%, #060a0e 100%)",
        }}
      />
      <div className="grain" />

      <div className="relative max-w-4xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative glass-panel ornate-corner p-10 sm:p-16 lg:p-20 text-center"
        >
          <div className="heading-rule mb-6 justify-center">
            <span>A Warning to the Reader</span>
          </div>

          <p
            className="font-display text-shadow-noir"
            style={{
              fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
              lineHeight: 1.45,
              color: "#F0E6D2",
              fontWeight: 400,
            }}
            data-testid="covenant-quote"
          >
            <span className="text-[#d4af37] text-3xl align-top mr-1">“</span>
            This book may not just change your perspective; it will{" "}
            <span className="italic text-[#d4af37]">immerse you</span> in a
            forgotten century. Brace yourself for the scent of{" "}
            <span className="italic">salt, smoke, and betrayal.</span>
            <span className="text-[#d4af37] text-3xl align-bottom ml-1">”</span>
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="h-px w-12 bg-[#d4af37]/50" />
            <div className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37]">
              SIGNED, THE AUTHOR
            </div>
            <div className="h-px w-12 bg-[#d4af37]/50" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Covenant;
