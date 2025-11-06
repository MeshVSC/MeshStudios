// MediaWindowManager - Handles cascading media-rich windows
// Supports images, videos, and GSAP animations in MeshStudios-style panels

export class MediaWindowManager {
  constructor() {
    this.windowPool = [];
    this.activeWindows = [];
    this.availableWindows = [];
    this.animationQueue = [];
    this.isAnimating = false;
    this.gridSquares = Array(16).fill(0); // Track fill count for each of 16 squares
    this.lastQuadrant = -1; // Track last quadrant used
    this.currentSense = 'see';
    this.currentIntensity = 1;
    this.assetIndices = {
      see: 0,
      hear: 0,
      touch: 0,
      build: 0
    };
    this.assetAnimatedIndices = {
      see: 0,
      hear: 0,
      touch: 0,
      build: 0
    };
    this.assetQueues = {
      see: [],
      hear: [],
      touch: [],
      build: []
    };
    this.assetAnimatedQueues = {
      see: [],
      hear: [],
      touch: [],
      build: []
    };

    // Configuration
    this.WINDOWS_PER_SECOND = 16; // Much faster
    this.DELAY_BETWEEN_WINDOWS = 1000 / this.WINDOWS_PER_SECOND; // ~62ms
    this.POOL_SIZE = 50; // Pre-create 50 windows for reuse

    // Media content definitions
    this.contentTypes = this.defineContentTypes();
    this.mediaAssets = this.defineMediaAssets();

    // Initialize the system
    this.init();

    this.currentSequenceTotal = 0;
    this.spawnedWindowCount = 0;
  }

  defineContentTypes() {
    return {
      IMAGE_VIEWER: {
        template: 'image-panel',
        mediaType: 'asset',
        titlePrefix: 'SENSORY FEED',
        icons: ['RETINA', 'NEURAL', 'PERCEPTION', 'VISION']
      }
    };
  }

