import React from "react";

/**
 * CSS-only Dutch Man-O'-War silhouettes with parallax motion.
 * Three layers: distant fleet, mid ship, foreground hulk.
 */
const Ship = ({ className = "", style = {}, scale = 1, lit = false }) => (
  <svg
    viewBox="0 0 320 200"
    className={className}
    style={style}
    aria-hidden="true"
  >
    {/* Hull */}
    <path
      d="M30 150 Q 60 175 160 178 Q 260 175 290 150 L 270 165 Q 160 188 50 165 Z"
      fill="#04080c"
      stroke="rgba(212,175,55,0.18)"
      strokeWidth="0.6"
    />
    {/* Deck rail */}
    <path
      d="M50 152 L 270 152"
      stroke="rgba(212,175,55,0.25)"
      strokeWidth="0.5"
      fill="none"
    />
    {/* Masts */}
    <line x1="90" y1="150" x2="90" y2="40" stroke="#0a0f14" strokeWidth="2.2" />
    <line
      x1="160"
      y1="152"
      x2="160"
      y2="20"
      stroke="#0a0f14"
      strokeWidth="2.6"
    />
    <line
      x1="225"
      y1="150"
      x2="225"
      y2="45"
      stroke="#0a0f14"
      strokeWidth="2.2"
    />
    {/* Yards */}
    <line
      x1="60"
      y1="60"
      x2="120"
      y2="60"
      stroke="#0a0f14"
      strokeWidth="1.4"
    />
    <line
      x1="120"
      y1="40"
      x2="200"
      y2="40"
      stroke="#0a0f14"
      strokeWidth="1.6"
    />
    <line
      x1="195"
      y1="68"
      x2="255"
      y2="68"
      stroke="#0a0f14"
      strokeWidth="1.4"
    />
    {/* Sails */}
    <path
      d="M62 60 Q 90 72 118 60 L 118 110 Q 90 122 62 110 Z"
      fill="#0a141d"
      stroke="rgba(240,230,210,0.18)"
      strokeWidth="0.5"
    />
    <path
      d="M122 40 Q 160 55 198 40 L 198 120 Q 160 138 122 120 Z"
      fill="#0c1a25"
      stroke="rgba(240,230,210,0.22)"
      strokeWidth="0.6"
    />
    <path
      d="M197 68 Q 225 80 253 68 L 253 118 Q 225 130 197 118 Z"
      fill="#0a141d"
      stroke="rgba(240,230,210,0.18)"
      strokeWidth="0.5"
    />
    {/* Flag */}
    <path
      d="M160 20 L 178 24 L 173 30 L 178 36 L 160 32 Z"
      fill={lit ? "#E25822" : "#7a2e15"}
    />
    {/* Cannon flashes */}
    {lit && (
      <>
        <circle cx="70" cy="160" r="6" fill="rgba(255,170,80,0.9)">
          <animate
            attributeName="r"
            values="2;9;2"
            dur="4s"
            repeatCount="indefinite"
            begin="1.2s"
          />
          <animate
            attributeName="opacity"
            values="0;0.95;0"
            dur="4s"
            repeatCount="indefinite"
            begin="1.2s"
          />
        </circle>
        <circle cx="250" cy="160" r="5" fill="rgba(255,150,60,0.9)">
          <animate
            attributeName="r"
            values="2;8;2"
            dur="5s"
            repeatCount="indefinite"
            begin="2.6s"
          />
          <animate
            attributeName="opacity"
            values="0;0.9;0"
            dur="5s"
            repeatCount="indefinite"
            begin="2.6s"
          />
        </circle>
      </>
    )}
  </svg>
);

export default Ship;
