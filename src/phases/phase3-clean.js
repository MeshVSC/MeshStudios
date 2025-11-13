// Phase 3: Clean Reality Revelation Sequence - REWRITTEN

import { MediaWindowManager } from '../components/MediaWindowManager.js?v=8';

const PHASE3_SENTENCE_PREFIX = 'Reality is no longer what you';
const PHASE3_CYCLES = [
  { sense: 'see', word: 'see...', glitchLevel: 1, noise: 0.35, typingDelay: 65, windowLinger: 3800 },
  { sense: 'hear', word: 'hear...', glitchLevel: 2, noise: 0.55, typingDelay: 65, windowLinger: 3800 },
  { sense: 'touch', word: 'touch...', glitchLevel: 3, noise: 0.75, typingDelay: 65, windowLinger: 3800 },
  { sense: 'build', word: 'build.', prefix: 'Reality is what you', glitchLevel: 4, noise: 0.6, typingDelay: 60, windowLinger: 5200, final: true }
];
const LETTER_STAGGER = 0.03;
const NOISE_CLASSES = [
  'phase3-noise-level-1',
  'phase3-noise-level-2',
  'phase3-noise-level-3',
  'phase3-noise-level-4'
];
const TEXT_GLITCH_CLASSES = [
  'mesh-glitch-corrupt',
  'mesh-glitch-breach',
  'mesh-glitch-datamosh',
  'mesh-glitch-random',
  'glitch'
];

// === CRT Noise Generator (reference-based) ===

let mediaWindowManager = null;
// SEE-only implementation
let crtNoiseFrame = null; // Track animation frame for CRT noise
let phase3LetterSpans = [];
let phase3SenseLetterSpans = [];
let phase3ActiveCycle = null;
let phase3SensePulseTimeline = null;
let phase3GlitchClassTimeout = null;
let phase3ActiveGlitchClasses = new Set();
let phase3UsedGlitchClasses = new Set();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function resetPhase3TextState() {
  phase3LetterSpans = [];
  phase3SenseLetterSpans = [];
  phase3ActiveCycle = null;
  stopPhase3GlitchClassLoop();
  const sentence = document.getElementById('phase3-text');
  if (sentence) {
    TEXT_GLITCH_CLASSES.forEach(cls => sentence.classList.remove(cls));
    sentence.removeAttribute('data-text');
  }
}

function applySentenceBaseStyles(el) {
  if (!el) return;
  el.style.opacity = '1';
  el.style.position = 'fixed';
  el.style.top = '50%';
  el.style.left = '50%';
  el.style.transform = 'translate(-50%, -50%)';
  el.style.margin = '0';
  el.style.fontSize = '20px';
  el.style.fontWeight = 'normal';
  el.style.color = '#111111';
  el.style.fontFamily = 'SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
  el.style.whiteSpace = 'nowrap';
  el.style.textAlign = 'center';
  el.style.lineHeight = '1.2';
  el.style.letterSpacing = '0.08em';
  el.style.display = 'inline-block';
  el.style.width = 'auto';
  el.style.maxWidth = '90vw';
  el.style.alignSelf = 'center';
  el.style.padding = '0';
  el.style.pointerEvents = 'none';
  el.style.zIndex = '9000';
  el.style.textShadow = '0 0 12px rgba(0, 0, 0, 0.15)';
}

function prepareSentenceLetters(sentence, text, { senseWord = '' } = {}) {
  if (!sentence) return;
  sentence.innerHTML = '';
  phase3LetterSpans = [];
  phase3SenseLetterSpans = [];

  const normalizedSense = (senseWord || '').trim();
  const lowerText = text.toLowerCase();
  const lowerSense = normalizedSense.toLowerCase();
  const senseStart = normalizedSense ? lowerText.lastIndexOf(lowerSense) : -1;
  const senseEnd = senseStart >= 0 ? senseStart + normalizedSense.length : -1;

  let charIndex = 0;

  text.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'phase3-letter';
    span.textContent = char === ' ' ? '\u00A0' : char;
    span.style.display = 'inline-block';
    span.style.opacity = '1';
    span.style.transform = 'translateY(0)';
    phase3LetterSpans.push(span);
    if (senseStart >= 0 && charIndex >= senseStart && charIndex < senseEnd) {
      span.classList.add('phase3-letter-sense');
      phase3SenseLetterSpans.push(span);
    } else {
      span.classList.add('phase3-letter-body');
    }
    sentence.appendChild(span);
    charIndex += 1;
  });
  sentence.setAttribute('data-text', text);
}

