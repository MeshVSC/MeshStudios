// UI Overlay System for Phase 2 - Optional Module
// Lines 968-1124 from original file
// Can be completely disabled without breaking phases

// GSAP is available globally via CDN
import { glitchBurst } from '../utils/glitch.js';

/**
 * Initialize UI Overlay System
 * @param {number} percentage - Current loading percentage
 */
export function initUIOverlay(panelType) {
  console.log('initUIOverlay called with:', panelType);
  console.trace('Call stack:');
  const overlay = document.querySelector('.ui-overlay');
  console.log('overlay found:', overlay);
  if (!overlay) {
    console.log('No overlay found!');
    return; // Safety check - overlay doesn't exist
  }

  // Show overlay first time
  if (overlay.style.opacity === '' || overlay.style.opacity === '0') {
    gsap.to(overlay, { opacity: 1, duration: 0.3 });
  }

  switch(panelType) {
    case 'reality-recovery':
      console.log('Calling showRealityRecoveryPanel');
      showRealityRecoveryPanel(overlay);
      break;
    case 'system-init':
      console.log('WARNING: Old system-init call - converting to reality-recovery');
      showRealityRecoveryPanel(overlay);
      break;
    default:
      console.log('Unknown panel type:', panelType);
  }
}

function showRealityRecoveryPanel(overlay) {
  console.log('showRealityRecoveryPanel called', overlay);
  const panel = overlay.querySelector('.reality-recovery-panel');
  console.log('panel found:', panel);
  if (!panel || panel.style.opacity === '1') return;
  
  // Prevent multiple initializations
  if (panel._sequenceInitialized) {
    console.log('Recovery sequence already initialized, skipping');
    return;
  }
  panel._sequenceInitialized = true;
  
  // Show the main panel
  gsap.to(panel, { opacity: 1, duration: 0.8, ease: 'power2.out' });
  
  // Start the recovery sequence
  initRealityRecoverySequence(panel);
}

/**
 * Initialize Reality Recovery sequence with dramatic storytelling
 * @param {HTMLElement} panel - Reality Recovery panel element
 */
