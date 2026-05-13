import React from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    quote:
      "Epic scope, intimate detail. A masterpiece of historical recreation.",
    name: "Elma Bruin",
    pub: "The New Royalty World",
    stars: 5,
  },
  {
    quote:
      "Brabander hauls 1673 out of dusty archives and sets it ablaze on the page.",
    name: "Reader's Log",
    pub: "Verified Reader",
    stars: 5,
  },
  {
    quote:
      "The battle scenes on the Hudson are breath-taking — I could smell the gunpowder.",
    name: "M. van Houten",
    pub: "Verified Reader",
    stars: 5,
  },
  {
    quote:
      "Brilliantly unearths a part of New York's soul I never knew existed.",
    name: "J. Caldwell",
    pub: "Verified Reader",
    stars: 5,
  },
  {
    quote:
      "Kofi Kumase's voice will haunt you long after the last cannon falls silent.",
    name: "H. Okafor",
    pub: "Verified Reader",
    stars: 5,
  },
];

const ReviewCard = ({ r }) => (
  <article
    className="shrink-0 w-[320px] sm:w-[380px] mx-3 sm:mx-4 parchment-panel ornate-corner p-7 relative"
    data-testid="review-card"
  >
    <div className="flex gap-1 mb-4">
      {Array.from({ length: r.stars }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="text-[#d4af37] fill-[#d4af37]"
          strokeWidth={1.2}
        />
      ))}
    </div>
    <p className="font-body italic text-[#F0E6D2]/90 leading-relaxed text-[15px] mb-6">
      <span className="text-[#d4af37] text-2xl align-top mr-1 leading-none">
        “
      </span>
      {r.quote}
      <span className="text-[#d4af37] text-2xl align-bottom ml-1 leading-none">
        ”
      </span>
    </p>
    <div className="flex items-center gap-3">
      <div className="h-px w-8 bg-[#d4af37]/50" />
      <div>
        <div className="font-display text-[#F0E6D2] text-sm">{r.name}</div>
        <div className="font-cinzel text-[9px] tracking-[0.3em] uppercase text-[#A8A092]">
          {r.pub}
        </div>
      </div>
    </div>
  </article>
);

const Reviews = () => {
  // duplicate for seamless marquee loop
  const doubled = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="relative py-28 sm:py-32 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #060a0e 0%, #0c0805 50%, #060a0e 100%)",
      }}
      data-testid="reviews-section"
    >
      <div className="grain" />

      {/* Subtle ocean glow */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-7xl mx-auto px-6 sm:px-10 text-center mb-14"
      >
        <div className="heading-rule justify-center mb-5">
          <span>Scroll of Honor</span>
        </div>
        <h2
          className="font-display text-[#F0E6D2] text-shadow-noir mx-auto max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
            lineHeight: 1.05,
            fontWeight: 800,
          }}
        >
          Praise from <span className="gold-shimmer">the deck</span> & the
          shore.
        </h2>

        {/* big star summary */}
        <div className="flex items-center justify-center gap-2 mt-7">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={22}
              className="text-[#d4af37] fill-[#d4af37]"
              strokeWidth={1.2}
            />
          ))}
          <span className="font-cinzel text-[10px] tracking-[0.35em] uppercase text-[#A8A092] ml-3">
            5.0 · Critically Acclaimed
          </span>
        </div>
      </motion.div>

      {/* Marquee */}
      <div
        className="relative marquee-pause overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track py-4">
          {doubled.map((r, i) => (
            <ReviewCard key={i} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