function collapseSentenceToSenseWord(cycle, onWindowsStart) {
  return new Promise((resolve) => {
    phase3ActiveCycle = cycle;
    if (phase3SensePulseTimeline) {
      phase3SensePulseTimeline.kill();
      phase3SensePulseTimeline = null;
    }
    if (typeof onWindowsStart === 'function') {
      onWindowsStart();
    }
    resolve();
  });
}

/**
 * Initialize Phase 3 - Reality Revelation Sequence
 * @param {Object} config - Configuration object
 * @param {boolean} config.debug - Debug mode
 */
export function initPhase3(config) {
  const { debug = false } = config;

  if (debug) {
    console.log('[Phase3] Initializing reality revelation sequence');
  }

  // Initialize MediaWindowManager
  mediaWindowManager = new MediaWindowManager();

  // Listen for custom event to start sequence directly
  document.addEventListener('startPhase3Sequence', (event) => {
    if (debug) {
      console.log('[Phase3] Received startPhase3Sequence event');
    }
    startPhase3Clean(event.detail?.debug || debug);
  });
}

/**
 * Start Phase 3 cleanly without any complex transitions
 */
function startPhase3Clean(debug) {
  if (debug) {
    console.log('[Phase3] Starting clean Phase 3');
  }

  document.body.classList.remove('off');

  // Kill everything
  try {
    if (window.gsap) {
      gsap.killTweensOf("*");
    }
  } catch(e) {}

  // Override glitch functions
  window.switchLetters = function() {};

  // Set white background
  document.body.style.background = 'white';
  document.body.style.backgroundColor = 'white';
  console.log('[Phase3] Body background reset to white');

  // Hide other phases
  const stage = document.querySelector('.stage');
  const phase2 = document.querySelector('.phase2');
  if (stage) stage.style.display = 'none';
  if (phase2) {
    phase2.style.display = 'none';
    phase2.style.opacity = '0';
  }

  // Explicitly hide Phase 2's black background elements
  const rippleBg = document.querySelector('.ripple-bg');
  if (rippleBg) rippleBg.style.display = 'none';
  const codeFlood = document.querySelector('.code-flood');
  if (codeFlood) codeFlood.style.display = 'none';

  // Clear the black fade overlay from Phase 1
  const fadeBlack = document.querySelector('.fade-black');
  if (fadeBlack) fadeBlack.style.opacity = '0';

  resetPhase3TextState();

  // Show Phase 3
  const phase3 = document.querySelector('.phase3');
  if (phase3) {
    phase3.style.display = 'block';
    phase3.style.opacity = '1';
    phase3.style.background = 'transparent';
    phase3.style.backgroundColor = 'transparent';
  }

  // Change skip button back to black for Phase 3
  const skipBtn = document.getElementById('skipBtn');
  if (skipBtn) skipBtn.classList.replace('text-white', 'text-black');
  const audioBtn = document.getElementById('audioToggleBtn');
  if (audioBtn) audioBtn.classList.remove('text-white');

  // Reset media window manager for new cycle
  if (mediaWindowManager) {
    mediaWindowManager.resetForNewCycle();
  }

  // Start with cursor blinking, then typing
  setTimeout(() => {
    startCursorBlinkingBeforeText(debug);
  }, 1000);
}

/**
 * Start clean typing effect
 */
function startCleanTyping(debug) {
  runPhase3Cycles(debug);
}

