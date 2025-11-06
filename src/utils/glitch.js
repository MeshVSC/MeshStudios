// Glitch utility functions - shared between phases
// Lines 507-576 from original file

// Safe alphabet for letter switching (avoids block glyphs)
const SAFE_ALPH = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // avoids I,O,1,0

/**
 * Initialize elements for letter switching
 */
export function bootstrapSwitch() {
  document.querySelectorAll('.panel h1 span, .panel h2:not(.no-switch), .panel p').forEach(el => {
    if (!el.classList.contains('switch-v1')) el.classList.add('switch-v1');
    if (!el.dataset.orig) el.dataset.orig = el.textContent || '';
  });
}

/**
 * Switch letters in elements based on progress
 * @param {string} selector - CSS selector for elements to affect
 * @param {number} p - Progress value (0-1)
 */
export function switchLetters(selector, p) {
  const amp = Math.min(1, p * 2.2);
  document.querySelectorAll(selector).forEach(el => {
    const base = el.dataset.orig || el.textContent || '';
    let out = '';
    for (let i = 0; i < base.length; i++) {
      const ch = base[i];
      if (/\s/.test(ch) || /[^A-Za-z0-9]/.test(ch)) { out += ch; continue; }
      out += (Math.random() < amp) ? SAFE_ALPH[Math.floor(Math.random() * SAFE_ALPH.length)] : ch;
    }
    if (amp > 0.6) {
      let out2 = '';
      for (let i = 0; i < out.length; i++) {
        const ch = out[i];
        if (/\s/.test(ch) || /[^A-Za-z0-9]/.test(ch)) { out2 += ch; continue; }
        out2 += (Math.random() < (amp * 0.6)) ? SAFE_ALPH[Math.floor(Math.random() * SAFE_ALPH.length)] : ch;
      }
      el.textContent = out2;
    } else {
      el.textContent = out;
    }
  });
}

/**
 * Restore original letters
 * @param {string} selector - CSS selector for elements to restore
 */
export function restoreLetters(selector) {
  document.querySelectorAll(selector).forEach(el => {
    if (el.dataset.orig) el.textContent = el.dataset.orig;
  });
}

/**
 * Create a glitch burst animation for the whole page
 * @returns {GSAPTimeline} GSAP timeline for the glitch burst
 */
export function glitchBurst() {
  return gsap.timeline({ defaults: { ease: "power3.inOut" } })
    .to(".scan", { opacity: 0.7, duration: 0.08 }, 0)
    .to(".noise", { opacity: 0.45, duration: 0.08 }, 0)
    .to(".panel", { skewX: 0.3, filter: "contrast(1.12) saturate(1.05)", duration: 0.06 }, 0)
    .to(".panel", { skewX: -0.3, filter: "contrast(1.12) saturate(1.05)", duration: 0.06 }, 0.06)
    .to(".panel", { skewX: 0, filter: "none", duration: 0.08 }, 0.12)
    .to([".scan", ".noise"], { opacity: 0, duration: 0.2 }, 0.14);
}

/**
 * Create a glitch burst animation specifically for the 404 number
 * @returns {GSAPTimeline} GSAP timeline for the 404 glitch burst
 */
export function glitch404Burst() {
  return gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    .to('.num404', { 
      y: -2, 
      x: 1, 
      skewX: 1, 
      duration: 0.04, 
      filter: 'contrast(1.2) saturate(1.1) drop-shadow(1px 0 rgba(255,0,0,0.7)) drop-shadow(-1px 0 rgba(0,180,255,0.7))' 
    }, 0)
    .to('.num404', { y: 2, x: -1, skewX: -1, duration: 0.05 }, 0.05)
    .to('.num404', { clearProps: 'filter,transform', duration: 0.06 }, 0.10);
}
