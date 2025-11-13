// Main MeshStudios Website - Complete sections from React version
// Converted to vanilla JS for modular experiment integration

export class WebsiteMain {
  constructor(container) {
    this.container = container;
    this.currentGlitchText = 0;
    this.showLogo = false;
    this.logoSpinning = true;
    this.meshText = '';
    this.isTypingComplete = false;
    this.glitchTypingComplete = false;
    this.glitchDisplayText = '';

    this.glitchTexts = [
      "// WEAVING REALITY FABRIC...",
      "// CONSTRUCTING VISUAL LAYERS...",
      "// MERGING SONIC SEQUENCES...",
      "// COMPILING CODE STRUCTURES...",
      "// MESHING DIMENSIONS...",
      "// REALITY ARCHITECTURE COMPLETE..."
    ];

    this.fullMeshText = "MESHSTUDIOS";
  }

  init() {
    this.render();
    this.startGlitchAnimation();
  }

  render() {
    this.container.innerHTML = `
      <!-- Main Website Content -->
      <div class="website-main w-full min-h-screen bg-black">

        <!-- Hero Section -->
        <section class="hero-section relative w-full h-screen flex items-center justify-center bg-black">
          <!-- Clean minimal background -->
          <div class="absolute inset-0 bg-black"></div>

          <!-- Main content container with proper centering -->
          <div class="relative z-20 flex flex-col items-center justify-center">
            <!-- CSS 3D Cube Logo - 6 cubes -->
            <div class="cube-container transition-opacity duration-1000 mb-16" style="opacity: 0;">
              <div class="scene relative w-[200px] h-[250px]">
                <div class="cube cube_count_1">
                  <div class="cube__face cube__face--front"></div>
                  <div class="cube__face cube__face--back"></div>
                  <div class="cube__face cube__face--right"></div>
                  <div class="cube__face cube__face--left"></div>
                  <div class="cube__face cube__face--top"></div>
                  <div class="cube__face cube__face--bottom"></div>
                </div>
                <div class="cube cube_count_2">
                  <div class="cube__face cube__face--front"></div>
                  <div class="cube__face cube__face--back"></div>
                  <div class="cube__face cube__face--right"></div>
                  <div class="cube__face cube__face--left"></div>
                  <div class="cube__face cube__face--top"></div>
                  <div class="cube__face cube__face--bottom"></div>
                </div>
                <div class="cube cube_count_3">
                  <div class="cube__face cube__face--front"></div>
                  <div class="cube__face cube__face--back"></div>
                  <div class="cube__face cube__face--right"></div>
                  <div class="cube__face cube__face--left"></div>
                  <div class="cube__face cube__face--top"></div>
                  <div class="cube__face cube__face--bottom"></div>
                </div>
                <div class="cube cube_count_4">
                  <div class="cube__face cube__face--front"></div>
                  <div class="cube__face cube__face--back"></div>
                  <div class="cube__face cube__face--right"></div>
                  <div class="cube__face cube__face--left"></div>
                  <div class="cube__face cube__face--top"></div>
                  <div class="cube__face cube__face--bottom"></div>
                </div>
                <div class="cube cube_count_5">
                  <div class="cube__face cube__face--front"></div>
                  <div class="cube__face cube__face--back"></div>
                  <div class="cube__face cube__face--right"></div>
                  <div class="cube__face cube__face--left"></div>
                  <div class="cube__face cube__face--top"></div>
                  <div class="cube__face cube__face--bottom"></div>
                </div>
                <div class="cube cube_count_6">
                  <div class="cube__face cube__face--front"></div>
                  <div class="cube__face cube__face--back"></div>
                  <div class="cube__face cube__face--right"></div>
                  <div class="cube__face cube__face--left"></div>
                  <div class="cube__face cube__face--top"></div>
                  <div class="cube__face cube__face--bottom"></div>
                </div>
              </div>
            </div>

            <!-- MESHSTUDIO Text - Positioned below the cube -->
            <h1 class="mesh-title text-6xl md:text-8xl font-light text-white tracking-wide mb-8 text-center">
            </h1>

            <!-- Glitch Code Text Effect -->
            <div class="h-8 flex items-center justify-center">
              <p class="glitch-text text-lg text-white/60 font-mono">
              </p>
            </div>
          </div>

          <!-- Minimal instruction - positioned relative to viewport -->
          <div class="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <p class="text-sm text-white/30 font-mono">
              SCROLL TO EXPLORE
            </p>
          </div>
        </section>

        <!-- Header/Services Section -->
        <section class="header-section w-full py-24 bg-black">
          <div class="max-w-7xl mx-auto px-8">
            <!-- Main Header -->
            <div class="text-center mb-16">
              <h2 class="text-5xl md:text-7xl font-light text-white tracking-widest mb-8">
                Crafting Reality Through Art<br />
                and Technology
              </h2>
              <div class="w-24 h-0.5 bg-white mx-auto mb-8"></div>
              <p class="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                We specialize in creating immersive experiences that blur the lines between
                digital and physical reality through cutting-edge technology and artistic vision.
              </p>
            </div>

            <!-- Services Grid -->
            <div class="text-center mb-12">
              <h3 class="text-2xl font-light text-white mb-16 tracking-wide">
                Crafting Digital Realities
              </h3>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
              <!-- Visual Services -->
              <div class="text-center group">
                <div class="w-full h-64 bg-white/5 border border-white/20 mb-6 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                  <div class="text-6xl text-white/30">👁</div>
                </div>
                <h4 class="text-xl font-medium text-white mb-4 tracking-wide">
                  Visual Excellence
                </h4>
                <p class="text-white/60 leading-relaxed text-sm">
                  Advanced 3D rendering, motion graphics, and immersive visual experiences
                  that captivate and engage your audience through cutting-edge technology.
                </p>
              </div>

              <!-- Sound Services -->
              <div class="text-center group">
                <div class="w-full h-64 bg-white/5 border border-white/20 mb-6 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                  <div class="text-6xl text-white/30">🎵</div>
                </div>
                <h4 class="text-xl font-medium text-white mb-4 tracking-wide">
                  Immersive Audio
                </h4>
                <p class="text-white/60 leading-relaxed text-sm">
                  Spatial audio design, interactive soundscapes, and dynamic audio systems
                  that create emotional depth and enhance user engagement.
                </p>
              </div>

              <!-- Code Services -->
              <div class="text-center group">
                <div class="w-full h-64 bg-white/5 border border-white/20 mb-6 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                  <div class="text-6xl text-white/30">⟨/⟩</div>
                </div>
                <h4 class="text-xl font-medium text-white mb-4 tracking-wide">
                  Technical Innovation
                </h4>
                <p class="text-white/60 leading-relaxed text-sm">
                  Custom development solutions, interactive applications, and robust
                  technical infrastructure that brings creative visions to life.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="cta-section w-full py-32 bg-black">
          <div class="max-w-4xl mx-auto px-8">
            <!-- Main CTA Content -->
            <div class="text-center">
              <h2 class="text-5xl md:text-7xl font-light text-white tracking-widest mb-8">
                Ready to get in touch for<br />
                your new project?
              </h2>

              <div class="w-24 h-0.5 bg-white mx-auto mb-12"></div>

              <p class="text-xl text-white/70 mb-16 leading-relaxed max-w-2xl mx-auto">
                Let's create something extraordinary together. Whether it's immersive visuals,
                spatial audio, or cutting-edge code - we're ready to bring your vision to life.
              </p>

              <!-- Contact Button -->
              <div class="mb-16">
                <button class="contact-btn group relative px-12 py-6 border-2 border-white text-white font-mono text-lg tracking-widest hover:bg-white hover:text-black transition-all duration-300 overflow-hidden">
                  <span class="relative z-10">GET IN TOUCH</span>
                  <div class="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>

              <!-- Contact Methods -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div class="group">
                  <div class="text-2xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">📧</div>
                  <h4 class="text-white font-mono mb-2 tracking-wide">EMAIL</h4>
                  <p class="text-white/60 text-sm">hello@meshstudios.com</p>
                </div>

                <div class="group">
                  <div class="text-2xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">💬</div>
                  <h4 class="text-white font-mono mb-2 tracking-wide">DISCORD</h4>
                  <p class="text-white/60 text-sm">MeshStudios#0001</p>
                </div>

                <div class="group">
                  <div class="text-2xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">📱</div>
                  <h4 class="text-white font-mono mb-2 tracking-wide">SOCIAL</h4>
                  <p class="text-white/60 text-sm">@meshstudios</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Footer -->
        <footer class="footer-section w-full py-16 bg-black border-t border-white/10">
          <div class="max-w-7xl mx-auto px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <!-- Brand -->
              <div class="col-span-1 md:col-span-2">
                <h3 class="text-2xl font-light text-white tracking-widest mb-4">
                  MESH STUDIOS
                </h3>
                <p class="text-white/60 leading-relaxed mb-6 max-w-md">
                  Crafting reality through art and technology. We create immersive experiences
                  that blur the lines between digital and physical worlds.
                </p>
                <div class="flex space-x-4">
                  <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                    <span class="sr-only">Twitter</span>
                    🐦
                  </a>
                  <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                    <span class="sr-only">Instagram</span>
                    📷
                  </a>
                  <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                    <span class="sr-only">LinkedIn</span>
                    💼
                  </a>
                  <a href="#" class="text-white/40 hover:text-white transition-colors duration-300">
                    <span class="sr-only">GitHub</span>
                    👨‍💻
                  </a>
                </div>
              </div>

              <!-- Services -->
              <div>
                <h4 class="text-white font-mono mb-6 tracking-wide">SERVICES</h4>
                <ul class="space-y-3">
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Visual Excellence</a></li>
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Immersive Audio</a></li>
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Technical Innovation</a></li>
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Custom Development</a></li>
                </ul>
              </div>

              <!-- Contact -->
              <div>
                <h4 class="text-white font-mono mb-6 tracking-wide">CONTACT</h4>
                <ul class="space-y-3">
                  <li><a href="mailto:hello@meshstudios.com" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">hello@meshstudios.com</a></li>
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Discord</a></li>
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Schedule a Call</a></li>
                  <li><a href="#" class="text-white/60 hover:text-white transition-colors duration-300 text-sm">Project Inquiry</a></li>
                </ul>
              </div>
            </div>

            <!-- Bottom Bar -->
            <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
              <p class="text-white/40 text-sm mb-4 md:mb-0">
                © 2024 Mesh Studios. All rights reserved.
              </p>
              <div class="flex space-x-8">
                <a href="#" class="text-white/40 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
                <a href="#" class="text-white/40 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    `;
  }

