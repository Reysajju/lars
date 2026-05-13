'use client';
import React, { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Gregorian chant choir synthesized entirely in-browser via Web Audio API.
 * Creates multiple voice-like oscillators tuned to sacred harmonic intervals,
 * each with slow vibrato to simulate human choir voices chanting in a cathedral.
 */
const useGregorianChant = () => {
  const ctxRef = useRef(null);
  const nodesRef = useRef([]);
  const [playing, setPlaying] = useState(false);

  const start = async () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      // Soft reverb via convolver (impulse response synthesized)
      const convolver = ctx.createConvolver();
      const irLength = ctx.sampleRate * 3.5;
      const irBuffer = ctx.createBuffer(2, irLength, ctx.sampleRate);
      for (let ch = 0; ch < 2; ch++) {
        const data = irBuffer.getChannelData(ch);
        for (let i = 0; i < irLength; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / irLength, 2.2);
        }
      }
      convolver.buffer = irBuffer;
      convolver.connect(master);

      // Dry path
      const dryGain = ctx.createGain();
      dryGain.gain.value = 0.3;
      dryGain.connect(master);

      // Wet path (reverb)
      const wetGain = ctx.createGain();
      wetGain.gain.value = 0.7;
      wetGain.connect(convolver);

      const created = [master];

      // Gregorian chant intervals — root note D3 (146.83 Hz)
      // Unison, octave, perfect 5th, major 3rd, minor 7th (Dorian mode feel)
      const rootHz = 146.83;
      const voices = [
        { freq: rootHz,            gain: 0.28, vibratoRate: 0.11, vibratoDepth: 1.2 }, // root D3
        { freq: rootHz * 1.5,      gain: 0.22, vibratoRate: 0.09, vibratoDepth: 1.0 }, // 5th A3
        { freq: rootHz * 2,        gain: 0.18, vibratoRate: 0.13, vibratoDepth: 0.9 }, // octave D4
        { freq: rootHz * 1.25,     gain: 0.14, vibratoRate: 0.08, vibratoDepth: 0.8 }, // major 3rd F#3
        { freq: rootHz * 0.75,     gain: 0.20, vibratoRate: 0.10, vibratoDepth: 1.1 }, // 5th below A2
        { freq: rootHz * 1.333,    gain: 0.12, vibratoRate: 0.12, vibratoDepth: 0.7 }, // 4th G3
        { freq: rootHz * 2 * 1.5,  gain: 0.10, vibratoRate: 0.07, vibratoDepth: 0.6 }, // A4 high voice
        { freq: rootHz * 0.5,      gain: 0.16, vibratoRate: 0.06, vibratoDepth: 1.3 }, // sub-octave D2 bass
      ];

      for (const v of voices) {
        // Main oscillator — "sawtooth" shaped slightly toward sine for a soft choral tone
        const osc = ctx.createOscillator();
        osc.type = "sine";
        osc.frequency.value = v.freq;

        // Slight second oscillator slightly detuned for chorus/humanize effect
        const osc2 = ctx.createOscillator();
        osc2.type = "triangle";
        osc2.frequency.value = v.freq * 1.0015; // tiny detune

        // Vibrato LFO
        const lfo = ctx.createOscillator();
        lfo.frequency.value = v.vibratoRate;
        const lfoGain = ctx.createGain();
        lfoGain.gain.value = v.vibratoDepth;
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfoGain.connect(osc2.frequency);

        // Soft lowpass to remove harsh harmonics
        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 900;
        filter.Q.value = 0.8;

        const vGain = ctx.createGain();
        vGain.gain.value = v.gain * 0.5;

        osc.connect(filter);
        osc2.connect(filter);
        filter.connect(vGain);
        vGain.connect(dryGain);
        vGain.connect(wetGain);

        // Stagger the starts slightly for organic feel
        const startOffset = Math.random() * 0.3;
        osc.start(ctx.currentTime + startOffset);
        osc2.start(ctx.currentTime + startOffset);
        lfo.start(ctx.currentTime);

        created.push(osc, osc2, lfo);
      }

      // Slow swell in — cathedral entrance feel
      master.gain.linearRampToValueAtTime(0.55, ctx.currentTime + 3.5);

      nodesRef.current = created;
      setPlaying(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stop = async () => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    try {
      const master = nodesRef.current[0];
      if (master) {
        master.gain.cancelScheduledValues(ctx.currentTime);
        master.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.2);
      }
      setTimeout(() => {
        nodesRef.current.forEach((n) => {
          try { n.stop && n.stop(); } catch {}
          try { n.disconnect && n.disconnect(); } catch {}
        });
        nodesRef.current = [];
        ctx.close().catch(() => {});
        ctxRef.current = null;
      }, 1400);
    } finally {
      setPlaying(false);
    }
  };

  useEffect(() => {
    return () => { try { stop(); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { playing, start, stop };
};

const AudioToggle = () => {
  const { playing, start, stop } = useGregorianChant();

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
      aria-label={playing ? "Mute choir" : "Play choir"}
      data-testid="audio-toggle"
    >
      {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
    </button>
  );
};

export default AudioToggle;
