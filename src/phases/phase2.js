// Phase 2: Code Rain + Boot Sequence + Water Effects
// Lines 211-521 from original file

/**
 * Initialize Phase 2 - Code Rain and Boot Sequence
 * @param {Object} config - Configuration object
 * @param {GSAPTimeline} config.timeline - Main GSAP timeline
 * @param {HTMLCanvasElement} config.canvas - Canvas element for water effects
 * @param {HTMLElement} config.phase2Element - Phase 2 container element
 * @param {boolean} config.enableUIOverlay - Whether to enable UI overlay
 * @param {Function} config.uiOverlayCallback - UI overlay initialization callback
 * @param {boolean} config.debug - Debug mode
 */
export function initPhase2(config) {
  const { 
    timeline: tl, 
    canvas, 
    phase2Element, 
    enableUIOverlay = true, 
    uiOverlayCallback, 
    isAudioEnabled = () => true,
    onBackgroundMusicRequest,
    debug = false 
  } = config;

  if (debug) {
    console.log('[Phase2] Initializing code rain and boot sequence');
  }

  // Start Phase 2 immediately after Phase 1 blackout
  tl.to('.phase2', { opacity: 1, duration: 0.4 }, ">")
    .call(() => {
      const p2 = document.querySelector('.phase2');
      p2.classList.remove('pointer-events-none');
      // Change skip button to white for Phase 2
      const skipBtn = document.getElementById('skipBtn');
      if (skipBtn) skipBtn.classList.replace('text-black', 'text-white');
      const audioBtn = document.getElementById('audioToggleBtn');
      if (audioBtn) audioBtn.classList.add('text-white');
    })
    // Reality Recovery Interface appears immediately  
    .call(() => showRealityRecoveryInterface(), null, "+=0.1")
    // Rain will be triggered by UI overlay when integrity bar reaches 100%
    // CTA handled by UI overlay now

  // Beat 2: CodeLines typing effect
  tl.call(() => {
    const container = document.querySelector('.code-lines');
    if (!container) return; // Safety check

    container.innerHTML = '';

    const lines = [
      "boot> initializing renderer...",
      "boot> loading modules: gsap, lenis, three",
      "boot> linking assets… ok",
      "boot> ready."
    ];

    // Build structure
    lines.forEach((text) => {
      const line = document.createElement("div");
      line.className = "line opacity-100";
      const content = document.createElement("span");
      content.className = "content";
      content.textContent = text;
      content.style.display = "inline-block";
      content.style.whiteSpace = "nowrap";
      content.style.overflow = "hidden";
      content.style.width = "0";
      line.appendChild(content);

      const cursor = document.createElement("span");
      cursor.className = "cursor";
      cursor.textContent = " ";
      cursor.style.display = "inline-block";
      cursor.style.width = "1ch";
      cursor.style.borderRight = "1px solid currentColor";
      cursor.style.animation = "blink 1s step-end infinite";
      line.appendChild(cursor);

      container.appendChild(line);
    });

    // Add CSS for blinking cursor
    const style = document.createElement('style');
    style.textContent = '@keyframes blink { 50% { border-color: transparent; } }';
    document.head.appendChild(style);

    // Typing animation
    const linesEls = container.querySelectorAll('.line');
    const codeTl = gsap.timeline({ defaults: { ease: "none" } });

    linesEls.forEach((lineEl, i) => {
      const content = lineEl.querySelector('.content');
      const len = content.textContent.length;

      codeTl.to(content, {
        width: `${len}ch`,
        duration: Math.max(0.4, Math.min(len * 0.04, 1.2)),
        ease: `steps(${Math.max(len, 1)})`,
      });

      if (i < linesEls.length - 1) codeTl.to({}, { duration: 0.12 });
    });

    tl.add(codeTl, "code");
  }, null, ">");

  // Beat 3-6: stubs
  tl.call(() => { }, null, "+=0.5");

  // Initialize water effect and code flood
  let floodTimer = null;

  // Reality Recovery Interface
  function showRealityRecoveryInterface() {
    if (enableUIOverlay && uiOverlayCallback) {
      uiOverlayCallback('reality-recovery');
    }
  }

  function showCTAButton() {
    // CTA button removed - now handled by UI overlay
  }

  function typeInText(element, text) {
    element.textContent = '';
    const chars = text.split('');
    chars.forEach((char, i) => {
      setTimeout(() => {
        element.textContent += char;
      }, i * 50);
    });
  }

  // Code flood functionality
  const CODE_BANK = [
    'init ▶ loading kernel modules...',
    'sys ▶ mount /dev/root (rw)',
    'auth ▶ handshake ok (tls13)',
    'gpu ▶ context: WebGL2, GSAP 3.12',
    'net ▶ GET /assets?cache=miss 200',
    'fs  ▶ read ./config.json',
    'ui  ▶ compose layout grid=12',
    'log ▶ event id=' + Math.random().toString(36).slice(2, 8),
    'dbg ▶ trace(404_takeover) ...',
    'ok  ▶ ready.'
  ];

  function spawnCodeLine() {
    const host = document.querySelector('.code-flood');
    if (!host) return;
    const line = document.createElement('div');
    line.className = 'flood-line';
    // random positions and styling
    const top = Math.floor(6 + Math.random() * 88);
    const left = Math.floor(2 + Math.random() * 86);
    const sz = Math.floor(12 + Math.random() * 12);
    const op = 0.45 + Math.random() * 0.5;
    line.style.top = top + 'vh';
    line.style.left = left + 'vw';
    line.style.fontSize = sz + 'px';
    line.style.opacity = op.toFixed(2);
    const blurTrail = Math.random() < 0.35;
    line.style.filter = blurTrail
      ? 'drop-shadow(0 0 2px rgba(255,255,255,0.35)) blur(1px)'
      : 'drop-shadow(0 0 2px rgba(255,255,255,0.35))';
    const txt = CODE_BANK[Math.floor(Math.random() * CODE_BANK.length)];
    line.textContent = txt;
    line.style.width = '0ch';
    host.appendChild(line);
    const len = txt.length;
    const dur = Math.max(0.9, Math.min(len * 0.07, 2.4));
    gsap.to(line, { width: len + 'ch', duration: dur, ease: 'none' });
    gsap.to(line, { opacity: 0, duration: 1.0, delay: dur + 1.8, onComplete: () => line.remove() });
  }

  function startCodeFlood() {
    if (debug) {
      console.log('[Phase2] startCodeFlood');
    }
    
    if (floodTimer) { clearInterval(floodTimer); floodTimer = null; }
    document.querySelectorAll('.flood-line').forEach(n => n.remove());
    const layer = document.querySelector('.code-flood');
    if (layer) { layer.style.opacity = 0; gsap.to(layer, { opacity: 1, duration: 1.5, ease: 'power2.out' }); }
    for (let i = 0; i < 6; i++) spawnCodeLine();
    for (let i = 0; i < 18; i++) setTimeout(spawnCodeLine, 200 + i * 90);
    floodTimer = setInterval(spawnCodeLine, 110);
    // CTA button animation removed - handled by UI overlay
    gsap.delayedCall(0.5, startWaterEffect); // activate water effect shortly after flood is visible
  }

  // Expose startCodeFlood globally for UI overlay
  window.startCodeFlood = startCodeFlood;

  // Water-like cursor ripples using Canvas
  function startWaterEffect() {
    if (window.__WATER_STARTED) return;
    window.__WATER_STARTED = true;

    // Start background music when water effects begin (later in Phase 2)
    const bgMusic = document.getElementById('bgMusic');
    if (typeof onBackgroundMusicRequest === 'function') {
      onBackgroundMusicRequest();
    } else if (bgMusic && bgMusic.paused && isAudioEnabled()) {
      bgMusic.play().catch(e => console.log('Music autoplay prevented:', e));
    }

    if (!canvas) {
      console.warn('[Phase2] Canvas not available for water effects');
      return;
    }

    // Target the Phase 2 layer and the full-screen canvas
    const layer = document.querySelector('.phase2');
    const ctx = canvas.getContext('2d');

    // Settings (increased water effect intensity)
    const rippleSettings = {
      maxSize: 220,  // Increased from 160
      animationSpeed: 1.5,  // Increased from 1
      strokeColor: [184, 184, 184] // grey color like original
    };
    const canvasSettings = { blur: 5, ratio: 1 };

    // Helpers / Classes
    function Coords(x, y) { this.x = x || null; this.y = y || null; }
    function Ripple(x, y, circleSize, ctx) {
      this.position = new Coords(x, y);
      this.circleSize = circleSize;
      this.maxSize = rippleSettings.maxSize;
      this.opacity = 0.9;  // Increased from 0.7
      this.ctx = ctx;
      this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])}, ${Math.floor(rippleSettings.strokeColor[1])}, ${Math.floor(rippleSettings.strokeColor[2])}, ${this.opacity})`;
      this.animationSpeed = rippleSettings.animationSpeed;
      this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
    }
    Ripple.prototype.update = function () {
      this.circleSize = this.circleSize + this.animationSpeed;
      this.opacity = this.opacity - this.opacityStep;
      this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])}, ${Math.floor(rippleSettings.strokeColor[1])}, ${Math.floor(rippleSettings.strokeColor[2])}, ${this.opacity})`;
    };
    Ripple.prototype.draw = function () {
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.lineWidth = 1;
      this.ctx.arc(this.position.x, this.position.y, this.circleSize, 0, 2 * Math.PI);
      this.ctx.stroke();
    };

    // State
    const ripples = [];
    let animationFrame = null;

    // Size/resize canvas to viewport
    function sizeCanvas() {
      const width = document.body.clientWidth;
      const height = document.body.clientHeight;
      canvas.width = width * canvasSettings.ratio;
      canvas.height = height * canvasSettings.ratio;
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      canvas.style.filter = `blur(${canvasSettings.blur}px)`;
    }
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    // Throttled mouse handler: create a small ripple at cursor
    let lastTS = 0;
    const throttleMs = 15; // Much more frequent rings (decreased from 30)
    function onMove(e) {
      const now = performance.now();
      if (now - lastTS < throttleMs) return;
      lastTS = now;
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * canvasSettings.ratio;
      const y = (e.clientY - rect.top) * canvasSettings.ratio;
      ripples.unshift(new Ripple(x, y, 2, ctx));
      if (debug) {
        console.log('Ripple created at:', x, y, 'Total ripples:', ripples.length);
      }
    }
    window.addEventListener('mousemove', onMove);

    // Animation loop
    function animate() {
      animationFrame = window.requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.update();
        r.draw();
        if (r.opacity <= 0) { ripples.splice(i, 1); }
      }
    }
    animate();

    // Cleanup handle so CTA can stop the effect cleanly
    layer.__stopWake = () => {
      try { window.cancelAnimationFrame(animationFrame); } catch (_) { }
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', sizeCanvas);
      const idx = ripples.length; ripples.splice(0, idx);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      window.__WATER_STARTED = false;
    };
  }

  // Cleanup functions
  function stopWaterEffect() {
    const layer = document.querySelector('.phase2');
    if (layer && layer.__stopWake) layer.__stopWake();
  }

  function stopCodeFlood() {
    if (floodTimer) { clearInterval(floodTimer); floodTimer = null; }
    document.querySelectorAll('.flood-line').forEach(n => n.remove());
  }

  // Store cleanup functions for external access
  phase2Element.__cleanup = {
    stopWaterEffect,
    stopCodeFlood
  };

  if (debug) {
    console.log('[Phase2] Code rain and boot sequence initialized');
  }
}

/**
 * Stop all Phase 2 effects (water and code flood)
 * @param {HTMLElement} phase2Element - Phase 2 container element
 */
export function stopPhase2Effects(phase2Element) {
  if (phase2Element && phase2Element.__cleanup) {
    phase2Element.__cleanup.stopWaterEffect();
    phase2Element.__cleanup.stopCodeFlood();
  }
}
