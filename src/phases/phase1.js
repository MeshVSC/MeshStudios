// Phase 1: 404 Glitch Sequence - LOCKED MODULE
// Lines 154-210 from original file - DO NOT MODIFY

import { glitchBurst, glitch404Burst, bootstrapSwitch, switchLetters, restoreLetters } from '../utils/glitch.js';

/**
 * Initialize Phase 1 - 404 Glitch Sequence (LOCKED)
 * @param {Object} config - Configuration object
 * @param {GSAPTimeline} config.timeline - Main GSAP timeline
 * @param {Function} config.audioCallback - Audio callback function
 * @param {Object} config.audioElements - Audio elements cache
 * @param {boolean} config.debug - Debug mode
 */
export function initPhase1(config) {
  const { timeline: tl, audioCallback, audioElements, debug = false } = config;
  
  if (debug) {
    console.log('[Phase1] Initializing LOCKED phase');
  }

  // === SCENE 1 — LOCKED (do not modify) ===
  window.__SCENE1_LOCKED = true;
  console.log('[lock] Scene 1 is LOCKED');

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // === BEGIN SCENE 1 (LOCKED) ===

  // Initial states
  tl.set(".stage", { opacity: 0 });
  tl.set([".three-words", ".conclusion", ".logo", ".hero"], { opacity: 0 });

  // Labels: only "takeover" up front
  tl.addLabel("takeover");

  // Beat 1: 404 takeover with glitch effect
  const GLITCH_TIMES = [4.0, 5.0, 5.5];

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // initial
  tl.set(".vortex, .noise, .scan", { opacity: 0 });
  tl.set(".stage", { opacity: 1 });
  tl.set(".scramble-v1", { opacity: 1 });

  // TV static distortion - immediate attention grab
  tl.call(() => document.querySelector('.stage')?.classList.add('screen-distort'), null, 1.2);
  tl.call(() => document.querySelector('.stage')?.classList.remove('screen-distort'), null, 1.35);

  // schedule glitch bursts (page-wide and 404-only), and sound fx
  GLITCH_TIMES.forEach((t, idx) => {
    tl.add(glitchBurst(), t);
    tl.add(glitch404Burst(), t);
    tl.call(() => audioCallback((idx % 3) + 1), null, t);
  });

  // bootstrap and run letter switching from 5.0s → 11.0s (stop at fade start)
  bootstrapSwitch();
  const sw = { p: 0 };
  tl.to(sw, {
    p: 1,
    duration: 10.0,
    ease: 'expo.inOut',
    onUpdate: () => switchLetters('.switch-v1', sw.p)
  }, 5.0)
    .call(() => restoreLetters('.switch-v1'), null, 11.0);

  // transition: fade to black (no white flash) — starts at 11.0s
  tl.to('.fade-black', { opacity: 1, duration: 0.35, ease: 'power2.inOut' }, 11.0)
    .to('.panel .col-span-6.pr-2', { opacity: 0, duration: 0.2 }, 11.0)
    .to('.panel .col-span-6.border-l', { opacity: 0, duration: 0.2 }, 11.0)
    .to('.stage', { opacity: 0, duration: 0.001 }, 15.0);
  // === END SCENE 1 (LOCKED) ===

  // reduced motion fallback
  if (reduce) {
    tl.clear()
      .to(".stage", { opacity: 1, duration: 0.5 })
      .to({}, { duration: 10.6 })
      .to(".stage", { opacity: 0.0, duration: 0.6 });
  }

  // NOW mark the end of Beat 1 as "code"
  tl.add("code", ">");

  if (debug) {
    console.log('[Phase1] LOCKED phase initialized');
  }
}