  defineMediaAssets() {
    return {
      see: [
        "media/1See_final/19175f81ee147f6391ef7c1efc232b72.gif",
        "media/1See_final/21098ffd686d9cd07f5335d31c8dd790.jpg",
        "media/1See_final/2864c1226406369d9143dda03550bee7.gif",
        "media/1See_final/2dfa3b8427e2633705816ca6fb9c581a.gif",
        "media/1See_final/4edd12f6dccb1459940c392f15273e8d.gif",
        "media/1See_final/4ff4d830-fa61-4a87-b8b2-3286ad494aa2.jpeg",
        "media/1See_final/6006d5ef-a6e2-4c72-93b5-3dd50230d24c.jpeg",
        "media/1See_final/734807779ad6cc5b0620359f950d2ff1.gif",
        "media/1See_final/74a5644582827869bd71eaac05331d65.gif",
        "media/1See_final/7cb1b6209755fdae0ff785db700ecf41.gif",
        "media/1See_final/Artist ~ Justin Estcourt.jpeg",
        "media/1See_final/Just a Heads-Up_ This Isn't Just a Picture_ It's an Invitation.jpeg",
        "media/1See_final/Screen Recording 2025-09-21 at 17.29.01.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.30.30.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.33.38.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.34.29.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.39.26.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.45.02.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.45.36.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.46.14.gif",
        "media/1See_final/Screen Recording 2025-09-21 at 17.48.46.gif",
        "media/1See_final/Wondersun JR.jpeg",
        "media/1See_final/a40e5e0df15cb75344cf11d1fd55fe12.gif",
        "media/1See_final/d04ba8dc44efb7d7c57b141737348995.gif",
        "media/1See_final/d748caa0ffc9c604a10beedc75d4775f.gif",
        "media/1See_final/d7aabac9-8625-4071-a3a7-0a7c27dff74e.jpeg",
        "media/1See_final/de277dcd-0844-4322-9510-1b2da3d0a826.jpeg",
        "media/1See_final/e25656f8e4ef08ce28fecf6bb4a8112d.gif",
        "media/1See_final/eb23cbe770fb90cc03171a56de61e17b.gif",
        "media/1See_final/eye-space.gif",
        "media/1See_final/eyes-the-eyes-are-the-windows-into-the-soul.gif",
        "media/1See_final/images.jpg",
        "media/1See_final/insainment-mind-space-apocalypse.gif",
        "media/1See_final/tumblr_d37c5e46d2a1474ea8bc1dae49f39361_aea88b85_400.gif",
        "media/1See_final/window-02.jpeg",
        "media/1See_final/window-04.jpeg"
      ],
      hear: [
        "media/2Hear_final/0vSvnk.gif",
        "media/2Hear_final/17772.gif",
        "media/2Hear_final/200.gif",
        "media/2Hear_final/200.webp",
        "media/2Hear_final/213115.gif",
        "media/2Hear_final/215345.gif",
        "media/2Hear_final/30780.gif",
        "media/2Hear_final/45512.gif",
        "media/2Hear_final/45519.gif",
        "media/2Hear_final/65c333d9b3b3d62882cbc2f766916bbe.gif",
        "media/2Hear_final/698bbd8595d3ab2ea6fb1c7b77150584.gif",
        "media/2Hear_final/9157f6e5668103e3b2470a7fe3b2526d.gif",
        "media/2Hear_final/92eb9032da5f9b149b41e53a13a299a8.gif",
        "media/2Hear_final/Credits To Someone.jpeg",
        "media/2Hear_final/Fire-Drumming-Gif.webp",
        "media/2Hear_final/Music GIF - Music - Discover & Share GIFs.gif",
        "media/2Hear_final/SDp6Fb.gif",
        "media/2Hear_final/Screen Recording 2025-09-21 at 17.27.44.gif",
        "media/2Hear_final/Screen Recording 2025-09-21 at 17.41.35.gif",
        "media/2Hear_final/Screen Recording 2025-09-21 at 17.46.37.gif",
        "media/2Hear_final/Screen Recording 2025-09-21 at 18.07.18.gif",
        "media/2Hear_final/Screen Recording 2025-09-21 at 18.08.03.gif",
        "media/2Hear_final/Screen Recording 2025-09-21 at 18.08.57.gif",
        "media/2Hear_final/c9a494d265ea31d862b2022a7d96df70.gif",
        "media/2Hear_final/c9e68caf29af198cc9329adfa65f5981.gif",
        "media/2Hear_final/f8d9e7513a597e76c676ddbd5e1d64ce.gif",
        "media/2Hear_final/giphy-1.gif",
        "media/2Hear_final/giphy-2.gif",
        "media/2Hear_final/giphy-3.gif",
        "media/2Hear_final/giphy-4.gif",
        "media/2Hear_final/giphy.gif",
        "media/2Hear_final/giphy.webp",
        "media/2Hear_final/lzzy-halestorm-headbanging.gif",
        "media/2Hear_final/original-e754c29a0d5e1e3fdf674445f9cf4b68.gif",
        "media/2Hear_final/powerful-no-way.gif",
        "media/2Hear_final/qZgepk.gif",
        "media/2Hear_final/source.gif",
        "media/2Hear_final/tumblr_lw3lvnPMUF1qdxwewo1_500.gif"
      ],
      touch: [
        "media/3Touch_final/2b2ce21c-98fd-4f5d-b587-f029d5e1d992.jpeg",
        "media/3Touch_final/4fba4fc4-6cad-4a0e-81bc-9b634eb1a8b1.jpeg",
        "media/3Touch_final/57321067-f99c-419e-8d40-aefaec1b5262.jpeg",
        "media/3Touch_final/989a8cdd-d3f8-4ae3-a473-a28740c4b41b.jpeg",
        "media/3Touch_final/Capturing the beauty of connection and reflection.jpeg",
        "media/3Touch_final/In cyber dawn, shadows weave, World and nature’s….jpeg",
        "media/3Touch_final/Screen Recording 2025-09-21 at 17.21.29.gif",
        "media/3Touch_final/Screen Recording 2025-09-21 at 17.34.11.gif",
        "media/3Touch_final/Screen Recording 2025-09-21 at 17.40.52.gif",
        "media/3Touch_final/The Touch.jpeg",
        "media/3Touch_final/ce773517-e273-42fa-b765-cd4dfa097e4f.jpeg",
        "media/3Touch_final/cfb4d268-9505-4d46-bddb-1fbcd7772d43.jpeg",
        "media/3Touch_final/ef159ee7-c4d4-49ae-b280-be19aeea4514.jpeg",
        "media/3Touch_final/f67f4cc2-3395-4853-be17-9e8693098fa1.jpeg",
        "media/3Touch_final/physic colored.jpeg",
        "media/3Touch_final/✱.jpeg"
      ],
      bigWindow: {
        see: "media/1See_final/Big_Image_see.gif",
        hear: "media/2Hear_final/Big_Image_Hear.gif",
        touch: "media/3Touch_final/Screen Recording 2025-09-21 at 17.34.11.gif"
      }
    };
  }

  init() {
    this.createWindowPool();
    this.setupMediaPreloading();

    if (!this.mediaAssets.build) {
      this.mediaAssets.build = [
        ...this.mediaAssets.see,
        ...this.mediaAssets.hear,
        ...this.mediaAssets.touch
      ];
    }
    if (!this.mediaAssets.bigWindow.hear) {
      this.mediaAssets.bigWindow.hear = this.mediaAssets.bigWindow.see;
    }
    if (!this.mediaAssets.bigWindow.touch) {
      this.mediaAssets.bigWindow.touch = this.mediaAssets.bigWindow.see;
    }
    if (!this.mediaAssets.bigWindow.build) {
      this.mediaAssets.bigWindow.build = this.mediaAssets.bigWindow.see;
    }
  }

