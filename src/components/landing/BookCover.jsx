import React from "react";

/**
 * Hand-built book cover for "Devil on the Hudson" — a stylized
 * dark cover with gold typography, ship silhouette, and ember glow.
 * Used inside react-parallax-tilt.
 */
const BookCover = () => {
  return (
    <div
      className="relative select-none"
      data-testid="book-cover-art"
      style={{ width: "min(78vw, 340px)", aspectRatio: "2 / 3" }}
    >
      {/* Outer page edge */}
      <div
        className="absolute inset-0 rounded-[6px]"
        style={{
          background:
            "linear-gradient(135deg,#1c1510 0%, #0a0f14 55%, #1c1510 100%)",
          boxShadow:
            "0 50px 70px -25px rgba(0,0,0,0.85), 0 0 0 1px rgba(212,175,55,0.3) inset, 0 0 80px rgba(226,88,34,0.35)",
        }}
      />

      {/* Spine highlight */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[10px] rounded-l-[6px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6), rgba(212,175,55,0.1), rgba(0,0,0,0.6))",
        }}
      />

      {/* Inner gilded frame */}
      <div className="absolute inset-3 border border-[#d4af37]/40 rounded-[3px] pointer-events-none" />
      <div className="absolute inset-[14px] border border-[#d4af37]/20 rounded-[2px] pointer-events-none" />

      {/* Top label */}
      <div className="absolute top-[7%] left-0 right-0 text-center">
        <div className="font-cinzel text-[10px] tracking-[0.45em] text-[#d4af37]/80">
          A NOVEL OF 1673
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-[14%] left-0 right-0 text-center px-4">
        <h3
          className="font-display gold-shimmer"
          style={{
            fontSize: "clamp(22px, 5.2vw, 38px)",
            lineHeight: 1.05,
            fontWeight: 900,
            letterSpacing: "0.02em",
          }}
        >
          DEVIL
        </h3>
        <div className="font-cinzel text-[#F0E6D2]/80 text-[10px] tracking-[0.5em] my-1">
          ON THE
        </div>
        <h3
          className="font-display gold-shimmer"
          style={{
            fontSize: "clamp(24px, 5.6vw, 42px)",
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          HUDSON
        </h3>
      </div>

      {/* Center scene — Hudson at night */}
      <div className="absolute left-[10%] right-[10%] top-[44%] bottom-[24%] overflow-hidden rounded-[2px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(226,88,34,0.55) 0%, transparent 65%), linear-gradient(180deg, #0b1e2c 0%, #060a0e 100%)",
          }}
        />
        {/* moon */}
        <div
          className="absolute"
          style={{
            top: "10%",
            right: "14%",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #f0e6d2 0%, rgba(240,230,210,0.2) 70%, transparent 100%)",
            filter: "blur(0.3px)",
          }}
        />
        {/* ship silhouette */}
        <svg
          viewBox="0 0 200 120"
          className="absolute inset-x-0 bottom-2 w-full"
        >
          <path
            d="M30 95 Q 100 110 170 95 L 160 105 Q 100 115 40 105 Z"
            fill="#000"
            opacity="0.9"
          />
          <line x1="60" y1="95" x2="60" y2="30" stroke="#000" strokeWidth="1.5" />
          <line x1="100" y1="95" x2="100" y2="15" stroke="#000" strokeWidth="1.8" />
          <line x1="140" y1="95" x2="140" y2="32" stroke="#000" strokeWidth="1.5" />
          <path d="M40 30 L 80 30 L 80 70 L 40 70 Z" fill="#0a141d" opacity="0.9" />
          <path d="M80 15 L 120 15 L 120 80 L 80 80 Z" fill="#0a141d" opacity="0.9" />
          <path d="M120 32 L 160 32 L 160 72 L 120 72 Z" fill="#0a141d" opacity="0.9" />
          {/* cannon flash */}
          <circle cx="50" cy="95" r="3" fill="#ffb060" opacity="0.85" />
          <circle cx="150" cy="95" r="2.5" fill="#ffb060" opacity="0.7" />
        </svg>
        {/* water reflection */}
        <div
          className="absolute left-0 right-0 bottom-0 h-[20%]"
          style={{
            background:
              "linear-gradient(to top, rgba(226,88,34,0.35), transparent)",
            filter: "blur(2px)",
          }}
        />
      </div>

      {/* Tag line */}
      <div className="absolute bottom-[14%] left-0 right-0 text-center px-6">
        <div className="font-body italic text-[10px] sm:text-[11px] text-[#f0e6d2]/75 leading-tight">
          The Forgotten Fury of New Amsterdam
        </div>
      </div>

      {/* Author */}
      <div className="absolute bottom-[6%] left-0 right-0 text-center">
        <div className="font-cinzel text-[10px] sm:text-[11px] tracking-[0.35em] text-[#d4af37]">
          LARS DE BRABANDER
        </div>
      </div>

      {/* Grain overlay */}
      <div className="grain rounded-[6px]" />
    </div>
  );
};

export default BookCover;