async function runPhase3Cycles(debug) {
  const sentence = document.getElementById('phase3-text');
  if (!sentence) {
    console.error('[Phase3] Sentence element not found');
    return;
  }

  applySentenceBaseStyles(sentence);

  for (let i = 0; i < PHASE3_CYCLES.length; i++) {
    const cycle = PHASE3_CYCLES[i];
    if (debug) {
      console.log('[Phase3] Cycle start', cycle.sense);
    }
    await playPhase3Cycle(sentence, cycle, debug);
  }

  clearSentenceGlitch(sentence);
  setNoiseLevel(0);
  if (debug) {
    console.log('[Phase3] Sequence complete – transitioning to main website');
  }

  // Transition to main website
  await transitionToWebsiteMain(debug);
}

async function playPhase3Cycle(sentence, cycle, debug) {
  resetPhase3TextState();
  phase3ActiveCycle = cycle;
  sentence.textContent = '';
  applySentenceBaseStyles(sentence);
  applySentenceGlitch(sentence, cycle.glitchLevel);
  setNoiseLevel(cycle.glitchLevel);
  startPhase3GlitchClassLoop();

  await typeCycleSentence(sentence, cycle, debug);

  await delay(3000);

  let windowsPromise = null;
  await collapseSentenceToSenseWord(cycle, () => {
    windowsPromise = launchCycleWindows(cycle, debug);
  });

  if (windowsPromise) {
    await windowsPromise;
  }

  await glitchOutSenseWord(cycle);
  stopPhase3GlitchClassLoop();

  if (!cycle.final) {
    await performCycleShutdown();
    clearSentenceGlitch(sentence);
    setNoiseLevel(0);
  } else {
    clearSentenceGlitch(sentence);
  }
}

function typeCycleSentence(sentence, cycle, debug) {
  return new Promise((resolve) => {
    const prefix = cycle.prefix ?? PHASE3_SENTENCE_PREFIX;
    const text = `${prefix} ${cycle.word}`;
    const characters = text.split('');
    sentence.textContent = '';
    sentence.setAttribute('data-text', '');

    (function animate(index = 0) {
      if (index >= characters.length) {
        prepareSentenceLetters(sentence, text, { senseWord: cycle.word.trim() });
        resolve();
        return;
      }

      sentence.textContent += characters[index];
      sentence.setAttribute('data-text', sentence.textContent);

      if (debug && index % 6 === 0) {
        console.log('[Phase3] Typing progress', sentence.textContent || sentence.innerText);
      }

      const delay = cycle.typingDelay ?? 90;
      setTimeout(() => animate(index + 1), delay);
    })();
  });
}

function launchCycleWindows(cycle, debug) {
  return new Promise((resolve) => {
    if (!mediaWindowManager) {
      resolve();
      return;
    }

    mediaWindowManager.resetForNewCycle();

    const linger = cycle.windowLinger ?? (cycle.final ? 5200 : 3800);

    mediaWindowManager.showWindowsSequentially(
      40,
      () => {
        setTimeout(() => {
          mediaWindowManager.hideAllWindowsInstantly();
          resolve();
        }, linger);
      },
      { sense: cycle.sense, intensity: cycle.glitchLevel }
    );
  });
}

function glitchOutSenseWord() {
  return new Promise((resolve) => {
    if (phase3SensePulseTimeline) {
      phase3SensePulseTimeline.kill();
      phase3SensePulseTimeline = null;
    }
    resolve();
  });
}

function startPhase3GlitchClassLoop() {
  stopPhase3GlitchClassLoop();
  phase3ActiveGlitchClasses.clear();
  phase3UsedGlitchClasses.clear();
  phase3GlitchClassTimeout = setTimeout(runPhase3GlitchClassPulse, 140);
}

function stopPhase3GlitchClassLoop() {
  if (phase3GlitchClassTimeout) {
    clearTimeout(phase3GlitchClassTimeout);
    phase3GlitchClassTimeout = null;
  }
  const text = document.getElementById('phase3-text');
  if (text) {
    phase3ActiveGlitchClasses.forEach(cls => text.classList.remove(cls));
  }
  phase3ActiveGlitchClasses.clear();
  phase3UsedGlitchClasses.clear();
}