  createWindowPool() {
    const container = document.createElement('div');
    container.id = 'window-pool-container';
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 5000;
    `;
    document.body.appendChild(container);

    // Draw the 16-square grid for debugging
    this.drawDebugGrid();

    for (let i = 0; i < this.POOL_SIZE; i++) {
      const window = this.createWindow(i);
      window.style.display = 'none';
      container.appendChild(window);
      this.availableWindows.push(window);
    }
  }

  createWindow(index) {
    const window = document.createElement('div');
    window.className = 'media-window';
    window.dataset.index = index;

    // Random window size - 20% smaller
    const baseWidth = 160; // 200 * 0.8
    const baseHeight = 120; // 150 * 0.8
    const widthVariation = Math.random() * 160 + baseWidth; // 160-320px (was 200-400px)
    const heightVariation = Math.random() * 120 + baseHeight; // 120-240px (was 150-300px)

    window.style.cssText = `
      position: absolute;
      background: #000;
      color: #fff;
      border: 2px solid #fff;
      box-shadow: inset 0 0 0 1px #555;
      opacity: 0;
      transform: translateY(0px) scale(1);
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 12px;
      width: ${widthVariation}px;
      height: ${heightVariation}px;
      z-index: ${1000 + index};
    `;

    // Create window structure
    window.innerHTML = `
      <div class="window-header" style="
        height: 22px;
        background: #fff;
        color: #000;
        border-bottom: 2px solid #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 8px;
        font-weight: 700;
        text-transform: uppercase;
        font-size: 10px;
      ">
        <span class="window-title">LOADING...</span>
        <span class="window-id">[ID:0000]</span>
      </div>
      <div class="window-content" style="
        position: relative;
        height: calc(100% - 22px);
        overflow: hidden;
      ">
        <div class="media-container" style="
          position: absolute;
          top: 6px;
          left: 6px;
          right: 6px;
          bottom: 30px;
          border: 1px solid #666;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #111;
        ">
          <div class="media-content"></div>
        </div>
        <div class="status-info" style="
          position: absolute;
          bottom: 6px;
          left: 6px;
          right: 6px;
          height: 20px;
          border-top: 1px solid #333;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 9px;
          color: #aaa;
        ">
          <span class="status-text">READY</span>
          <span class="timestamp"></span>
        </div>
      </div>
    `;

    return window;
  }

  setupMediaPreloading() {
    // Pre-load some images for faster display
    const bigWindowAssets = Object.values(this.mediaAssets.bigWindow || {});
    const sources = [
      ...(this.mediaAssets.see || []),
      ...(this.mediaAssets.hear || []),
      ...(this.mediaAssets.touch || []),
      ...bigWindowAssets
    ];

    sources.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }

  getRandomPosition() {
    // Get screen dimensions
    const screenWidth = globalThis.innerWidth;
    const screenHeight = globalThis.innerHeight;

    // Account for maximum window size to prevent overflow
    const maxWindowWidth = 400;
    const maxWindowHeight = 300;
    const margin = 50;

    // Create true square boundary using screen height, make it 20% smaller
    const squareSize = (screenHeight - (2 * margin)) * 0.8;

    // Position square in center of screen
    const squareStartX = (screenWidth - squareSize) / 2;
    const squareStartY = (screenHeight - squareSize) / 2;

    // Use the SAME calculation as the debug grid
    const cellSize = squareSize / 4;

    // Find minimum fill count
    const minFillCount = Math.min(...this.gridSquares);

    // Get valid squares (minimum fill count + not same quadrant as last)
    const validSquares = [];
    for (let i = 0; i < 16; i++) {
      if (this.gridSquares[i] === minFillCount) {
        const quadrant = this.getQuadrant(i);
        if (quadrant !== this.lastQuadrant) {
          validSquares.push(i);
        }
      }
    }

    // If no valid squares (all same quadrant), use any with min fill count
    if (validSquares.length === 0) {
      for (let i = 0; i < 16; i++) {
        if (this.gridSquares[i] === minFillCount) {
          validSquares.push(i);
        }
      }
    }

    // Choose random valid square
    const chosenSquare = validSquares[Math.floor(Math.random() * validSquares.length)];

    // Update tracking
    this.gridSquares[chosenSquare]++;
    this.lastQuadrant = this.getQuadrant(chosenSquare);

    // Calculate position within the chosen grid cell
    const row = Math.floor(chosenSquare / 4);
    const col = chosenSquare % 4;

    // Calculate center of the cell
    const cellCenterX = squareStartX + col * cellSize + cellSize / 2;
    const cellCenterY = squareStartY + row * cellSize + cellSize / 2;

    // Position window center at cell center (will be adjusted in showSingleWindow)
    const randomX = cellCenterX;
    const randomY = cellCenterY;

    const isBorder = row === 0 || row === 3 || col === 0 || col === 3;

    return {
      x: randomX,
      y: randomY,
      squareIndex: chosenSquare,
      isBorder
    };
  }

  drawDebugGrid() {
    // Draw BIG 16 squares covering most of the screen
    const screenWidth = globalThis.innerWidth;
    const screenHeight = globalThis.innerHeight;
    const margin = 50;

    // Use screen height for square size (big square), make it 20% smaller
    const squareSize = (screenHeight - (2 * margin)) * 0.8;
    const squareStartX = (screenWidth - squareSize) / 2;
    const squareStartY = (screenHeight - squareSize) / 2;

    // Divide the big square into 16 equal cells
    const cellSize = squareSize / 4;

    // Create debug grid overlay
    const gridOverlay = document.createElement('div');
    gridOverlay.id = 'debug-grid';
    gridOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 2000;
    `;

    // Grid boundary is now invisible

    // Grid is now invisible
    document.body.appendChild(gridOverlay);
  }

  getQuadrant(squareIndex) {
    // 4x4 grid quadrants:
    // Q1: 0,1,4,5   Q2: 2,3,6,7
    // Q3: 8,9,12,13 Q4: 10,11,14,15
    const row = Math.floor(squareIndex / 4);
    const col = squareIndex % 4;

    if (row < 2 && col < 2) return 1; // Top-left
    if (row < 2 && col >= 2) return 2; // Top-right
    if (row >= 2 && col < 2) return 3; // Bottom-left
    return 4; // Bottom-right
  }

