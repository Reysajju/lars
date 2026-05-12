import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Optional ambient "Sound of the Hudson" — a soft, low wind/wood-creak loop
 * synthesized in-browser with WebAudio (no external file required).
 */
const useHudsonAmbient = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const [playing, setPlaying] = useState(false);

  const start = async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;

      // Master gain
      const master = ctx.createGain();
      master.gain.value = 0.0;
      master.connect(ctx.destination);

      // Brown-noise wind
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.0;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 260;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.55;

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(master);
      noise.start();

      // LFO swell
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.06;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.25;
      lfo.connect(lfoGain).connect(noiseGain.gain);
      lfo.start();

      // Low drone
      const drone = ctx.createOscillator();
      drone.type = "sine";
      drone.frequency.value = 55;
      const droneGain = ctx.createGain();
      droneGain.gain.value = 0.08;
      drone.connect(droneGain).connect(master);
      drone.start();

      // Fade in
      master.gain.linearRampToValueAtTime(0.35, ctx.currentTime + 1.4);

      nodesRef.current = [noise, lfo, drone, master];
      setPlaying(true);
    } catch {
      // silent
    }
  };

  const stop = async () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    try {
      const master = nodesRef.current[3];
      if (master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
      }
      setTimeout(() => {
        nodesRef.current.forEach((n) => {
          try {
            n.stop && n.stop();
          } catch {}
          try {
            n.disconnect && n.disconnect();
          } catch {}
        });
        nodesRef.current = [];
        ctx.close().catch(() => {});
        ctxRef.current = null;
      }, 500);
    } finally {
      setPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      try {
        stop();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { playing, start, stop };
};

const AudioToggle = () => {
  const { playing, start, stop } = useHudsonAmbient();

  const handle = () => {
    if (playing) stop();
    else start();
  };

  return (
    <button
      type="button"
      className="audio-toggle"
      onClick={handle}
      aria-pressed={playing}
      aria-label={playing ? "Mute ambient" : "Play ambient"}
      data-testid="audio-toggle"
    >
      {playing ? <Volume2 size={14} /> : <VolumeX size={14} />}
      <span>{playing ? "Hudson · On" : "Hudson · Off"}</span>
    </button>
  );
};

export default AudioToggle;
