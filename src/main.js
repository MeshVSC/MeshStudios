// Main timeline coordinator for the intro sequence
// Handles phase transitions and shared dependencies

import { initPhase1 } from './phases/phase1.js';
import { initPhase2 } from './phases/phase2.js';
import { initPhase3 } from './phases/phase3-clean.js';
import { initUIOverlay } from './phases/ui-overlay.js';
import { playGlitch, stopAllAudio } from './utils/audio.js';
import { WebsiteMain } from './components/WebsiteMain.js';

class IntroSequence {
  constructor() {
    this.timeline = null;
    this.currentPhase = null;
    this.config = {
      enableUIOverlay: true, // ENABLED - needed for "Press here" button
      skipPhases: false,
      debug: false,
      enableAudio: false
    };
    this.audioEnabled = false;
    
    // Shared dependencies
    this.sharedElements = {
      canvas: null,
      phase2Element: null,
      phase3Element: null,
      audioElements: {}
    };
    this.bgMusicElement = null;
  }

  init(config = {}) {
    // Merge configuration
    this.config = { ...this.config, ...config };
    this.audioEnabled = this.config.enableAudio === true ? true : false;
    
    // Check for reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.handleReducedMotion();
      return;
    }

    // Handle skip to Phase 2
    if (this.config.skipToPhase2) {
      this.skipToPhase2();
      return;
    }

    // Handle skip to Phase 3
    if (this.config.skipToPhase3) {
      this.skipToPhase3();
      return;
    }

    // Initialize GSAP timeline
    this.timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Cache shared elements
    this.cacheElements();
    this.setupAudioToggle();
    this.updateAudioToggleUI();
    
    // Initialize all phases
    this.initializePhases();
    