  getRandomContentType() {
    const types = Object.keys(this.contentTypes);
    return types[Math.floor(Math.random() * types.length)];
  }

  setCycleContext({ sense = 'see', intensity = 1 } = {}) {
    this.currentSense = sense;
    this.currentIntensity = intensity;
    if (typeof this.assetIndices[sense] !== 'number') {
      this.assetIndices[sense] = 0;
    }
    if (typeof this.assetAnimatedIndices[sense] !== 'number') {
      this.assetAnimatedIndices[sense] = 0;
    }
    if (!Array.isArray(this.assetQueues[sense])) {
      this.assetQueues[sense] = [];
    }
    if (!Array.isArray(this.assetAnimatedQueues[sense])) {
      this.assetAnimatedQueues[sense] = [];
    }
  }

  getActiveSense() {
    return this.currentSense || 'see';
  }

  getAssetsForSense() {
    const sense = this.getActiveSense();
    const assets = this.mediaAssets[sense];
    if (Array.isArray(assets) && assets.length > 0) {
      return assets;
    }
    return this.mediaAssets.see;
  }

  isAnimatedAsset(src) {
    const lower = src.toLowerCase();
    return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov') || lower.endsWith('.gif');
  }

  ensureQueueFilled(queueRef, assets) {
    if (!Array.isArray(assets) || assets.length === 0) {
      return [];
    }
    if (!Array.isArray(queueRef) || queueRef.length === 0) {
      const shuffled = [...assets];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    return queueRef;
  }

  getNextFromQueue(sense, preferAnimated = false) {
    const assets = this.getAssetsForSense();
    if (!assets || assets.length === 0) return null;

    if (preferAnimated) {
      const animatedAssets = assets.filter(src => this.isAnimatedAsset(src));
      if (animatedAssets.length) {
        this.assetAnimatedQueues[sense] = this.ensureQueueFilled(this.assetAnimatedQueues[sense], animatedAssets);
        const nextAnimated = this.assetAnimatedQueues[sense].shift();
        if (this.assetAnimatedQueues[sense].length === 0) {
          this.assetAnimatedQueues[sense] = this.ensureQueueFilled([], animatedAssets);
        }
        if (nextAnimated) {
          return this.getAssetInfoFromSrc(nextAnimated);
        }
      }
    }

    this.assetQueues[sense] = this.ensureQueueFilled(this.assetQueues[sense], assets);
    const next = this.assetQueues[sense].shift();
    if (this.assetQueues[sense].length === 0) {
      this.assetQueues[sense] = this.ensureQueueFilled([], assets);
    }
    return next ? this.getAssetInfoFromSrc(next) : null;
  }

  getAssetInfoFromSrc(src) {
    const lower = src.toLowerCase();
    if (lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.mov')) {
      return { src, type: 'video' };
    }
    return { src, type: 'image' };
  }

  getNextAsset(preferAnimated = false) {
    const sense = this.getActiveSense();
    return this.getNextFromQueue(sense, preferAnimated);
  }

  getBigWindowAsset() {
    const sense = this.getActiveSense();
    const big = this.mediaAssets.bigWindow?.[sense];
    if (big) return big;
    return this.mediaAssets.bigWindow.see;
  }

  getBigWindowAssetInfo() {
    const src = this.getBigWindowAsset();
    if (!src) return null;
    return this.getAssetInfoFromSrc(src);
  }

  setupWindowContent(window, contentType, mediaIndex = 0, isLastWindow = false, options = {}) {
    const { preferAnimated = false } = options;
    const config = this.contentTypes[contentType];

    // Safety check - if config is undefined, use default
    if (!config) {
      console.warn(`Unknown contentType: ${contentType}, using IMAGE_VIEWER as fallback`);
      return this.setupWindowContent(window, 'IMAGE_VIEWER', mediaIndex, isLastWindow);
    }
    const header = window.querySelector('.window-header');
    const mediaContainer = window.querySelector('.media-content');
    const statusText = window.querySelector('.status-text');
    const timestamp = window.querySelector('.timestamp');

    // Set title and ID
    const titleEl = header.querySelector('.window-title');
    const idEl = header.querySelector('.window-id');

    if (isLastWindow) {
      // Special content for the big final window
      titleEl.textContent = 'SENSORY INTEGRATION GRID';
      idEl.textContent = '[CORE:0001]';
    } else {
      // Defensive fallback for icons
      const icons = Array.isArray(config.icons) ? config.icons : ["DEFAULT"];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      const randomId = Math.floor(1000 + Math.random() * 9000);

      titleEl.textContent = `${config.titlePrefix} ${randomIcon}`;
      idEl.textContent = `[ID:${randomId}]`;
    }

    // Set timestamp
    const now = new Date();
    timestamp.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    // Clear previous content
    mediaContainer.innerHTML = '';

    const assetInfo = isLastWindow ? this.getBigWindowAssetInfo() : this.getNextAsset(preferAnimated);
    this.renderAssetIntoContainer({
      container: mediaContainer,
      statusText,
      assetInfo,
      isLastWindow,
      attempts: 0,
      preferAnimated
    });
  }

  startAnimation(canvas, animationType) {
    const ctx = canvas.getContext('2d');
    let animationId;

    switch (animationType) {
      case 'neural-network':
        this.animateNeuralNetwork(ctx, canvas);
        break;
      case 'particle-system':
        this.animateParticleEye(ctx, canvas);
        break;
      case 'data-stream':
        this.animateDataStream(ctx, canvas);
        break;
      case 'visual-cortex':
        this.animateVisualCortex(ctx, canvas);
        break;
      default:
        // Fallback to simple loading bar
        this.animateLoadingBar(ctx, canvas);
        break;
    }
  }

  renderAssetIntoContainer({ container, statusText, assetInfo, isLastWindow, attempts, preferAnimated }) {
    const MAX_ATTEMPTS = 10;

    const fallback = () => {
      if (attempts >= MAX_ATTEMPTS || isLastWindow) {
        statusText.textContent = isLastWindow ? 'INTEGRATION OFFLINE' : 'SIGNAL CORRUPTED';
        return;
      }
      const nextAsset = isLastWindow ? this.getBigWindowAssetInfo() : this.getNextAsset(preferAnimated);
      this.renderAssetIntoContainer({
        container,
        statusText,
        assetInfo: nextAsset,
        isLastWindow,
        attempts: attempts + 1,
        preferAnimated
      });
    };

    if (!assetInfo || !assetInfo.src) {
      fallback();
      return;
    }

    container.innerHTML = '';

    if (assetInfo.type === 'video') {
      const video = document.createElement('video');
      video.src = assetInfo.src;
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: cover;
        opacity: 0;
        transition: opacity 0.4s ease;
      `;

      const reveal = () => {
        video.style.opacity = '1';
        video.play().catch(() => {});
      };

      video.addEventListener('loadeddata', reveal, { once: true });
      video.addEventListener('error', () => {
        video.remove();
        fallback();
      }, { once: true });

      container.appendChild(video);
      statusText.textContent = isLastWindow ? 'INTEGRATION STREAM' : 'STREAM ACTIVE';
      return;
    }

    const img = document.createElement('img');
    img.src = assetInfo.src;
    img.loading = 'lazy';
    img.style.cssText = `
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.4s ease;
    `;

    img.onload = () => {
      img.style.opacity = '1';
    };

    img.onerror = () => {
      img.remove();
      fallback();
    };

    container.appendChild(img);
      const isAnimated = this.isAnimatedAsset(assetInfo.src);
      if (isAnimated) {
        statusText.textContent = isLastWindow ? 'INTEGRATION STREAM' : 'STREAM ACTIVE';
      } else {
        statusText.textContent = isLastWindow ? 'INTEGRATION ACTIVE' : 'SCAN COMPLETE';
      }
  }

  animateLoadingBar(ctx, canvas) {
    // Dreaming of Jupiter - Gas Giant Animation
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) / 3;
    let time = 0;
    
    // Generate atmospheric bands
    const bands = [];
    for (let i = 0; i < 12; i++) {
      bands.push({
        y: (i / 11 - 0.5) * radius * 2,
        speed: 0.5 + Math.random() * 2,
        intensity: 0.3 + Math.random() * 0.7,
        color: i % 3,
        turbulence: Math.random() * 0.5
      });
    }
    
    // Storm systems
    const storms = [];
    for (let i = 0; i < 5; i++) {
      storms.push({
        x: (Math.random() - 0.5) * radius * 1.5,
        y: (Math.random() - 0.5) * radius * 1.5,
        size: 10 + Math.random() * 30,
        rotation: 0,
        speed: 0.02 + Math.random() * 0.05,
        intensity: 0.5 + Math.random() * 0.5
      });
    }

    function noise(x, y, t) {
      // Simple noise approximation
      return Math.sin(x * 0.01 + t) * Math.cos(y * 0.01 + t * 0.7) * 0.5 + 0.5;
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.02;
      
      // Draw atmospheric bands
      for (let y = -radius; y < radius; y += 2) {
        const distance = Math.abs(y / radius);
        if (distance > 1) continue;
        
        const band = bands[Math.floor((y + radius) / (radius * 2) * bands.length)];
        if (!band) continue;
        
        for (let x = -radius; x < radius; x += 3) {
          const planetDistance = Math.sqrt(x * x + y * y) / radius;
          if (planetDistance > 1) continue;
          
          // Atmospheric turbulence
          const turbulence = noise(x + time * band.speed * 10, y, time) * band.turbulence;
          const flowX = x + turbulence * 20;
          
          // Band coloring
          let r, g, b;
          switch (band.color) {
            case 0: r = 255; g = 140 + turbulence * 50; b = 0; break;   // Orange
            case 1: r = 139; g = 69 + turbulence * 30; b = 19; break;    // Brown
            case 2: r = 255; g = 215 + turbulence * 40; b = 0; break;    // Gold
          }
          
          const alpha = (1 - planetDistance) * band.intensity * (0.3 + turbulence);
          
          ctx.shadowColor = `rgb(${r}, ${g}, ${b})`;
          ctx.shadowBlur = 5;
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          
          const pixelSize = 1 + planetDistance * 2;
          ctx.fillRect(centerX + flowX, centerY + y, pixelSize, pixelSize);
        }
      }
      
      // Draw storm systems (Great Red Spot style)
      storms.forEach(storm => {
        storm.rotation += storm.speed;
        
        const stormX = centerX + storm.x;
        const stormY = centerY + storm.y;
        
        // Swirling storm effect
        for (let a = 0; a < Math.PI * 2; a += 0.3) {
          const spiralRadius = storm.size * (1 + Math.sin(storm.rotation * 3 + a * 5) * 0.2);
          const sx = stormX + Math.cos(a + storm.rotation * 2) * spiralRadius;
          const sy = stormY + Math.sin(a + storm.rotation * 2) * spiralRadius;
          
          const alpha = storm.intensity * (1 - (spiralRadius / storm.size)) * 0.8;
          
          ctx.shadowColor = '#ff4444';
          ctx.shadowBlur = 10;
          ctx.fillStyle = `rgba(255, 68, 68, ${alpha})`;
          
          ctx.beginPath();
          ctx.arc(sx, sy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    }

    animate();
  }

  animateNeuralNetwork(ctx, canvas) {
    // Three.js style beating heart with particle system
    const particles = [];
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    let time = 0;
    
    // Generate heart shape particles using parametric equations
    for (let t = 0; t <= Math.PI * 2; t += 0.2) {
      const scale = Math.min(canvas.width, canvas.height) / 40;
      const x = 16 * Math.pow(Math.sin(t), 3) * scale;
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
      
      particles.push({
        baseX: x,
        baseY: y,
        x: x,
        y: y,
        life: Math.random(),
        pulse: Math.random() * Math.PI * 2
      });
    }
    
    // Add surrounding universe particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        baseX: (Math.random() - 0.5) * canvas.width,
        baseY: (Math.random() - 0.5) * canvas.height,
        x: 0,
        y: 0,
        life: Math.random(),
        pulse: Math.random() * Math.PI * 2,
        isUniverse: true
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.03;
      
      // Heart beating effect
      const heartBeat = 0.8 + Math.sin(time * 4) * 0.3;
      const universeExpand = 1 + Math.sin(time * 0.5) * 0.2;
      
      particles.forEach((particle, i) => {
        if (particle.isUniverse) {
          // Universe particles expanding and contracting
          particle.x = particle.baseX * universeExpand;
          particle.y = particle.baseY * universeExpand;
          particle.life += 0.01;
          
          if (particle.life > 1) particle.life = 0;
          
          const alpha = Math.sin(particle.life * Math.PI) * 0.5;
          const radius = Math.max(0.5, 1 + Math.sin(particle.pulse + time) * 2);
          
          ctx.shadowColor = '#ffffff';
          ctx.shadowBlur = 5;
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(centerX + particle.x, centerY + particle.y, radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Heart particles with beating effect
          particle.x = particle.baseX * heartBeat;
          particle.y = particle.baseY * heartBeat;
          particle.pulse += 0.05;
          
          const intensity = 0.7 + Math.sin(particle.pulse) * 0.3;
          const radius = Math.max(0.8, 2 + intensity * 3);
          
          // Heart glow effect
          ctx.shadowColor = i % 3 === 0 ? '#ff6b35' : '#ff0066';
          ctx.shadowBlur = 10 * intensity;
          ctx.fillStyle = i % 3 === 0 ? `rgba(255, 107, 53, ${intensity})` : `rgba(255, 0, 102, ${intensity})`;
          
          ctx.beginPath();
          ctx.arc(centerX + particle.x, centerY + particle.y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    }

    animate();
  }

  animateParticleEye(ctx, canvas) {
    // High-tech neural network animation
    const nodes = [];
    const connections = [];
    const layers = [3, 5, 3];
    
    // Create network topology
    const layerSpacing = canvas.width / (layers.length + 1);
    layers.forEach((layerSize, layerIndex) => {
      const nodeSpacing = canvas.height / (layerSize + 1);
      for (let nodeIndex = 0; nodeIndex < layerSize; nodeIndex++) {
        nodes.push({
          x: layerSpacing * (layerIndex + 1),
          y: nodeSpacing * (nodeIndex + 1),
          layer: layerIndex,
          activation: Math.random(),
          pulse: Math.random() * Math.PI * 2
        });
      }
    });
    
    // Create connections
    for (let i = 0; i < layers.length - 1; i++) {
      const currentLayer = nodes.filter(n => n.layer === i);
      const nextLayer = nodes.filter(n => n.layer === i + 1);
      currentLayer.forEach(from => {
        nextLayer.forEach(to => {
          connections.push({
            from: from,
            to: to,
            weight: Math.random(),
            activity: 0
          });
        });
      });
    }

    function animate() {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update activations
      nodes.forEach(node => {
        node.activation = Math.sin(Date.now() * 0.001 + node.pulse) * 0.5 + 0.5;
        node.pulse += 0.02;
      });
      
      // Draw connections with glow
      connections.forEach(conn => {
        const opacity = conn.from.activation * conn.weight * 0.8;
        if (opacity > 0.1) {
          ctx.shadowColor = '#00ffff';
          ctx.shadowBlur = 10;
          ctx.strokeStyle = `rgba(0, 255, 255, ${opacity})`;
          ctx.lineWidth = conn.weight * 2;
          ctx.beginPath();
          ctx.moveTo(conn.from.x, conn.from.y);
          ctx.lineTo(conn.to.x, conn.to.y);
          ctx.stroke();
        }
      });
      
      // Draw nodes with glow
      nodes.forEach(node => {
        const radius = 4 + node.activation * 4;
        ctx.shadowColor = node.activation > 0.7 ? '#ff6b35' : '#00ffff';
        ctx.shadowBlur = 15;
        ctx.fillStyle = `rgba(0, 255, 255, ${node.activation * 0.8 + 0.2})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fill();
        
        if (node.activation > 0.7) {
          ctx.fillStyle = '#ff6b35';
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      ctx.shadowBlur = 0;
      requestAnimationFrame(animate);
    }

    animate();
  }

  animateDataStream(ctx, canvas) {
    // No animation - removed green falling lines
  }


  animateVisualCortex(ctx, canvas) {
    // GSAP-style text animation effect (Pete Barr inspired)
    const text = "POLICE";
    const fontSize = Math.min(canvas.width, canvas.height) / 8;
    
    // Create text layout
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const letters = text.split('');
    const letterWidth = ctx.measureText('M').width;
    const totalWidth = letterWidth * letters.length;
    const startX = (canvas.width - totalWidth) / 2;
    
    // Animation parameters
    let time = 0;
    const cylinderRadius = 100;
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      time += 0.02;
      
      letters.forEach((letter, i) => {
        // Cylinder rotation effect
        const angle = time + i * 0.5;
        const rotY = Math.sin(angle) * 0.3;
        const scale = 1 + Math.cos(angle) * 0.2;
        const opacity = 0.6 + Math.sin(angle * 2) * 0.4;
        
        const x = startX + i * letterWidth + letterWidth / 2;
        const y = canvas.height / 2;
        
        ctx.save();
        ctx.translate(x, y);
        
        // Apply 3D-like transform
        ctx.transform(scale, 0, rotY, scale, 0, 0);
        
        // Glow effect
        ctx.shadowColor = '#00ffff';
        ctx.shadowBlur = 15 * opacity;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        
        ctx.fillText(letter, 0, 0);
        
        // Add accent color for active letters
        if (Math.sin(angle * 3) > 0.5) {
          ctx.fillStyle = '#ff6b35';
          ctx.shadowColor = '#ff6b35';
          ctx.shadowBlur = 20;
          ctx.fillText(letter, 0, 0);
        }
        
        ctx.restore();
      });
      
      requestAnimationFrame(animate);
    }
    
    animate();
  }

  setupBigWindowContent(container) {
    // Use SEE big window GIF
    const img = document.createElement('img');
    img.src = this.getBigWindowAsset();
    img.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.5s ease;
    `;

    img.onload = () => {
      img.style.opacity = '1';
    };

    container.appendChild(img);
  }

  setupSensoryIntegrationContent(container) {
    // Create a layout showing SEE, HEAR, TOUCH concepts
    const integrationDiv = document.createElement('div');
    integrationDiv.style.cssText = `
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #000;
      color: #fff;
      font-family: monospace;
      font-size: 24px;
      text-align: center;
      position: relative;
    `;

    // Main title
    const title = document.createElement('div');
    title.textContent = 'SENSORY INTEGRATION PROTOCOL';
    title.style.cssText = `
      margin-bottom: 40px;
      font-size: 18px;
      color: #aaa;
      letter-spacing: 3px;
    `;

    // Three senses grid
    const sensesGrid = document.createElement('div');
    sensesGrid.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 60px;
      width: 100%;
      max-width: 600px;
    `;

    // SEE section
    const seeSection = this.createSenseSection('SEE', '👁', '#fff');

    sensesGrid.appendChild(seeSection);

    integrationDiv.appendChild(title);
    integrationDiv.appendChild(sensesGrid);

    container.appendChild(integrationDiv);
  }

  createSenseSection(label, icon, color) {
    const section = document.createElement('div');
    section.style.cssText = `
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    `;

    const iconDiv = document.createElement('div');
    iconDiv.textContent = icon;
    iconDiv.style.cssText = `
      font-size: 48px;
      filter: grayscale(1);
      opacity: 0.8;
    `;

    const labelDiv = document.createElement('div');
    labelDiv.textContent = label;
    labelDiv.style.cssText = `
      font-size: 20px;
      color: ${color};
      letter-spacing: 2px;
      font-weight: bold;
    `;

    section.appendChild(iconDiv);
    section.appendChild(labelDiv);

    return section;
  }

  // Public methods for showing/hiding windows
  showWindowsSequentially(count = 15, callback = null, options = {}) {
    if (this.isAnimating) return;
    this.isAnimating = true;

    this.setCycleContext(options);

    // Reset grid for new sequence
    this.gridSquares = Array(16).fill(0);
    this.lastQuadrant = -1;
    this.currentSequenceTotal = Math.min(count, this.availableWindows.length);
    this.spawnedWindowCount = 0;

    const maxCount = Math.min(count, this.availableWindows.length);
    let cumulativeDelay = 0;

    for (let i = 0; i < maxCount; i++) {
      // Progressive acceleration with specific timing intervals
      let currentDelay;

      if (i < 5) {
        currentDelay = 400; // Windows 1-5: 400ms
      } else if (i < 7) {
        currentDelay = 300; // Windows 6-7: 300ms
      } else if (i < 10) {
        currentDelay = 150; // Windows 8-10: 150ms
      } else if (i < 25) {
        currentDelay = 80; // Windows 11-25: 80ms
      } else if (i < 30) {
        currentDelay = 62; // Windows 26-30: 62ms
      } else if (i < 35) {
        currentDelay = 40; // Windows 31-35: 40ms
      } else {
        currentDelay = 20; // Windows 36-40: 20ms
      }

      cumulativeDelay += currentDelay;

      setTimeout(() => {
        // Check if this is the last window
        const isLastWindow = i === count - 1;
        this.showSingleWindow(isLastWindow);

        // Mark animation as complete when last window appears
        if (isLastWindow) {
          setTimeout(() => {
            this.isAnimating = false;
            // Call callback when all windows are shown
            if (callback) callback();
          }, 100);
        }
      }, cumulativeDelay);
    }
  }

  showSingleWindow(isLastWindow = false) {
    if (this.availableWindows.length === 0) return;

    const window = this.availableWindows.pop();
    const contentType = this.getRandomContentType();
    const assets = this.getAssetsForSense();
    const mediaIndex = Math.floor(Math.random() * Math.max(assets.length, 1));
    const sequenceIndex = this.spawnedWindowCount || 0;
    this.spawnedWindowCount = sequenceIndex + 1;

    let preferAnimated = isLastWindow;
    let positionInfo = null;

    if (isLastWindow) {
      // Big window - 20% smaller
      const bigWidth = 448; // 560 * 0.8
      const bigHeight = 336; // 420 * 0.8

      // Center the big window on screen
      const centerX = (globalThis.innerWidth - bigWidth) / 2;
      const centerY = (globalThis.innerHeight - bigHeight) / 2;

      window.style.left = centerX + 'px';
      window.style.top = centerY + 'px';
      window.style.width = bigWidth + 'px';
      window.style.height = bigHeight + 'px';

      // Highest z-index
      window.style.zIndex = '2000';

    } else {
      // Regular window - reset to small random size - 20% smaller
      const baseWidth = 160; // 200 * 0.8
      const baseHeight = 120; // 150 * 0.8
      const widthVariation = Math.random() * 160 + baseWidth; // 160-320px (was 200-400px)
      const heightVariation = Math.random() * 120 + baseHeight; // 120-240px (was 150-300px)

      window.style.width = widthVariation + 'px';
      window.style.height = heightVariation + 'px';

      // Regular random positioning
      positionInfo = this.getRandomPosition();
      const position = positionInfo || { x: globalThis.innerWidth / 2, y: globalThis.innerHeight / 2, isBorder: false };
      // Adjust position so window center aligns with position
      const windowWidth = parseInt(window.style.width);
      const windowHeight = parseInt(window.style.height);
      window.style.left = (position.x - windowWidth / 2) + 'px';
      window.style.top = (position.y - windowHeight / 2) + 'px';

      // Increment z-index for each new window to appear on top
      const newZIndex = 1000 + this.activeWindows.length + 100;
      window.style.zIndex = newZIndex;

      if (!preferAnimated) {
        const isBorder = positionInfo ? positionInfo.isBorder : false;
        const nearingTop = this.currentSequenceTotal > 0 && sequenceIndex >= Math.max(0, this.currentSequenceTotal - 6);
        const highZ = this.activeWindows.length >= 20;
        preferAnimated = isBorder || nearingTop || highZ;
      }
    }

    window.style.display = 'block';

    // Set up content
    this.setupWindowContent(window, contentType, mediaIndex, isLastWindow, { preferAnimated });

    // Show immediately
    window.style.opacity = '1';

    this.activeWindows.push(window);
  }

  hideWindowsSequentially() {
    this.activeWindows.forEach((window, index) => {
      setTimeout(() => {
        this.hideSingleWindow(window);
      }, index * this.DELAY_BETWEEN_WINDOWS);
    });
  }

  hideSingleWindow(window) {
    window.style.opacity = '0';

    setTimeout(() => {
      window.style.display = 'none';
      this.cleanupWindowMedia(window);

      // Return to pool
      const index = this.activeWindows.indexOf(window);
      if (index > -1) {
        this.activeWindows.splice(index, 1);
        this.availableWindows.push(window);
      }
    }, 200);
  }

  cleanupWindowMedia(window) {
    const mediaContent = window.querySelector('.media-content');

    // Stop videos
    const videos = mediaContent.querySelectorAll('video');
    videos.forEach(video => {
      video.pause();
      video.src = '';
    });

    // Clear canvas animations (they should stop automatically when the canvas is removed)
    const canvases = mediaContent.querySelectorAll('canvas');
    canvases.forEach(canvas => {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Clear content
    mediaContent.innerHTML = '';
  }

  hideAllWindows() {
    this.hideWindowsSequentially();
  }

  hideAllWindowsInstantly() {
    // Hide all windows immediately like unplugging
    this.activeWindows.forEach(window => {
      window.style.display = 'none';
      this.cleanupWindowMedia(window);
      this.availableWindows.push(window);
    });
    this.activeWindows = [];

    // Also hide the entire window container
    const container = document.getElementById('window-pool-container');
    if (container) {
      container.style.display = 'none';
    }
  }

  resetForNewCycle() {
    // Make sure container is visible for new cycle
    const container = document.getElementById('window-pool-container');
    if (container) {
      container.style.display = 'block';
    }

    // Reset animation state
    this.isAnimating = false;

    // Reset grid
    this.gridSquares = Array(16).fill(0);
    this.lastQuadrant = -1;
  }

  destroy() {
    this.hideAllWindows();
    setTimeout(() => {
      const container = document.getElementById('window-pool-container');
      if (container) {
        container.remove();
      }
      this.windowPool = [];
      this.activeWindows = [];
      this.availableWindows = [];
    }, 1000);
  }
}
