import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Anchor, ArrowRight } from "lucide-react";
import Embers from "./Embers";

const API = `/api`;
const AMAZON_URL =
  "https://www.amazon.com/Devil-Hudson-Lars-Brabander-ebook/dp/B0GX32ZZ5D";

const FinalReconquest = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
      toast.error("Inscribe a true email upon the parchment.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${API}/subscribe`, { email: value });
      if (res.data?.already_subscribed) {
        toast.success(res.data.message || "Already aboard.");
      } else {
        toast.success(res.data?.message || "Welcome aboard, sailor.");
      }
      setEmail("");
    } catch (err) {
      toast.error(
        err?.response?.data?.detail?.[0]?.msg ||
          "The carrier failed. Try once more."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="fleet"
      className="relative pt-32 pb-12 overflow-hidden"
      data-testid="final-section"
    >
      {/* Background atmospheric */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(226,88,34,0.18) 0%, transparent 60%), linear-gradient(180deg, #060a0e 0%, #02050a 100%)",
        }}
      />
      <div className="fog-layer" />
      <Embers count={18} />
      <div className="grain" />

      <div className="relative max-w-5xl mx-auto px-6 sm:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9 }}
        >
          <div className="heading-rule justify-center mb-6">
            <span>The Final Reconquest</span>
          </div>

          <h2
            className="font-display text-[#F0E6D2] text-shadow-noir"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 5rem)",
              lineHeight: 1.02,
              fontWeight: 900,
            }}
            data-testid="final-headline"
          >
            Join the <span className="gold-shimmer">Fleet.</span>
            <br />
            Or <span className="text-[#E25822] text-shadow-ember">Seize</span>{" "}
            the Hudson.
          </h2>

          <p className="font-body text-sand mt-6 max-w-xl mx-auto">
            Inscribe your name in the ship's log — receive the captain's
            dispatches, behind-the-archive chapters, and the next sailing's
            cannon-call.
          </p>
        </motion.div>

        {/* Letter of Marque form */}
        <motion.form
          onSubmit={handleSubmit}
          noValidate
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative mt-12 max-w-2xl mx-auto parchment-panel ornate-corner p-8 sm:p-10"
          data-testid="letter-of-marque-form"
        >
          <div className="font-cinzel text-[10px] tracking-[0.45em] uppercase text-[#d4af37] mb-2">
            ✦ Letter of Marque ✦
          </div>
          <div className="font-display text-[#F0E6D2] text-lg sm:text-xl mb-6">
            Be it known to all subjects of the realm —
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center text-left">
            <div className="flex items-center gap-3 flex-1 w-full">
              <Mail size={16} className="text-[#d4af37] shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.name@vessel.sea"
                className="marque-input"
                data-testid="email-input"
                aria-label="Email"
              />
            </div>
            <button
              type="submit"
              className="btn-ember w-full sm:w-auto shrink-0"
              disabled={submitting}
              data-testid="subscribe-submit"
            >
              {submitting ? "Sealing…" : "Sign & Seal"}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-5 text-xs font-cinzel tracking-[0.25em] uppercase text-[#A8A092]">
            By signing, ye consent to occasional dispatches. Strike from the
            rolls at any time.
          </div>
        </motion.form>

        {/* Secondary CTA */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href={AMAZON_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ember"
            data-testid="footer-cta-amazon"
          >
            <Anchor size={16} />
            Seize the Book on Amazon
          </a>
        </div>
      </div>

      {/* Skyline silhouette */}
      <div className="relative mt-24">
        <div className="skyline" />
      </div>

      {/* Footer bar */}
      <footer className="relative z-10 mt-6 border-t border-[#d4af37]/15">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="font-display text-[#d4af37] text-lg tracking-[0.3em]">
              D · H
            </div>
            <span className="font-cinzel text-[9px] tracking-[0.35em] uppercase text-[#A8A092]">
              Devil on the Hudson · MDCLXXIII
            </span>
          </div>

          <div
            className="flex items-center gap-3"
            data-testid="social-seals"
            aria-label="Social channels"
          >
            <a
              href={AMAZON_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="wax-seal"
              aria-label="Amazon"
              data-testid="seal-amazon"
            >
              <span className="font-display text-xs tracking-wider">A</span>
            </a>
            <span
              className="wax-seal"
              aria-label="Voice of the Company"
              data-testid="seal-voc"
              title="V.O.C."
            >
              <span className="font-display text-xs tracking-wider">VOC</span>
            </span>
            <span
              className="wax-seal"
              aria-label="Hudson"
              data-testid="seal-hudson"
              title="Hudson"
            >
              <span className="font-display text-xs tracking-wider">H</span>
            </span>
          </div>

          <div className="font-cinzel text-[9px] tracking-[0.3em] uppercase text-[#A8A092]">
            © {new Date().getFullYear()} Lars De Brabander · All sails reserved
          </div>
        </div>
      </footer>
    </section>
  );
};

export default FinalReconquest;
