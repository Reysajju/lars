import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Compass, Anchor, Flame, ChevronDown } from "lucide-react";
import Embers from "./Embers";
import Ship from "./Ship";
import BookCover from "./BookCover";

const AMAZON_URL =
  "https://www.amazon.com/Devil-Hudson-Lars-Brabander-ebook/dp/B0GX32ZZ5D";

const Hero = () => {
  const { scrollY } = useScroll();
  const yBack = useTransform(scrollY, [0, 800], [0, 140]);
  const yMid = useTransform(scrollY, [0, 800], [0, 90]);
  const yFront = useTransform(scrollY, [0, 800], [0, 40]);
  const titleY = useTransform(scrollY, [0, 600], [0, -60]);
  const titleOpacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  const scrollToCovenant = () => {
    document
      .getElementById("covenant")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden hero-sky"
      data-testid="hero-section"
    >
      {/* Layer 1: distant fleet */}
      <motion.div
        style={{ y: yBack }}
        className="absolute left-0 right-0 bottom-[32%] flex justify-around opacity-50"
      >
        <Ship className="w-[180px] sm:w-[220px]" style={{ opacity: 0.55 }} />
        <Ship className="w-[160px] sm:w-[200px]" style={{ opacity: 0.45 }} />
        <Ship className="w-[170px] sm:w-[210px]" style={{ opacity: 0.5 }} />
      </motion.div>

      {/* Layer 2: mid ship (lit) */}
      <motion.div
        style={{ y: yMid }}
        className="absolute left-[2%] bottom-[18%] w-[280px] sm:w-[360px] md:w-[420px]"
      >
        <Ship className="w-full" lit style={{ opacity: 0.85 }} />
      </motion.div>

      {/* Layer 2b: mid right */}
      <motion.div
        style={{ y: yMid }}
        className="absolute right-[4%] bottom-[20%] w-[200px] sm:w-[260px] md:w-[320px]"
      >
        <Ship className="w-full" style={{ opacity: 0.7 }} />
      </motion.div>

      {/* Cannon flashes on the horizon */}
      <div className="cannon-flash" style={{ left: "12%" }} />
      <div
        className="cannon-flash"
        style={{ left: "75%", animationDelay: "2.5s" }}
      />
      <div
        className="cannon-flash"
        style={{ left: "45%", animationDelay: "4.2s" }}
      />

      {/* Water reflection */}
      <div
        className="absolute left-0 right-0 bottom-0 h-[32%] pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(10,15,20,0.6) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute left-0 right-0 bottom-0 h-[18%] pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(180deg, transparent 0px, transparent 6px, rgba(212,175,55,0.04) 7px, transparent 8px)",
          mixBlendMode: "screen",
          opacity: 0.6,
        }}
      />

      {/* Fog & embers */}
      <div className="fog-layer" />
      <Embers count={32} />
      <div className="grain" />

      {/* Top brand bar */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between">
        <div
          className="font-display text-[#d4af37] text-lg sm:text-xl tracking-[0.3em]"
          data-testid="brand-mark"
        >
          D · H
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-[0.35em] uppercase font-cinzel text-[#f0e6d2]/70">
          <a
            href="#trident"
            className="hover:text-[#d4af37] transition-colors"
            data-testid="nav-pillars"
          >
            The Pillars
          </a>
          <a
            href="#author"
            className="hover:text-[#d4af37] transition-colors"
            data-testid="nav-author"
          >
            The Author
          </a>
          <a
            href="#reviews"
            className="hover:text-[#d4af37] transition-colors"
            data-testid="nav-reviews"
          >
            Honor
          </a>
          <a
            href="#fleet"
            className="hover:text-[#d4af37] transition-colors"
            data-testid="nav-fleet"
          >
            The Fleet
          </a>
        </div>
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14 pb-32 grid lg:grid-cols-12 gap-10 items-center"
      >
        {/* Left: Title + CTA */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="heading-rule mb-7"
          >
            <Flame size={14} className="text-[#E25822]" />
            <span>Anno Domini · 1673</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2 }}
            className="font-display text-shadow-noir text-[#F0E6D2]"
            style={{
              fontSize: "clamp(2rem, 4.4vw, 4rem)",
              lineHeight: 1.06,
              fontWeight: 900,
              letterSpacing: "-0.005em",
            }}
            data-testid="hero-headline"
          >
            What if New York's forgotten history{" "}
            <span className="italic text-[#A8A092] font-normal">was</span>{" "}
            <span className="gold-shimmer">forged in fire, blood,</span> and{" "}
            <span className="text-[#E25822] text-shadow-ember">
              a fury-driven fleet?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="font-body text-sand mt-7 max-w-xl text-base sm:text-lg leading-relaxed"
          >
            A cinematic historical-fiction novel of the Dutch reconquest of New
            Amsterdam — told in salt, smoke, and the gunpowder fury of a
            forgotten Zeeland admiral.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="mt-9 flex flex-wrap gap-4 items-center"
          >
            <button
              type="button"
              onClick={scrollToCovenant}
              className="btn-ember"
              data-testid="cta-explore-legend"
            >
              <Compass size={16} />
              Explore the Legend
            </button>
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              data-testid="cta-get-the-book"
            >
              <Anchor size={16} />
              Get the Book
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, delay: 1.1 }}
            className="mt-10 flex items-center gap-3 text-[11px] font-cinzel tracking-[0.3em] uppercase text-[#A8A092]"
          >
            <div className="h-px w-10 bg-[#d4af37]/40" />
            <span>Kindle · Paperback · By Lars De Brabander</span>
          </motion.div>
        </div>

        {/* Right: Book */}
        <motion.div
          style={{ y: yFront }}
          className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end"
          data-testid="book-cover-wrap"
        >
          <Tilt
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable
            glareMaxOpacity={0.25}
            glareColor="#f0d97c"
            glarePosition="all"
            glareBorderRadius="6px"
            transitionSpeed={1200}
            scale={1.02}
            className="tilt-shadow book-glow"
          >
            <BookCover />
          </Tilt>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToCovenant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#A8A092] hover:text-[#d4af37] transition-colors"
        data-testid="scroll-indicator"
        aria-label="Scroll to next section"
      >
        <span className="font-cinzel text-[9px] tracking-[0.5em] uppercase">
          Descend
        </span>
        <ChevronDown
          size={20}
          className="animate-bounce"
          style={{ animationDuration: "2.4s" }}
        />
      </motion.button>
    </section>
  );
};

export default Hero;