  startGlitchAnimation() {
    // Type first sentence
    const firstSentence = this.glitchTexts[0];
    let charIndex = 0;
    this.glitchDisplayText = '';

    const glitchElement = this.container.querySelector('.glitch-text');

    const typeInterval = setInterval(() => {
      if (charIndex < firstSentence.length) {
        this.glitchDisplayText = firstSentence.slice(0, charIndex + 1);
        glitchElement.textContent = this.glitchDisplayText;
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Wait 0.5 seconds, then show sentences 2 and 3 with fade, then logo
        setTimeout(() => {
          let sentenceIndex = 1;

          const showNextSentence = () => {
            if (sentenceIndex < 3) {
              glitchElement.textContent = '';
              setTimeout(() => {
                glitchElement.textContent = this.glitchTexts[sentenceIndex];
                sentenceIndex++;
                setTimeout(showNextSentence, 1000);
              }, 100);
            } else {
              // After 3 sentences, show logo and start fade cycling
              this.glitchTypingComplete = true;
              this.showLogo = true;
              this.showCubeAndStartTyping();
              this.startFadeCycling();
            }
          };

          showNextSentence();
        }, 500);
      }
    }, 30); // typing speed
  }

  startFadeCycling() {
    const glitchElement = this.container.querySelector('.glitch-text');

    // Start cycling through remaining glitch texts with fade effect
    setInterval(() => {
      glitchElement.textContent = '';

      setTimeout(() => {
        const nextIndex = (this.currentGlitchText + 1) % this.glitchTexts.length;
        this.currentGlitchText = nextIndex;
        glitchElement.textContent = this.glitchTexts[nextIndex];
      }, 100);
    }, 3000);
  }

