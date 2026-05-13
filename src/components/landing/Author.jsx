import React from "react";
import { motion } from "framer-motion";
import { Feather } from "lucide-react";

const PORTRAIT_URL =
  "https://customer-assets.emergentagent.com/job_ff365fdc-b899-4525-93d5-5599c5d1743d/artifacts/kjp8hibl_Gemini_Generated_Image_js22lvjs22lvjs22.png";

const Author = () => {
  return (
    <section
      id="author"
      className="relative py-28 sm:py-36 overflow-hidden"
      data-testid="author-section"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 20% 30%, rgba(28,21,16,0.6) 0%, transparent 50%), linear-gradient(180deg, #08110d 0%, #060a0e 100%)",
        }}
      />
      <div className="grain" />

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative inline-block" data-testid="author-portrait">
            {/* Ornate wood frame */}
            <div
              className="absolute -inset-3 sm:-inset-4 rounded-[2px]"
              style={{
                background:
                  "linear-gradient(135deg, #3a2618 0%, #1c1510 35%, #2a1f17 65%, #3a2618 100%)",
                boxShadow:
                  "0 30px 70px -20px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.25) inset",
              }}
            />
            <div
              className="absolute -inset-1.5 sm:-inset-2 rounded-[2px] border border-[#d4af37]/50"
              style={{
                boxShadow: "0 0 0 1px rgba(212,175,55,0.2) inset",
              }}
            />

            <img
              src={PORTRAIT_URL}
              alt="Lars De Brabander, author"
              className="relative w-full max-w-[420px] aspect-square object-cover"
              style={{ filter: "saturate(0.9) contrast(1.05)" }}
            />

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
              }}
            />

            {/* Caption seal */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6">
              <div className="wax-seal" data-testid="author-seal">
                <Feather size={20} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7"
        >
          <div className="heading-rule mb-5">
            <span>The Creator</span>
          </div>

          <h2
            className="font-display text-[#F0E6D2]"
            style={{
              fontSize: "clamp(2rem, 4.6vw, 3.4rem)",
              lineHeight: 1.05,
              fontWeight: 800,
            }}
            data-testid="author-name"
          >
            Lars <span className="gold-shimmer">De Brabander</span>
          </h2>

          <div className="my-6 flex items-center gap-4">
            <div className="h-px w-12 bg-[#d4af37]/50" />
            <span className="font-cinzel text-[10px] tracking-[0.4em] text-[#d4af37]">
              HISTORIAN · STORYTELLER
            </span>
          </div>

          <div className="space-y-4 font-body text-[#F0E6D2]/85 text-base sm:text-lg leading-relaxed">
            <p>
              Lars De Brabander writes at the seam where{" "}
              <span className="italic text-[#d4af37]">
                meticulous research
              </span>{" "}
              meets the gunpowder pulse of historical fiction. A descendant of
              Low Countries seafarers, his work resurrects the voices ledgered
              out of the record — admirals, slaves, traders, ghosts.
            </p>
            <p>
              <span className="font-display text-[#F0E6D2]">
                Devil on the Hudson
              </span>{" "}
              is his unflinching account of New Amsterdam's reconquest in 1673 —
              a story rebuilt from Dutch logs, English dispatches, and the
              archives the conquerors preferred we forget.
            </p>
          </div>

          {/* Signature */}
          <div className="mt-9 flex items-end gap-5">
            <div
              className="font-sig text-[#d4af37] text-shadow-noir"
              style={{
                fontSize: "clamp(2rem, 4vw, 2.6rem)",
                lineHeight: 1,
                filter: "drop-shadow(0 0 16px rgba(212,175,55,0.25))",
              }}
              data-testid="author-signature"
            >
              Lars De Brabander
            </div>
          </div>

          <div className="mt-3 font-cinzel text-[10px] tracking-[0.3em] text-[#A8A092] uppercase">
            ✦ Author of Devil on the Hudson
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Author;
