import React from "react";
import { motion } from "framer-motion";
import { Compass, Crosshair, ScrollText } from "lucide-react";

const pillars = [
  {
    icon: Compass,
    chapter: "I",
    title: "The Rivalry",
    body: "Trace the ancient blood-feud from Peter Stuyvesant's stubborn will to English ambition — a clash of empires drawn in ink, signed in cannon-fire.",
    accent: "from-[#d4af37]/30 to-transparent",
  },
  {
    icon: Crosshair,
    chapter: "II",
    title: "Naval Fury",
    body: "Witness the devastating power and secret strategies of a Zeeland admiral driven by hatred — a fleet shaped by vengeance, sharpened by salt.",
    accent: "from-[#e25822]/35 to-transparent",
  },
  {
    icon: ScrollText,
    chapter: "III",
    title: "The Forbidden Voice",
    body: "Hear the story through Kofi Kumase — the narrator the history books ignored. The colony's reconquest told through the eyes of those it overlooked.",
    accent: "from-[#d4af37]/30 to-transparent",
  },
];

const Pillar = ({ icon: Icon, chapter, title, body, accent, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.9, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="relative parchment-panel ornate-corner p-8 sm:p-10 group"
    data-testid={`pillar-${i + 1}`}
  >
    {/* Glow on hover */}
    <div
      className={`absolute -inset-px rounded-[2px] bg-gradient-to-br ${accent} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
      style={{ filter: "blur(20px)" }}
    />

    <div className="relative z-10">
      <div className="flex items-center justify-between mb-7">
        <div className="font-display text-[#d4af37] text-4xl opacity-70">
          {chapter}
        </div>
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center border border-[#d4af37]/40 group-hover:border-[#d4af37] group-hover:rotate-6 transition-all duration-500"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(212,175,55,0.18), transparent 70%)",
          }}
        >
          <Icon size={20} className="text-[#d4af37]" strokeWidth={1.4} />
        </div>
      </div>

      <h3
        className="font-display text-[#F0E6D2] mb-3"
        style={{ fontSize: "clamp(1.3rem, 2.2vw, 1.7rem)", fontWeight: 700 }}
      >
        {title}
      </h3>

      <div className="h-px w-12 bg-[#d4af37]/40 mb-4 group-hover:w-24 transition-all duration-500" />

      <p className="font-body text-sand text-[15px] leading-relaxed">{body}</p>
    </div>
  </motion.article>
);

const Trident = () => {
  return (
    <section
      id="trident"
      className="relative py-28 sm:py-36 overflow-hidden"
      data-testid="trident-section"
    >
      {/* Subtle wood texture using gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(28,21,16,0.5) 0%, transparent 60%), linear-gradient(180deg, #060a0e 0%, #08110d 100%)",
        }}
      />
      <div className="grain" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <div className="heading-rule justify-center mb-5">
            <span>The Trident of Truth</span>
          </div>
          <h2
            className="font-display text-[#F0E6D2] text-shadow-noir mx-auto max-w-3xl"
            style={{
              fontSize: "clamp(2rem, 4.6vw, 3.6rem)",
              lineHeight: 1.05,
              fontWeight: 800,
            }}
          >
            Three blades, <span className="gold-shimmer">one reconquest.</span>
          </h2>
          <p className="font-body text-sand mt-5 max-w-2xl mx-auto">
            What waits within these pages is not a chronicle. It is an
            inheritance of fury, faith, and the forgotten.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {pillars.map((p, i) => (
            <Pillar key={p.title} {...p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trident;
