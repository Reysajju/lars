# PRD — Devil on the Hudson Landing Page

## Original Problem Statement
Build a cinematic, "Nautical Noir" high-conversion landing page for *Devil on the Hudson* — a historical fiction novel by Lars De Brabander about the 1673 Dutch reconquest of New Amsterdam. Six sections, dark/textured aesthetic, parallax scroll, 3D book cover, embers, fog, ambient audio, Letter-of-Marque email signup.

## Architecture
- **Frontend**: React (CRA) + Tailwind + framer-motion + react-parallax-tilt + lucide-react + sonner. Single-page landing composed of section components in `/app/frontend/src/components/landing/`.
- **Backend**: FastAPI + Motor (Mongo). All routes prefixed `/api`.
- **Persistence**: `subscribers` Mongo collection (email lowercased, source tag, UUID id, ISO timestamp, no `_id` leak).

## Personas
- **Browser → Reader**: arrives via social/Amazon ad, scans hero, clicks "Get the Book" → Amazon, or "Explore the Legend" → continues scrolling.
- **Newsletter subscriber**: leaves email via "Letter of Marque" to receive author dispatches.
- **Author/Owner (Lars)**: needs the page to convert; subscriber list owned by him (in Mongo).

## Core Requirements (static)
- 6 sections: Hero "Inferno", Covenant Hook, Trident of Truth, Author Profile, Scroll of Honor (Reviews), Final Reconquest (CTA + footer).
- Color palette: `#0A0F14 / #1C1510 / #D4AF37 / #E25822`. Fonts: Cinzel Decorative + Spectral.
- Parallax scroll, scroll-triggered reveals, 3D book tilt, hover liquid-gold buttons, optional ambient audio toggle.
- Amazon CTA: https://www.amazon.com/Devil-Hudson-Lars-Brabander-ebook/dp/B0GX32ZZ5D
- All interactive elements carry `data-testid`.

## Implemented (December 2025)
- ✅ Hero with parallax CSS Dutch warships, embers, fog, cannon flashes, 3D-tilt custom book cover
- ✅ Covenant glass panel over darkened naval-map texture
- ✅ Trident of Truth 3-pillar grid with hover glow
- ✅ Author Profile w/ portrait, ornate dark-wood frame, gold-ink Pinyon Script signature, wax-seal accent
- ✅ Reviews marquee carousel (real Elma Bruin quote + reader-style quotes)
- ✅ Final Reconquest: Letter of Marque email form → POST `/api/subscribe`, Amazon CTA, NY skyline silhouette, VOC wax-seal social icons
- ✅ Ambient "Sound of the Hudson" WebAudio synth toggle (no external file)
- ✅ Backend `/api/subscribe`, `/api/subscribers/count` with duplicate detection (case-insensitive)
- ✅ Sonner toaster for form feedback
- ✅ noValidate on form so custom invalid-email toast is reachable
- ✅ Backend: 8/8 pytest passing; Frontend: 100% testid coverage

## Backlog / Next Tasks
- **P1**: Hero "Inferno" video background — currently CSS-art ships; can swap to a real ambient video file when sourced.
- **P1**: Wire subscriber export endpoint or admin view (`GET /api/subscribers` with auth) so author can pull list.
- **P2**: Mailchimp/Resend forwarding once author chooses ESP.
- **P2**: Replace placeholder reader-review quotes with verified reader testimonials.
- **P2**: Open Graph / SEO meta tags + share image.
- **P3**: Light analytics (Plausible/PostHog) for conversion tracking on the two CTAs.
- **P3**: A11y pass (focus rings on custom buttons, prefers-reduced-motion already respected for animations).
