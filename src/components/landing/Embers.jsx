import React, { useMemo } from "react";

/**
 * Animated drifting embers + cannon flashes — pure CSS.
 * Count is configurable.
 */
const Embers = ({ count = 26 }) => {
  const sparks = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const left = Math.random() * 100;
      const delay = Math.random() * 12;
      const duration = 10 + Math.random() * 14;
      const drift = (Math.random() - 0.5) * 220;
      const size = 1 + Math.random() * 3.5;
      return { left, delay, duration, drift, size, key: i };
    });
  }, [count]);

  return (
    <>
      {sparks.map((s) => (
        <span
          key={s.key}
          className="ember"
          style={{
            left: `${s.left}%`,
            bottom: `-${Math.random() * 12}vh`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            "--drift": `${s.drift}px`,
          }}
        />
      ))}
    </>
  );
};

export default Embers;