function runPhase3GlitchClassPulse() {
  const text = document.getElementById('phase3-text');
  if (!text) {
    stopPhase3GlitchClassLoop();
    return;
  }

  text.setAttribute('data-text', text.textContent || text.innerText || '');

  // Remove a few classes to keep motion unpredictable
  const active = Array.from(phase3ActiveGlitchClasses);
  active.forEach(cls => {
    const shouldRemove = phase3ActiveGlitchClasses.size > 3 || Math.random() < 0.25;
    if (shouldRemove) {
      text.classList.remove(cls);
      phase3ActiveGlitchClasses.delete(cls);
    }
  });

  // Determine how many new classes to add this pulse
  const additions = 1 + Math.floor(Math.random() * 3); // 1 to 3 classes
  for (let i = 0; i < additions; i++) {
    const nextClass = pickPhase3GlitchClass();
    if (!nextClass) break;
    text.classList.add(nextClass);
    phase3ActiveGlitchClasses.add(nextClass);
    phase3UsedGlitchClasses.add(nextClass);
  }

  // Ensure every class appears at least once per cycle
  if (phase3UsedGlitchClasses.size === TEXT_GLITCH_CLASSES.length && Math.random() < 0.2) {
    phase3UsedGlitchClasses.clear();
  }

  const nextDelay = 180 + Math.random() * 360;
  phase3GlitchClassTimeout = setTimeout(runPhase3GlitchClassPulse, nextDelay);
}