function initRealityRecoverySequence(panel) {
  // Get all the elements
  const damageAssessment = panel.querySelector('.damage-assessment');
  const coreRestoration = panel.querySelector('.core-restoration');
  const perceptionRebuild = panel.querySelector('.perception-rebuild');
  const readyState = panel.querySelector('.ready-state');
  
  const scanningText = panel.querySelector('.scanning-text');
  const integrityLabel = panel.querySelector('.integrity-label');
  const integrityFill = panel.querySelector('.integrity-fill');
  const integrityPercentage = panel.querySelector('.integrity-percentage');
  
  const restoreHeader = panel.querySelector('.restore-header');
  const spatialLabel = panel.querySelector('.spatial-label');
  const spatialStatus = panel.querySelector('.spatial-status');
  const temporalLabel = panel.querySelector('.temporal-label');
  const temporalStatus = panel.querySelector('.temporal-status');
  const consciousnessLabel = panel.querySelector('.consciousness-label');
  const consciousnessStatus = panel.querySelector('.consciousness-status');
  
  const rebuildHeader = panel.querySelector('.rebuild-header');
  const perceptionFill = panel.querySelector('.perception-fill');
  const perceptionPercentage = panel.querySelector('.perception-percentage');
  const readyText = panel.querySelector('.ready-text');

  // Create the dramatic timeline
  const recoveryTl = gsap.timeline({ defaults: { ease: 'none' } });

  // Type text function
  function typeText(element, text, speed = 50, callback) {
    if (!element) return;
    element.textContent = '';
    let i = 0;
    
    function typeNextChar() {
      if (i < text.length) {
        element.textContent += text[i];
        i++;
        setTimeout(typeNextChar, speed);
      } else {
        if (callback) callback();
      }
    }
    
    setTimeout(typeNextChar, speed);
  }

  // Phase 1: Damage Assessment (0-12s) - SEQUENTIAL ONLY
  recoveryTl
    .call(() => {
      damageAssessment.classList.remove('hidden');
      gsap.fromTo(damageAssessment, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    })
    .call(() => {
      // Type out "SCANNING DAMAGED SECTORS" first
      typeText(scanningText, 'SCANNING REALITY LAYERS', 80, () => {
        // After typing, start the dots animation
        let scanDots = '';
        const scanInterval = setInterval(() => {
          scanDots = scanDots.length >= 3 ? '' : scanDots + '.';
          scanningText.textContent = `SCANNING REALITY LAYERS${scanDots}`;
        }, 600);
        
        // Stop scanning after 4 seconds and type "Reality Fabric Integrity"
        setTimeout(() => {
          clearInterval(scanInterval);
          // Now type out "Reality Fabric Integrity" FIRST
          if (integrityLabel) {
            typeText(integrityLabel, 'Reality Fabric Integrity', 70, () => {
            // ONLY after label is typed, show the bar and start it
            const integrityBar = panel.querySelector('.integrity-bar');
            integrityBar.classList.remove('opacity-0');
            {
              const integrityData = { value: 0 };
                gsap.to(integrityData, {
                  value: 67, duration: 3.0, ease: 'power1.out',
                  onUpdate: () => {
                    integrityFill.style.width = integrityData.value + '%';
                    integrityPercentage.textContent = Math.floor(integrityData.value) + '%';
                  },
                  onComplete: () => {
                    // PAUSE at 67% for 2 seconds - creates tension
                    setTimeout(() => {
                      // Then complete to 100% - this "fixes" the system
                      gsap.to(integrityData, {
                        value: 100, duration: 1.5, ease: 'power2.out',
                        onUpdate: () => {
                          integrityFill.style.width = integrityData.value + '%';
                          integrityPercentage.textContent = Math.floor(integrityData.value) + '%';
                        },
                        onComplete: () => {
                          // PAUSE at 100% - dramatic moment
                          setTimeout(() => {
                            if (window.startCodeFlood) {
                              console.log('UI Overlay triggering code rain at 100%');
                              window.startCodeFlood();
                            }
                            // ONLY after rain starts, type completion message
                            setTimeout(() => {
                              typeText(scanningText, 'REALITY ASSESSMENT COMPLETE', 60);
                            }, 1000);
                          }, 1200);
                        }
                      });
                    }, 2000);
                  }
                });
              }
            });
          } else {
            console.error('integrityLabel element not found!');
          }
        }, 4000);
      });
    })
    .to({}, { duration: 20 }) // Wait for all Phase 1 completion including pauses

    // Phase 2: Core Function Restoration (12-28s) - SEQUENTIAL ONLY
    .call(() => {
      coreRestoration.classList.remove('hidden');
      gsap.fromTo(coreRestoration, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    })
    .call(() => {
      // Type header first
      typeText(restoreHeader, 'RESTORING CORE FUNCTIONS...', 90);
    })
    .to({}, { duration: 1.5 }) // Wait for header typing
    .call(() => {
      // Show all function lines at once and start them simultaneously
      const spatialFunction = panel.querySelector('.core-function:nth-child(1)');
      const temporalFunction = panel.querySelector('.core-function:nth-child(2)');
      const consciousnessFunction = panel.querySelector('.core-function:nth-child(3)');
      
      spatialFunction.classList.remove('opacity-0');
      temporalFunction.classList.remove('opacity-0'); 
      consciousnessFunction.classList.remove('opacity-0');
      
      // Start all three functions at the same time
      // Spatial Rendering
      typeText(spatialLabel, '• Spatial Rendering........', 60, () => {
        typeText(spatialStatus, 'INITIALIZING...', 80, () => {
          setTimeout(() => {
            typeText(spatialStatus, 'LOADING...', 70, () => {
              setTimeout(() => {
                typeText(spatialStatus, 'COMPLETE', 60);
              }, 800);
            });
          }, 500);
        });
      });
      
      // Temporal Synchronization - starts immediately
      typeText(temporalLabel, '• Temporal Synchronization..', 60, () => {
        typeText(temporalStatus, 'STANDBY', 70, () => {
          setTimeout(() => {
            typeText(temporalStatus, 'INITIALIZING...', 80, () => {
              setTimeout(() => {
                typeText(temporalStatus, 'SYNCING...', 75, () => {
                  setTimeout(() => {
                    typeText(temporalStatus, 'ACTIVE', 60);
                  }, 1500);
                });
              }, 600);
            });
          }, 700);
        });
      });
      
      // Consciousness Bridge - starts immediately  
      typeText(consciousnessLabel, '• Consciousness Bridge......', 60, () => {
        typeText(consciousnessStatus, 'OFFLINE', 70, () => {
          setTimeout(() => {
            typeText(consciousnessStatus, 'CONNECTING...', 85, () => {
              setTimeout(() => {
                typeText(consciousnessStatus, 'ONLINE', 60);
              }, 1200);
            });
          }, 800);
        });
      });
    })
    .to({}, { duration: 4 }) // Wait for all functions to complete

    // Phase 3: Perception Layer Rebuild (28-42s) - SEQUENTIAL ONLY
    .call(() => {
      perceptionRebuild.classList.remove('hidden');
      gsap.fromTo(perceptionRebuild, { opacity: 0 }, { opacity: 1, duration: 0.5 });
    })
    .call(() => {
      // Type header first
      typeText(rebuildHeader, 'REBUILDING PERCEPTION LAYERS...', 85);
      
      // Add 2 glitch bursts at beginning - test with immediate execution
      setTimeout(() => {
        gsap.to(".scan", { opacity: 0.7, duration: 0.08 });
        gsap.to(".noise", { opacity: 0.45, duration: 0.08 });
      }, 500);
      setTimeout(() => {
        gsap.to(".scan", { opacity: 0.7, duration: 0.08 });
        gsap.to(".noise", { opacity: 0.45, duration: 0.08 });
      }, 1000);
    })
    .to({}, { duration: 3.5 }) // Wait for header typing
    .call(() => {
      // Show perception progress bar first, then start it
      const perceptionProgress = panel.querySelector('.perception-progress');
      perceptionProgress.classList.remove('opacity-0');
      {
        // Perception rebuild progress - dramatic build with pause at 89%
        const perceptionData = { value: 0 };
          gsap.to(perceptionData, {
            value: 89, duration: 6.0, ease: 'power1.out', // Slower build
            onUpdate: () => {
              perceptionFill.style.width = perceptionData.value + '%';
              perceptionPercentage.textContent = Math.floor(perceptionData.value) + '%';
            },
            onComplete: () => {
              // PAUSE at 89% for 3 seconds - major dramatic tension with glitch bursts
              // Add 2 double-duration glitch bursts
              const doubleGlitch1 = gsap.timeline({ defaults: { ease: "power3.inOut" } })
                .to(".scan", { opacity: 0.7, duration: 0.16 }, 0)
                .to(".noise", { opacity: 0.45, duration: 0.16 }, 0)
                .to(".panel", { skewX: 0.3, filter: "contrast(1.12) saturate(1.05)", duration: 0.12 }, 0)
                .to(".panel", { skewX: -0.3, filter: "contrast(1.12) saturate(1.05)", duration: 0.12 }, 0.12)
                .to(".panel", { skewX: 0, filter: "none", duration: 0.16 }, 0.24)
                .to([".scan", ".noise"], { opacity: 0, duration: 0.4 }, 0.28);
              
              const doubleGlitch2 = gsap.timeline({ defaults: { ease: "power3.inOut" } })
                .to(".scan", { opacity: 0.7, duration: 0.16 }, 0)
                .to(".noise", { opacity: 0.45, duration: 0.16 }, 0)
                .to(".panel", { skewX: 0.3, filter: "contrast(1.12) saturate(1.05)", duration: 0.12 }, 0)
                .to(".panel", { skewX: -0.3, filter: "contrast(1.12) saturate(1.05)", duration: 0.12 }, 0.12)
                .to(".panel", { skewX: 0, filter: "none", duration: 0.16 }, 0.24)
                .to([".scan", ".noise"], { opacity: 0, duration: 0.4 }, 0.28);
              
              recoveryTl.add(doubleGlitch1, '+=0.2');
              recoveryTl.add(doubleGlitch2, '+=0.5');
              
              setTimeout(() => {
                gsap.to(perceptionData, {
                  value: 100, duration: 2.0, ease: 'power2.out',
                  onUpdate: () => {
                    perceptionFill.style.width = perceptionData.value + '%';
                    perceptionPercentage.textContent = Math.floor(perceptionData.value) + '%';
                  }
                });
              }, 3000);
            }
          });
        }
    })
    .to({}, { duration: 11 }) // Wait for perception completion

    // Phase 4: Ready State (42s+) - FINAL SEQUENTIAL REVEAL
    .call(() => {
      readyState.classList.remove('hidden');
      gsap.fromTo(readyState, { opacity: 0 }, { opacity: 1, duration: 0.8 });
    })
    .to({}, { duration: 1 }) // Brief pause
    .call(() => {
      // Type the ready message - final dramatic conclusion
      if (!readyText) return;
      
      console.log('READY TEXT BEFORE CLEAR:', readyText.textContent);
      readyText.innerHTML = '';
      readyText.textContent = '';
      console.log('READY TEXT AFTER CLEAR:', readyText.textContent);
      
      setTimeout(() => {
        console.log('STARTING READY TEXT TYPING');
        typeText(readyText, 'READY FOR ENHANCED PERCEPTION PROTOCOLS', 65, () => {
          // After typing, add a blinking cursor effect
          const cursor = document.createElement('span');
          cursor.textContent = '_';
          cursor.style.animation = 'blink 1s infinite';
          readyText.appendChild(cursor);
          
          // Add the next line after a brief pause
          setTimeout(() => {
            const nextLine = document.createElement('div');
            nextLine.className = 'mt-3 text-center';
            nextLine.innerHTML = `
              <div class="next-line-text text-white/80 text-sm mb-2"></div>
              <button class="press-here-btn px-6 py-2 border border-white/40 bg-white/10 text-white text-sm font-mono hover:bg-white/20 transition-all duration-200 opacity-0 pointer-events-auto relative z-[9999] animate-pulse">Press here</button>
            `;
            readyState.appendChild(nextLine);
            
            // Type the text, then show button
            const nextLineText = nextLine.querySelector('.next-line-text');
            const pressBtn = nextLine.querySelector('.press-here-btn');
            typeText(nextLineText, 'You may now start reconstructing reality', 70, () => {
              pressBtn.style.opacity = '1';
              pressBtn.addEventListener('click', () => {
                // Kill everything first
                try {
                  if (window.gsap) {
                    window.gsap.killTweensOf("*");
                    if (window.gsap.globalTimeline) window.gsap.globalTimeline.clear();
                  }
                } catch(ex) {}

                // Override any conflicting functions
                window.switchLetters = function() {};

                // Hide other phases
                const stage = document.querySelector('.stage');
                const phase2 = document.querySelector('.phase2');
                if (stage) stage.style.display = 'none';
                if (phase2) phase2.style.display = 'none';

                // Show phase 3
                const phase3 = document.querySelector('.phase3');
                if (phase3) {
                  phase3.style.display = 'block';
                  phase3.style.opacity = '1';
                }

                // Set white background
                document.body.style.background = 'white';
                document.body.style.backgroundColor = 'white';

                // Change skip button back to black for Phase 3
                const skipBtn = document.getElementById('skipBtn');
                if (skipBtn) skipBtn.classList.replace('text-white', 'text-black');

                // Trigger Phase 3 clean system directly
                setTimeout(() => {
                  document.dispatchEvent(new CustomEvent('startPhase3Sequence', {
                    detail: { debug: true }
                  }));
                }, 1000);
              });
            });
          }, 1500);
        });
      }, 100);
    });
}

/**
 * Update the system panel content
 * @param {HTMLElement} panel - Panel element
 * @param {number} percentage - Loading percentage
 */
function updateSystemPanel(panel, percentage) {
  const loadingText = panel.querySelector('.loading-text');
  const memValue = panel.querySelector('.mem-value');

  if (!loadingText || !memValue) return;

  if (percentage < 0.3) {
    loadingText.textContent = 'INITIALIZING...';
  } else if (percentage < 0.6) {
    loadingText.textContent = 'LOADING MODULES';
  } else if (percentage < 0.9) {
    loadingText.textContent = 'BUILDING MESH';
  } else {
    loadingText.textContent = 'READY';
  }

  memValue.textContent = (47.2 + (percentage * 80)).toFixed(1);
}

/**
 * Update the mesh panel content
 * @param {HTMLElement} panel - Panel element
 * @param {number} percentage - Loading percentage
 */
function updateMeshPanel(panel, percentage) {
  const progressFill = panel.querySelector('.progress-fill');
  const vertexCount = panel.querySelector('.vertex-count');

  if (!progressFill || !vertexCount) return;

  progressFill.style.width = (percentage * 80) + '%';
  vertexCount.textContent = Math.floor(percentage * 1560);
}

/**
 * Update the process panel content
 * @param {HTMLElement} panel - Panel element
 * @param {number} percentage - Loading percentage
 */
function updateProcessPanel(panel, percentage) {
  // Process list is animated separately, just update if needed
  // Currently no dynamic updates needed for this panel
}

/**
 * Animate the process list appearance
 * @param {HTMLElement} panel - Panel element
 */
function animateProcessList(panel) {
  const processLines = panel.querySelectorAll('.process-line');
  processLines.forEach((line, i) => {
    gsap.to(line, { opacity: 1, duration: 0.4, delay: i * 0.2 });
  });
}

/**
 * Initialize neural network animation for NEURAL_CORE
 * @param {HTMLCanvasElement} canvas - Canvas element
 */
function initNeuralNetwork(canvas) {
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';

  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  let animationId;
  let progress = 0;
  const systems = [
    { name: 'CORE_INIT', progress: 0, targetProgress: 1, speed: 0.012 },
    { name: 'NET_SYNC', progress: 0, targetProgress: 1, speed: 0.008 },
    { name: 'MEM_ALLOC', progress: 0, targetProgress: 1, speed: 0.015 },
    { name: 'PROC_LOAD', progress: 0, targetProgress: 1, speed: 0.010 }
  ];

  function drawSystemInit() {
    ctx.clearRect(0, 0, width, height);
    
    const barHeight = 6;
    const barSpacing = 8;
    const startY = 15;
    
    systems.forEach((system, i) => {
      const y = startY + i * (barHeight + barSpacing);
      
      // System name
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '9px monospace';
      ctx.fillText(system.name, 8, y + 4);
      
      // Progress bar background
      const barX = 70;
      const barWidth = width - 120;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(barX, y, barWidth, barHeight);
      
      // Progress bar fill
      const fillWidth = barWidth * system.progress;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillRect(barX, y, fillWidth, barHeight);
      
      // Progress percentage
      const pct = Math.floor(system.progress * 100);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.font = '8px monospace';
      ctx.fillText(pct + '%', barX + barWidth + 3, y + 4);
      
      // Update progress
      if (system.progress < system.targetProgress) {
        system.progress = Math.min(system.progress + system.speed, system.targetProgress);
      }
    });
    
    // Overall progress dots
    const dotY = height - 10;
    const dotSpacing = 6;
    const totalDots = 10;
    const activeDots = Math.floor((progress / systems.length) * totalDots);
    
    for (let i = 0; i < totalDots; i++) {
      const x = 8 + i * dotSpacing;
      const opacity = i < activeDots ? 0.8 : 0.2;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.beginPath();
      ctx.arc(x, dotY, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Update overall progress
    progress = systems.reduce((sum, sys) => sum + sys.progress, 0);

    animationId = requestAnimationFrame(drawSystemInit);
  }
  
  drawSystemInit();

  canvas.stopAnimation = () => {
    if (animationId) cancelAnimationFrame(animationId);
  };
}

/**
 * Initialize icosahedron animation for GEOM_CORE  
 * @param {HTMLElement} panel - Panel element
 */
function initIcosahedron(panel) {
  const canvas = panel.querySelector('.icosahedron-canvas');
  const vertexCount = panel.querySelector('.vertex-count');
  
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';

  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  let animationId;
  let rotation = 0;
  
  // Icosahedron vertices (simplified 2D projection)
  const vertices = [
    [0, -1, 0], [0.894, -0.447, 0], [0.276, -0.447, 0.851],
    [-0.724, -0.447, 0.526], [-0.724, -0.447, -0.526], [0.276, -0.447, -0.851],
    [0.724, 0.447, 0.526], [-0.276, 0.447, 0.851], [-0.894, 0.447, 0],
    [-0.276, 0.447, -0.851], [0.724, 0.447, -0.526], [0, 1, 0]
  ];

  function drawIcosahedron() {
    ctx.clearRect(0, 0, width, height);
    
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = 25;
    
    rotation += 0.02;
    
    // Project 3D vertices to 2D
    const projected = vertices.map(([x, y, z]) => {
      // Simple rotation around Y axis
      const rotX = x * Math.cos(rotation) - z * Math.sin(rotation);
      const rotZ = x * Math.sin(rotation) + z * Math.cos(rotation);
      
      return [
        centerX + rotX * scale,
        centerY + y * scale
      ];
    });

    // Draw edges
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;
    
    // Icosahedron edge connections (simplified)
    const edges = [
      [0,1], [0,2], [0,3], [0,4], [0,5],
      [1,2], [2,3], [3,4], [4,5], [5,1],
      [6,7], [7,8], [8,9], [9,10], [10,6],
      [1,6], [2,7], [3,8], [4,9], [5,10],
      [6,11], [7,11], [8,11], [9,11], [10,11]
    ];
    
    edges.forEach(([a, b]) => {
      ctx.beginPath();
      ctx.moveTo(projected[a][0], projected[a][1]);
      ctx.lineTo(projected[b][0], projected[b][1]);
      ctx.stroke();
    });

    // Draw vertices
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    projected.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x, y, 2, 0, Math.PI * 2);
      ctx.fill();
    });

    // Update vertex count
    vertexCount.textContent = vertices.length;

    animationId = requestAnimationFrame(drawIcosahedron);
  }
  
  drawIcosahedron();

  canvas.stopAnimation = () => {
    if (animationId) cancelAnimationFrame(animationId);
  };
}

/**
 * Initialize monitor canvas animation
 * @param {HTMLCanvasElement} canvas - Canvas element
 */
function initMonitorCanvas(canvas) {
  if (!canvas || canvas.dataset.initialized) return;
  canvas.dataset.initialized = 'true';

  const ctx = canvas.getContext('2d');
  const width = canvas.offsetWidth;
  const height = canvas.offsetHeight;
  canvas.width = width;
  canvas.height = height;

  let animationId;
  const dataPoints = Array(20).fill(0).map(() => Math.random() * 0.8 + 0.1);

  function drawMonitor() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1;

    // Shift data points
    dataPoints.push(Math.random() * 0.8 + 0.1);
    dataPoints.shift();

    // Draw line graph
    ctx.beginPath();
    dataPoints.forEach((point, i) => {
      const x = (i / (dataPoints.length - 1)) * width;
      const y = height - (point * height);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    animationId = requestAnimationFrame(drawMonitor);
  }
  drawMonitor();

  canvas.stopAnimation = () => {
    if (animationId) cancelAnimationFrame(animationId);
  };
}

/**
 * Cleanup UI overlay system
 * Stop all animations and clear canvases
 */
export function cleanupUIOverlay() {
  const overlay = document.querySelector('.ui-overlay');
  if (!overlay) return;

  // Stop canvas animations
  const canvases = overlay.querySelectorAll('canvas');
  canvases.forEach(canvas => {
    if (canvas.stopAnimation) {
      canvas.stopAnimation();
    }
  });

  // Hide overlay
  gsap.to(overlay, { opacity: 0, duration: 0.3 });
}

/**
 * Check if UI overlay is available
 * @returns {boolean} True if UI overlay elements exist
 */
export function isUIOverlayAvailable() {
  return !!document.querySelector('.ui-overlay');
}