  showCubeAndStartTyping() {
    const cubeContainer = this.container.querySelector('.cube-container');
    cubeContainer.style.opacity = '1';

    // Stop cube after 2 full rotations, then start typing
    setTimeout(() => {
      // Stop logo spinning first
      const cubes = this.container.querySelectorAll('.cube');
      cubes.forEach(cube => cube.classList.add('cube-stopped'));

      // Start typing MESHSTUDIO after cube stops
      setTimeout(() => {
        this.startMeshTyping();
      }, 300); // Small delay after cube stops

    }, 4000); // 4 seconds for 2 full rotations (2s per rotation)
  }

  startMeshTyping() {
    const meshElement = this.container.querySelector('.mesh-title');
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < this.fullMeshText.length) {
        this.meshText = this.fullMeshText.slice(0, index + 1);
        meshElement.textContent = this.meshText;
        index++;
      } else {
        clearInterval(typingInterval);
        this.isTypingComplete = true;
      }
    }, 150); // 150ms per character
  }

  // Method to show the website (called after intro sequence)
  show() {
    this.container.style.display = 'block';
    this.container.style.opacity = '1';
    this.init();
  }

  // Method to hide the website
  hide() {
    this.container.style.display = 'none';
    this.container.style.opacity = '0';
  }
}