function pickPhase3GlitchClass() {
  const available = TEXT_GLITCH_CLASSES.filter(cls => !phase3ActiveGlitchClasses.has(cls));
  const unused = available.filter(cls => !phase3UsedGlitchClasses.has(cls));
  const pool = unused.length ? unused : available;
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

async function performCycleShutdown() {
  await triggerCRTShutdown(900);
  resetPhase3TextState();
  await triggerCRTStartup(260);
}

function transitionBetweenCycles() {
  return new Promise((resolve) => {
    const overlay = document.querySelector('.fade-black');
    const sentence = document.getElementById('phase3-text');

    const tl = gsap.timeline({
      onComplete: resolve
    });

    tl.to(overlay, {
      opacity: 1,
      duration: 0.25,
      ease: 'power4.in'
    })
      .call(() => {
        if (sentence) {
          sentence.textContent = '';
        }
        resetPhase3TextState();
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.25,
        ease: 'power4.out'
      }, '+=0.12');
  });
}

function triggerCRTShutdown(duration = 800) {
  return new Promise((resolve) => {
    const crt = document.getElementById('crt-container');
    const noiseCanvas = document.getElementById('crt-noise');

    if (noiseCanvas) {
      noiseCanvas.width = window.innerWidth;
      noiseCanvas.height = window.innerHeight;
      const ctx = noiseCanvas.getContext('2d');
      if (ctx) {
        animateNoise(ctx);
      }
    }

    if (crt) {
      crt.style.display = 'block';
    }

    document.body.classList.add('off');

    setTimeout(() => resolve(), duration);
  });
}

function triggerCRTStartup(duration = 250) {
  return new Promise((resolve) => {
    stopNoise();
    document.body.classList.remove('off');
    const crt = document.getElementById('crt-container');
    if (crt) {
      crt.style.display = 'none';
    }
    setTimeout(resolve, duration);
  });
}

function applySentenceGlitch(sentence, level = 1) {
  // Intentionally left blank to keep sentence perfectly static
}

function clearSentenceGlitch(sentence) {
  if (!sentence) return;
  TEXT_GLITCH_CLASSES.forEach(cls => sentence.classList.remove(cls));
}

function setNoiseLevel(level = 0) {
  const body = document.body;
  NOISE_CLASSES.forEach(cls => body.classList.remove(cls));
  if (!level) return;
  const index = Math.min(NOISE_CLASSES.length, Math.max(1, Math.round(level))) - 1;
  body.classList.add(NOISE_CLASSES[index]);
}

/**
 * Fade everything to black and restart cycle
 */
function fadeToBlackAndRestart(debug) {
  if (debug) {
    console.log('[Phase3] Resetting scene and keeping white background');
  }

  setNoiseLevel(0);

  // Hide windows but keep transparent overlay
  if (mediaWindowManager) {
    mediaWindowManager.hideAllWindowsInstantly();
  }

  // Ensure CRT overlay and noise are deactivated
  stopNoise();
  const crt = document.getElementById('crt-container');
  if (crt) crt.style.display = 'none';
  document.body.classList.remove('off');

  // Keep body and phase container white/transparent
  document.body.style.background = 'white';
  document.body.style.backgroundColor = 'white';
  const phase3 = document.querySelector('.phase3');
  if (phase3) {
    phase3.style.background = 'transparent';
    phase3.style.backgroundColor = 'transparent';
  }

  // Restore sentence visibility
  const sentence = document.getElementById('phase3-text');
  if (sentence) {
    sentence.style.opacity = '1';
  }

  resetPhase3TextState();
}


/**
 * Show blinking cursor before text starts typing
 */
function startCursorBlinkingBeforeText(debug) {
  if (debug) {
    console.log('[Phase3] Starting cursor blinking');
  }

  resetPhase3TextState();

  // Find sentence element and prepare it
  const sentence = document.getElementById('phase3-text');
  if (!sentence) {
    console.error('[Phase3] Sentence element not found for cursor');
    return;
  }

  // Position and style the cursor
  sentence.textContent = '';
  applySentenceBaseStyles(sentence);

  // Start blinking cursor
  let blinkCount = 0;
  let isVisible = true;

  const blinkInterval = setInterval(() => {
    if (isVisible) {
      sentence.textContent = '|'; // Show cursor
    } else {
      sentence.textContent = ''; // Hide cursor
      blinkCount++;
    }

    isVisible = !isVisible;

    // After 3 complete blinks (6 state changes), start typing
    if (blinkCount >= 3) {
      clearInterval(blinkInterval);
      sentence.textContent = ''; // Clear cursor

      if (debug) {
        console.log('[Phase3] Cursor blink complete, starting text typing');
      }

      // Start typing the text
      setTimeout(() => {
        startCleanTyping(debug);
      }, 200);
    }
  }, 500); // Blink every 500ms (on/off)
}



// --- Noise animation helpers (based on reference) ---
function snow(ctx) {
  var w = ctx.canvas.width,
      h = ctx.canvas.height,
      d = ctx.createImageData(w, h),
      b = new Uint32Array(d.data.buffer),
      len = b.length;

  for (var i = 0; i < len; i++) {
    b[i] = ((255 * Math.random()) | 0) << 24;
  }

  ctx.putImageData(d, 0, 0);
}

function animateNoise(ctx) {
  snow(ctx);
  crtNoiseFrame = requestAnimationFrame(() => animateNoise(ctx));
}

function stopNoise() {
  if (crtNoiseFrame) cancelAnimationFrame(crtNoiseFrame);
  crtNoiseFrame = null;
}

/**
 * Transition from Phase 3 to the main website
 */
async function transitionToWebsiteMain(debug) {
  if (debug) {
    console.log('[Phase3] Starting transition to WebsiteMain');
  }

  // Fade out Phase 3
  const phase3 = document.querySelector('.phase3');
  const sentence = document.getElementById('phase3-text');

  if (sentence) {
    gsap.to(sentence, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut'
    });
  }

  await delay(800);

  // Hide Phase 3
  if (phase3) {
    phase3.style.display = 'none';
  }

  // Show WebsiteMain
  const websiteContainer = document.querySelector('.website-main');
  if (websiteContainer) {
    websiteContainer.style.display = 'block';
    gsap.fromTo(websiteContainer,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    );
  } else {
    // If WebsiteMain container doesn't exist, we need to trigger it from main.js
    document.dispatchEvent(new CustomEvent('showWebsiteMain'));
  }

  if (debug) {
    console.log('[Phase3] Transition to WebsiteMain complete');
  }
}

/**
 * Show neural network animation demo after Phase 3 ends
 */
