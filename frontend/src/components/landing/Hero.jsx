import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";

const AMAZON_URL =
  "https://www.amazon.com/Devil-Hudson-Lars-Brabander-ebook/dp/B0GX32ZZ5D";

const SHIP_BG =
  "https://images.unsplash.com/photo-1761442663911-94b543328ce2?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHwxN3RoJTIwY2VudHVyeSUyMHNoaXAlMjBuaWdodCUyMGZvZ3xlbnwwfHx8fDE3Nzg2MTY5NzB8MA&ixlib=rb-4.1.0&q=85";

const Hero = () => {
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 900], [0, 180]);
  const contentY = useTransform(scrollY, [0, 700], [0, -80]);
  const contentOpacity = useTransform(scrollY, [0, 600], [1, 0.15]);

  const scrollToCovenant = () => {
    document
      .getElementById("covenant")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
      data-testid="hero-section"
    >
      {/* Background ship photo with parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 -top-[10%] -bottom-[10%]"
      >
        <img
          src={SHIP_BG}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ filter: "saturate(0.7) contrast(1.05) brightness(0.85)" }}
        />
      </motion.div>

      {/* Dark vignette + tone overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 45%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 75%, rgba(2,5,10,0.92) 100%), linear-gradient(180deg, rgba(2,5,10,0.55) 0%, rgba(2,5,10,0.2) 35%, rgba(2,5,10,0.5) 75%, #02050a 100%)",
        }}
      />

      {/* subtle film grain & fog for atmospheric depth */}
      <div className="fog-layer" />
      <div className="grain" />

      {/* Top brand bar */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 pt-8 flex items-center justify-between">
        <div
          className="font-display text-[#d4af37] text-lg sm:text-xl tracking-[0.3em]"
          data-testid="brand-mark"
        >
          D · H
        </div>
        <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-[0.35em] uppercase font-cinzel text-[#f0e6d2]/80">
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

      {/* Centered hero content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-20 max-w-6xl mx-auto px-6 sm:px-10 flex flex-col items-center justify-center text-center"
        // pull title slightly above geometric center for ship to peek
        // min height accounts for nav (~92px) and scroll indicator (~80px)
      >
        <div
          className="flex flex-col items-center justify-center"
          style={{ minHeight: "calc(100vh - 180px)", paddingTop: "4rem" }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="font-display text-shadow-noir"
            style={{
              fontSize: "clamp(2.6rem, 8.2vw, 7.5rem)",
              lineHeight: 1.02,
              fontWeight: 700,
              letterSpacing: "0.005em",
              color: "#D4AF37",
              textShadow:
                "0 2px 30px rgba(0,0,0,0.85), 0 0 50px rgba(212,175,55,0.18)",
            }}
            data-testid="hero-headline"
          >
            Devil on the Hudson
          </motion.h1>

          {/* Gold rule */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="my-7 sm:my-8 h-px w-28 sm:w-40 origin-center"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.85), transparent)",
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.85 }}
            className="font-body italic text-[#F0E6D2]/85 text-shadow-noir"
            style={{
              fontSize: "clamp(1rem, 2.1vw, 1.45rem)",
              letterSpacing: "0.04em",
            }}
            data-testid="hero-subtitle"
          >
            One colony. Two titans. The Devil himself.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="mt-12 sm:mt-14"
          >
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta"
              data-testid="cta-get-the-book"
            >
              Order the Legend
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={scrollToCovenant}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 text-[#F0E6D2]/80 hover:text-[#d4af37] transition-colors"
        data-testid="scroll-indicator"
        aria-label="Scroll to next section"
      >
        <span className="font-cinzel text-[10px] tracking-[0.55em] uppercase">
          Scroll
        </span>
        <ChevronDown
          size={22}
          className="animate-bounce"
          style={{ animationDuration: "2.4s" }}
        />
      </motion.button>
    </section>
  );
};

export default Hero;
