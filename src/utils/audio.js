// Audio utility functions for the intro sequence

/**
 * Play a glitch sound effect
 * @param {number} n - The glitch sound number (1-3)
 */
export function playGlitch(n) {
  const el = document.getElementById(`sfx-glitch-${n}`);
  if (!el) return;
  try { 
    el.currentTime = 0; 
    el.play(); 
  } catch (e) { 
    // Silently fail if audio can't play (user interaction required, etc.)
  }
}

/**
 * Preload all audio elements
 */
export function preloadAudio() {
  for (let i = 1; i <= 3; i++) {
    const audio = document.getElementById(`sfx-glitch-${i}`);
    if (audio) {
      audio.load();
    }
  }
}

/**
 * Set volume for all glitch sounds
 * @param {number} volume - Volume level (0.0 to 1.0)
 */
export function setGlitchVolume(volume) {
  for (let i = 1; i <= 3; i++) {
    const audio = document.getElementById(`sfx-glitch-${i}`);
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume));
    }
  }
}

/**
 * Stop all audio playback
 */
export function stopAllAudio() {
  for (let i = 1; i <= 3; i++) {
    const audio = document.getElementById(`sfx-glitch-${i}`);
    if (audio && !audio.paused) {
      audio.pause();
      audio.currentTime = 0;
    }
  }

  const bgMusic = document.getElementById('bgMusic');
  if (bgMusic && !bgMusic.paused) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
}