    if (this.config.debug) {
      console.log('[IntroSequence] Initialization complete');
    }
  }

  cacheElements() {
    this.sharedElements.canvas = document.getElementById('canvas');
    this.sharedElements.phase2Element = document.querySelector('.phase2');
    this.sharedElements.phase3Element = document.querySelector('.phase3');
    this.bgMusicElement = document.getElementById('bgMusic');
    
    // Cache audio elements
    for (let i = 1; i <= 3; i++) {
      this.sharedElements.audioElements[`sfx-glitch-${i}`] = document.getElementById(`sfx-glitch-${i}`);
    }
  }

  initializePhases() {
    // Phase 1: 404 Glitch Sequence (LOCKED - do not modify)
    const phase1Config = {
      timeline: this.timeline,
      audioCallback: (n) => {
        if (this.audioEnabled) {
          playGlitch(n);
        }
      },
      audioElements: this.sharedElements.audioElements,
      debug: this.config.debug
    };
    initPhase1(phase1Config);

    // Phase 2: Code Rain + Boot Sequence
    const phase2Config = {
      timeline: this.timeline,
      canvas: this.sharedElements.canvas,
      phase2Element: this.sharedElements.phase2Element,
      enableUIOverlay: this.config.enableUIOverlay,
      uiOverlayCallback: this.config.enableUIOverlay ? initUIOverlay : null,
      isAudioEnabled: () => this.audioEnabled,
      onBackgroundMusicRequest: () => this.playBackgroundMusic(),
      debug: this.config.debug
    };
    initPhase2(phase2Config);

    // Phase 3: Reality Revelation
    const phase3Config = {
      timeline: this.timeline,
      phase2Element: this.sharedElements.phase2Element,
      phase3Element: this.sharedElements.phase3Element,
      debug: this.config.debug
    };
    initPhase3(phase3Config);

    // Wire up skip button
    this.setupSkipButton();
  }

  setupSkipButton() {
    const skipBtn = document.getElementById('skipBtn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        this.skipToPhase3();
      });
    }
  }

  skipToPhase2() {
    if (this.config.debug) {
      console.log('[IntroSequence] Skipping directly to Phase 2');
    }
    
    // Initialize GSAP timeline for Phase 2 only
    this.timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Cache shared elements
    this.cacheElements();
    
    // Hide Phase 1 (404 screen)
    const stage = document.querySelector('.stage');
    if (stage) stage.style.display = 'none';
    
    // Show Phase 2 immediately
    const phase2 = document.querySelector('.phase2');
    if (phase2) {
      phase2.style.opacity = '1';
      phase2.classList.remove('pointer-events-none');
    }

    // Initialize Phase 2 directly
    const phase2Config = {
      timeline: this.timeline,
      canvas: this.sharedElements.canvas,
      phase2Element: this.sharedElements.phase2Element,
      enableUIOverlay: this.config.enableUIOverlay,
      uiOverlayCallback: this.config.enableUIOverlay ? initUIOverlay : null,
      isAudioEnabled: () => this.audioEnabled,
      onBackgroundMusicRequest: () => this.playBackgroundMusic(),
      debug: this.config.debug
    };
    initPhase2(phase2Config);
    
    // Also initialize Phase 3 for CTA functionality
    const phase3Config = {
      timeline: this.timeline,
      phase2Element: this.sharedElements.phase2Element,
      phase3Element: this.sharedElements.phase3Element,
      debug: this.config.debug
    };
    initPhase3(phase3Config);
  }

  skipToPhase3() {
    if (this.config.debug) {
      console.log('[IntroSequence] Skip intercepted - delegating to HTML skip button handler');
    }
    // Do nothing - let the HTML skip button handle everything
    // This prevents double initialization
  }

  handleReducedMotion() {
    // Simplified animation for reduced motion preference
    const timeline = gsap.timeline();
    timeline
      .to(".stage", { opacity: 1, duration: 0.5 })
      .to({}, { duration: 10.6 })
      .to(".stage", { opacity: 0.0, duration: 0.6 });
  }

  // Public API for external control
  pause() {
    if (this.timeline) this.timeline.pause();
  }

  resume() {
    if (this.timeline) this.timeline.resume();
  }

  destroy() {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }
    // Clean up any lingering effects
    this.cleanupPhases();
  }

  cleanupPhases() {
    // Stop any running intervals or animations
    const phase2 = document.querySelector('.phase2');
    if (phase2 && phase2.__stopWake) {
      phase2.__stopWake();
    }

    // Clear any canvas animations
    if (this.sharedElements.canvas) {
      const ctx = this.sharedElements.canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.sharedElements.canvas.width, this.sharedElements.canvas.height);
      }
    }
  }

  setupAudioToggle() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (!audioBtn || audioBtn.__audioBound) {
      return;
    }

    audioBtn.__audioBound = true;
    audioBtn.addEventListener('click', () => {
      this.toggleAudio();
    });
  }

  updateAudioToggleUI() {
    const audioBtn = document.getElementById('audioToggleBtn');
    if (!audioBtn) return;

    const label = this.audioEnabled ? 'Mute audio' : 'Unmute audio';
    audioBtn.innerHTML = this.getAudioIcon(this.audioEnabled);
    audioBtn.setAttribute('aria-pressed', this.audioEnabled ? 'true' : 'false');
    audioBtn.setAttribute('aria-label', label);
    audioBtn.setAttribute('title', label);
  }

  toggleAudio() {
    this.setAudioEnabled(!this.audioEnabled);
  }

  setAudioEnabled(enabled) {
    this.audioEnabled = enabled;
    this.updateAudioToggleUI();

    if (!enabled) {
      stopAllAudio();
      this.pauseBackgroundMusic();
    } else {
      this.playBackgroundMusic();
    }
  }

  pauseBackgroundMusic() {
    if (this.bgMusicElement && !this.bgMusicElement.paused) {
      this.bgMusicElement.pause();
      this.bgMusicElement.currentTime = 0;
    }
  }

  playBackgroundMusic() {
    if (!this.audioEnabled || !this.bgMusicElement) return;
    if (window.__WATER_STARTED) {
      this.bgMusicElement.play().catch(() => {});
    }
  }

  getAudioIcon(enabled) {
    if (enabled) {
      return `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 9v6h3.5L13 20V4L7.5 9H4z"></path>
          <path d="M16.5 8.5c1.5 1.5 1.5 5.5 0 7"></path>
          <path d="M19.5 6.5c3 3 3 9 0 12"></path>
        </svg>
      `;
    }
    return `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 9v6h3.5L13 20V4L7.5 9H4z"></path>
        <line x1="18" y1="9" x2="22" y2="13"></line>
        <line x1="22" y1="9" x2="18" y2="13"></line>
      </svg>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
  if (window.__APP_INIT) return;
  window.__APP_INIT = true;

  const introSequence = new IntroSequence();
  
  // Check URL parameters for configuration
  const urlParams = new URLSearchParams(window.location.search);
  const config = {
    enableUIOverlay: urlParams.get('enableUIOverlay') !== 'false', // Default true, set false via URL
    debug: urlParams.get('debug') === 'true', // Default false, set true via URL
    skipToPhase2: urlParams.get('skipToPhase2') === 'true', // Default false, set true via URL
    skipToPhase3: urlParams.get('skipToPhase3') === 'true', // Default false, set true via URL
    enableAudio: urlParams.get('enableAudio') === 'true' // Default false, set true via URL
  };
  
  if (config.debug) {
    console.log('[Main] Configuration loaded from URL:', config);
  }
  
  introSequence.init(config);

  // Expose to global scope for debugging
  window.__introSequence = introSequence;

  // Listen for showWebsiteMain event from Phase 3
  document.addEventListener('showWebsiteMain', () => {
    if (config.debug) {
      console.log('[Main] Received showWebsiteMain event');
    }

    const container = document.getElementById('website-main-container');
    if (!container) {
      console.error('[Main] website-main-container not found');
      return;
    }

    // Initialize WebsiteMain
    const websiteMain = new WebsiteMain(container);
    websiteMain.init();

    // Show container with fade in
    container.style.display = 'block';
    gsap.fromTo(container,
      { opacity: 0 },
      { opacity: 1, duration: 1.2, ease: 'power2.out' }
    );

    if (config.debug) {
      console.log('[Main] WebsiteMain initialized and shown');
    }
  });
});
