import { useState, useEffect, useRef } from 'react'
import '../styles/glitchEffects.css'
import * as dat from 'dat.gui'

// Ripple effect settings
const rippleSettings = {
  maxSize: 160,
  animationSpeed: 1,
  strokeColor: [184, 184, 184],
};

const canvasSettings = {
  blur: 3,
  ratio: 1,
};

function Coords(x: number, y: number) {
  this.x = x || null;
  this.y = y || null;
}

const Ripple = function(x: number, y: number, circleSize: number, ctx: CanvasRenderingContext2D) {
  this.position = new Coords(x, y);
  this.circleSize = circleSize;
  this.maxSize = rippleSettings.maxSize;
  this.opacity = 1;
  this.ctx = ctx;
  this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
    ${Math.floor(rippleSettings.strokeColor[1])},
    ${Math.floor(rippleSettings.strokeColor[2])},
    ${this.opacity})`;

  this.animationSpeed = rippleSettings.animationSpeed;
  this.opacityStep = (this.animationSpeed / (this.maxSize - circleSize)) / 2;
};

Ripple.prototype = {
  update: function update() {
    this.circleSize = this.circleSize + this.animationSpeed;
    this.opacity = this.opacity - this.opacityStep;
    this.strokeColor = `rgba(${Math.floor(rippleSettings.strokeColor[0])},
      ${Math.floor(rippleSettings.strokeColor[1])},
      ${Math.floor(rippleSettings.strokeColor[2])},
      ${this.opacity})`;
  },
  draw: function draw() {
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.strokeColor;
    this.ctx.arc(this.position.x, this.position.y, this.circleSize, 0,
      2 * Math.PI);
    this.ctx.stroke();
  },
  setStatus: function setStatus(status: string) {
    this.status = status;
  },
};

interface IntroSequenceProps {
  onComplete: () => void
}

const codeSnippets = [
  "const mesh = new THREE.Mesh(geometry, material);",
  "scene.add(mesh);",
  "camera.position.set(0, 0, 5);",
  "renderer.render(scene, camera);",
  "const geometry = new THREE.BoxGeometry(1, 1, 1);",
  "material.uniforms.time.value = clock.getElapsedTime();",
  "light.position.set(10, 10, 10);",
  "const loader = new THREE.TextureLoader();",
  "mesh.rotation.x += 0.01;",
  "mesh.rotation.y += 0.01;",
  "const raycaster = new THREE.Raycaster();",
  "const mouse = new THREE.Vector2();",
  "function animate() { requestAnimationFrame(animate); }",
  "const controls = new OrbitControls(camera, renderer.domElement);",
  "renderer.setSize(window.innerWidth, window.innerHeight);",
  "const ambientLight = new THREE.AmbientLight(0x404040);",
  "scene.background = new THREE.Color(0x000000);",
  "const directionalLight = new THREE.DirectionalLight(0xffffff, 1);",
  "material.transparent = true;",
  "material.opacity = 0.8;",
  "const clock = new THREE.Clock();",
  "mesh.scale.set(2, 2, 2);",
  "camera.lookAt(0, 0, 0);",
  "renderer.shadowMap.enabled = true;",
  "const texture = loader.load('texture.jpg');",
  "material.map = texture;",
  "mesh.castShadow = true;",
  "mesh.receiveShadow = true;",
  "const group = new THREE.Group();",
  "group.add(mesh);",
  "scene.add(group);",
  "const helper = new THREE.BoxHelper(mesh, 0xffff00);",
  "scene.add(helper);",
  "renderer.setClearColor(0x000000, 1);",
  "const stats = new Stats();",
  "document.body.appendChild(stats.dom);",
]

const glitchEffects = [
  { name: 'mesh-glitch-corrupt', label: 'System Corruption' },
  { name: 'mesh-glitch-breach', label: 'Data Breach' },
  { name: 'mesh-glitch-hostile', label: 'Hostile Takeover' },
  { name: 'mesh-glitch-datamosh', label: 'VHS Datamosh' },
  { name: 'mesh-glitch-random', label: 'Random Clip Glitch' },
  { name: 'mesh-glitch-classic', label: 'Classic Glitch (SASS)' }
]


export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [phase, setPhase] = useState<'404-error' | 'glitch-transition' | 'code-rain' | 'reality-quote' | 'build-quote' | 'complete'>('404-error')
  const [isComplete, setIsComplete] = useState(false)
  const [userAdvanced, setUserAdvanced] = useState(false)
  const corruptionTimerRef = useRef<NodeJS.Timeout | null>(null)
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [showClickPrompt, setShowClickPrompt] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const [realityText, setRealityText] = useState('')
  const [realityLine1, setRealityLine1] = useState('')
  const [realityLine2, setRealityLine2] = useState('')
  const [currentSenseWord, setCurrentSenseWord] = useState('')
  const [realityPhase, setRealityPhase] = useState<'line1' | 'line2' | 'pause' | 'senses'>('line1')
  const [buildText, setBuildText] = useState('')
  const [clickPromptText, setClickPromptText] = useState('')
  const [currentGlitchIndex, setCurrentGlitchIndex] = useState(0) // Start with first effect
  const [previewMode, setPreviewMode] = useState(false)
  const [glitchedText404, setGlitchedText404] = useState('404')
  const [glitchedTextMessage, setGlitchedTextMessage] = useState('REALITY NOT FOUND')
  const [glitchedTextDesc, setGlitchedTextDesc] = useState('THE REALITY YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED, HAD ITS NAME CHANGED, OR IS TEMPORARILY UNAVAILABLE.')
  const [showFadeOut, setShowFadeOut] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rippleCanvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<any[]>([])
  const animationFrameRef = useRef<number | null>(null)
  const guiRef = useRef<dat.GUI | null>(null)

  const realityQuote = "REALITY IS NO LONGER JUST WHAT YOU SEE, HEAR, OR TOUCH"
  const buildQuote = "IT'S WHAT YOU BUILD"
  const clickPrompt = "CLICK TO PROCEED"

  // Helper function to render glitch text with new effects
  const renderGlitchText = (text: string, className: string = '') => {
    const currentEffect = glitchEffects[currentGlitchIndex].name
    
    // Special handling for classic glitch effect
    if (currentEffect === 'mesh-glitch-classic') {
      return (
        <div className="wrapper">
          <h1 className="glitch" data-text={text}>{text}</h1>
        </div>
      )
    }
    // Effects that need data-text attribute
    else if (currentEffect === 'mesh-glitch-breach' || currentEffect === 'mesh-glitch-datamosh' || currentEffect === 'mesh-glitch-random') {
      return (
        <div className={`${currentEffect} ${className}`} data-text={text}>
          {text}
        </div>
      )
    } else {
      return (
        <div className={`${currentEffect} ${className}`}>
          {text}
        </div>
      )
    }
  }

  // Handle 404 error page timing
  useEffect(() => {
    if (isComplete) return
    if (phase === '404-error') {
      // At 2 seconds, trigger first glitch
      const glitch1Timer = setTimeout(() => {
        setGlitchIntensity(1)
        // Reset after 1 second
        setTimeout(() => setGlitchIntensity(0), 1000)
      }, 2000)
      
      // At 4 seconds, trigger second glitch
      const glitch2Timer = setTimeout(() => {
        setGlitchIntensity(1)
        // Reset after 1 second
        setTimeout(() => setGlitchIntensity(0), 1000)
      }, 4000)
      
      // At 6 seconds, transition to glitch phase
      const transitionTimer = setTimeout(() => {
        setPhase('glitch-transition')
        setGlitchIntensity(0)
      }, 6000)
      
      return () => {
        clearTimeout(glitch1Timer)
        clearTimeout(glitch2Timer)
        clearTimeout(transitionTimer)
      }
    }
  }, [phase])

  // Show skip button - runs once when 404-error starts, persists across phase changes
  useEffect(() => {
    if (isComplete) return
    if (phase === '404-error' && !showSkipButton) {
      // Show skip button 2 seconds after first glitch starts moving (2000ms + 2000ms)
      const skipTimer = setTimeout(() => {
        setShowSkipButton(true)
      }, 4000)
      
      // Store timer in ref so it doesn't get cleared by phase changes
      corruptionTimerRef.current = skipTimer
    }
  }, [phase, showSkipButton])

  // Text corruption effect - PURELY VISUAL
  useEffect(() => {
    if (isComplete) return
    if (phase !== 'glitch-transition') return
    
    const originalTexts = {
      '404': '404',
      'message': 'REALITY NOT FOUND',  
      'desc': 'The reality you are looking for might have been removed, had its name changed, or is temporarily unavailable.'
    }
    
    const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~`'
    
    let timeElapsed = 0
    let currentInterval = 800
    let corruptionLevel = 0.02
    let isActive = true
    
    const corruptText = (original: string, level: number) => {
      return original.split('').map(char => {
        if (char === ' ') return ' '
        if (Math.random() < level) {
          const isUpperCase = char === char.toUpperCase() && char !== char.toLowerCase()
          const randomChar = randomChars[Math.floor(Math.random() * randomChars.length)]
          return isUpperCase ? randomChar.toUpperCase() : randomChar.toLowerCase()
        }
        return char
      }).join('')
    }
    
    const scheduleNextCorruption = () => {
      if (!isActive) return
      
      setTimeout(() => {
        if (!isActive) return
        
        timeElapsed += currentInterval
        corruptionLevel = Math.pow(timeElapsed / 10000, 2.5) * 1.0
        currentInterval = Math.max(10, 800 * Math.pow(0.75, timeElapsed / 400))
        
        // ONLY update text - no phase transitions or overlays
        setGlitchedText404(corruptText(originalTexts['404'], corruptionLevel))
        setGlitchedTextMessage(corruptText(originalTexts.message, corruptionLevel * 0.7))
        setGlitchedTextDesc(corruptText(originalTexts.desc, corruptionLevel * 0.5))
        
        if (timeElapsed < 10000) {
          scheduleNextCorruption()
        } else {
          // Transition to code-rain phase after corruption is complete
          setPhase('code-rain');
        }
      }, currentInterval)
    }

    scheduleNextCorruption()

    return () => {
      isActive = false
    }
  }, [phase])

  // Show click prompt after delay
  useEffect(() => {
    if (isComplete) return
    if (phase === 'code-rain') {
      setShowClickPrompt(false) // Reset first
      const timer = setTimeout(() => {
        setShowClickPrompt(true)
      }, 7000) // 5000 + 2000 for the code rain delay
      return () => clearTimeout(timer)
    }
  }, [phase])

  // Typing effect for click prompt
  useEffect(() => {
    if (isComplete) return
    if (showClickPrompt && phase === 'code-rain') {
      setClickPromptText('')
      let index = 0
      const typingInterval = setInterval(() => {
        if (index < clickPrompt.length) {
          setClickPromptText(clickPrompt.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
        }
      }, 120)
      
      return () => clearInterval(typingInterval)
    }
  }, [showClickPrompt, phase])


  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Glitch effect preview system
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Glitch controls
      if (e.key.toLowerCase() === 'g') {
        setPreviewMode(!previewMode)
        console.log(`Glitch preview mode: ${!previewMode ? 'ENABLED' : 'DISABLED'}`)
        if (!previewMode) {
          console.log('Use arrow keys to cycle through effects:')
          glitchEffects.forEach((effect, index) => {
            console.log(`${index}: ${effect.label}`)
          })
        }
      }
      
      if (previewMode) {
        if (e.key === 'ArrowLeft') {
          const newIndex = currentGlitchIndex > 0 ? currentGlitchIndex - 1 : glitchEffects.length - 1
          setCurrentGlitchIndex(newIndex)
          console.log(`← ${glitchEffects[newIndex].label}`)
        }
        if (e.key === 'ArrowRight') {
          const newIndex = currentGlitchIndex < glitchEffects.length - 1 ? currentGlitchIndex + 1 : 0
          setCurrentGlitchIndex(newIndex)
          console.log(`→ ${glitchEffects[newIndex].label}`)
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [previewMode, currentGlitchIndex])


  // Canvas-based code rain with ripple effect
  useEffect(() => {
    if (phase !== 'code-rain') return

    // Delay everything by 2 seconds
    const startDelay = setTimeout(() => {

    const canvas = canvasRef.current
    const rippleCanvas = rippleCanvasRef.current
    if (!canvas || !rippleCanvas) {
      console.error('Canvas not found')
      return
    }

    const ctx = canvas.getContext('2d')
    const rippleCtx = rippleCanvas.getContext('2d')
    if (!ctx || !rippleCtx) {
      console.error('Canvas context not found')
      return
    }

    // Set canvas sizes
    const height = document.body.clientHeight;
    const width = document.body.clientWidth;
    
    // Main canvas (no blur)
    canvas.width = width * canvasSettings.ratio;
    canvas.height = height * canvasSettings.ratio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Ripple canvas (with blur)
    rippleCanvas.style.filter = `blur(${canvasSettings.blur}px)`;
    rippleCanvas.width = width * canvasSettings.ratio;
    rippleCanvas.height = height * canvasSettings.ratio;
    rippleCanvas.style.width = `${width}px`;
    rippleCanvas.style.height = `${height}px`;

    console.log('Canvas initialized:', canvas.width, 'x', canvas.height)

    // Initialize ripples array
    ripplesRef.current = [];

    // GUI settings disabled - using final values

    // Code rain state - full effect with many lines
    const maxLines = 80
    const codeLines: Array<{
      x: number
      y: number
      text: string
      fullText: string
      typingIndex: number
      opacity: number
      size: number
      lastUpdate: number
      typingSpeed: number
    }> = []

    // Function which is executed on mouse hover on canvas
    const canvasMouseOver = (e: MouseEvent) => {
      const x = e.clientX * canvasSettings.ratio;
      const y = e.clientY * canvasSettings.ratio;
      ripplesRef.current.unshift(new (Ripple as any)(x, y, 2, rippleCtx));
    };

    // Ripple animation function
    const rippleAnimation = () => {
      // Clear ripple canvas
      rippleCtx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);
      
      const ripples = ripplesRef.current;
      const length = ripples.length;
      for (let i = length - 1; i >= 0; i -= 1) {
        const r = ripples[i];

        r.update();
        r.draw();

        if (r.opacity <= 0) {
          ripples[i] = null;
          delete ripples[i];
          ripples.pop();
        }
      }
    };

    // Animation loop
    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawn new lines frequently for dense effect
      if (codeLines.length < maxLines && Math.random() < 0.4) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        
        // Click prompt safe zone (center area)
        const clickPromptX = canvas.width / 2
        const clickPromptY = canvas.height / 2
        const safeZoneWidth = 400
        const safeZoneHeight = 100
        
        let x, y
        let attempts = 0
        do {
          x = Math.random() * (canvas.width - 500)
          y = Math.random() * canvas.height
          attempts++
        } while (
          attempts < 20 && // Prevent infinite loop
          x > (clickPromptX - safeZoneWidth/2) && 
          x < (clickPromptX + safeZoneWidth/2) &&
          y > (clickPromptY - safeZoneHeight/2) && 
          y < (clickPromptY + safeZoneHeight/2)
        )
        
        codeLines.push({
          x,
          y,
          text: '',
          fullText: snippet,
          typingIndex: 0,
          opacity: Math.random() * 0.5 + 0.3,
          size: Math.random() * 0.4 + 0.6,
          lastUpdate: Date.now(),
          typingSpeed: Math.random() * 120 + 40 // 40-160ms between characters
        })
      }

      // Update and draw code lines
      for (let i = codeLines.length - 1; i >= 0; i--) {
        const line = codeLines[i]
        const now = Date.now()

        // Typing effect with variable speeds
        if (line.typingIndex < line.fullText.length && now - line.lastUpdate > line.typingSpeed) {
          line.typingIndex++
          line.text = line.fullText.slice(0, line.typingIndex)
          line.lastUpdate = now
        }

        // Check mouse safe zone - use current mouse position without restarting animation
        const currentMouseX = mousePos.x
        const currentMouseY = mousePos.y
        const mouseDistance = Math.sqrt((line.x - currentMouseX) ** 2 + (line.y - currentMouseY) ** 2)
        const inMouseSafeZone = mouseDistance < 150

        // Check click prompt safe zone
        const clickPromptX = canvas.width / 2
        const clickPromptY = canvas.height / 2
        const safeZoneWidth = 400
        const safeZoneHeight = 100
        const inClickSafeZone = (
          line.x > (clickPromptX - safeZoneWidth/2) && 
          line.x < (clickPromptX + safeZoneWidth/2) &&
          line.y > (clickPromptY - safeZoneHeight/2) && 
          line.y < (clickPromptY + safeZoneHeight/2)
        )

        if (!inMouseSafeZone && !inClickSafeZone) {
          // Draw the line
          ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity})`
          ctx.font = `${line.size * 16}px monospace`
          ctx.fillText(line.text, line.x, line.y)

          // Add subtle trailing effect to the letters
          if (line.typingIndex < line.fullText.length) {
            const trailLength = Math.min(3, line.text.length)
            for (let j = 0; j < trailLength; j++) {
              const charIndex = line.text.length - 1 - j
              if (charIndex >= 0) {
                const char = line.text[charIndex]
                const charWidth = ctx.measureText(line.text.slice(0, charIndex)).width
                const opacity = (trailLength - j) / trailLength * 0.4
                ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
                ctx.fillText(char, line.x + charWidth, line.y + 1)
              }
            }
          }
        }

        // Remove completed lines occasionally
        if (line.typingIndex >= line.fullText.length && Math.random() < 0.005) {
          codeLines.splice(i, 1)
        }
      }

      // Draw ripples on separate canvas
      rippleAnimation();

      animationFrameRef.current = window.requestAnimationFrame(animate);
    }

    // Start animation
    animate();

    // Add mouse event listener to ripple canvas
    rippleCanvas.addEventListener('mousemove', canvasMouseOver);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
      rippleCanvas.removeEventListener('mousemove', canvasMouseOver);
      if (guiRef.current) {
        guiRef.current.destroy();
        guiRef.current = null;
      }
    }

    }, 2000) // 2 second delay

    return () => {
      clearTimeout(startDelay)
    }
  }, [phase])


  // New reality quote sequence
  useEffect(() => {
    if (isComplete) return
    if (phase !== 'reality-quote') return
    
    // Reset everything
    setRealityLine1('')
    setRealityLine2('')
    setCurrentSenseWord('')
    setRealityPhase('line1')
    
    const line1 = "REALITY IS NO LONGER"
    const line2 = "JUST WHAT YOU"
    const senseWords = ["SEE", "HEAR", "TOUCH"]
    
    // Type line 1
    let index1 = 0
    const line1Interval = setInterval(() => {
      if (index1 < line1.length) {
        setRealityLine1(line1.slice(0, index1 + 1))
        index1++
      } else {
        clearInterval(line1Interval)
        setRealityPhase('line2')
        
        // Type line 2
        let index2 = 0
        const line2Interval = setInterval(() => {
          if (index2 < line2.length) {
            setRealityLine2(line2.slice(0, index2 + 1))
            index2++
          } else {
            clearInterval(line2Interval)
            setRealityPhase('pause')
            
            // 0.5 second pause, then senses
            setTimeout(() => {
              setRealityPhase('senses')
              
              // Type, wait, erase each sense word
              let senseIndex = 0
              const showNextSense = () => {
                if (senseIndex < senseWords.length) {
                  const word = senseWords[senseIndex]
                  
                  // Type in the word
                  let typeIndex = 0
                  const typeInterval = setInterval(() => {
                    if (typeIndex < word.length) {
                      setCurrentSenseWord(word.slice(0, typeIndex + 1))
                      typeIndex++
                    } else {
                      clearInterval(typeInterval)
                      
                      // Wait 2 seconds, then erase
                      setTimeout(() => {
                        let eraseIndex = word.length
                        const eraseInterval = setInterval(() => {
                          if (eraseIndex > 0) {
                            eraseIndex--
                            setCurrentSenseWord(word.slice(0, eraseIndex))
                          } else {
                            clearInterval(eraseInterval)
                            setCurrentSenseWord('')
                            senseIndex++
                            
                            // Wait 1 second before next word
                            setTimeout(showNextSense, 1000)
                          }
                        }, 80) // Erase speed
                      }, 2000) // Wait 2 seconds
                    }
                  }, 100) // Type speed
                } else {
                  // Move to build quote after all senses shown
                  setTimeout(() => setPhase('build-quote'), 1000)
                }
              }
              showNextSense()
              
            }, 500) // 0.5 second pause
          }
        }, 120) // Slower typing for line 2
      }
    }, 100) // Slower typing for line 1
    
  }, [phase])

  // Typing effect for build quote
  useEffect(() => {
    if (isComplete) return
    if (phase === 'build-quote') {
      setBuildText('')
      let index = 0
      const typingInterval = setInterval(() => {
        if (index < buildQuote.length) {
          setBuildText(buildQuote.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
        }
      }, 100)
      
      return () => clearInterval(typingInterval)
    }
  }, [phase])

  // Handle click to proceed
  const handleClick = () => {
    console.log('Button clicked! Phase:', phase, 'isComplete:', isComplete)
    if (phase === 'complete' || isComplete) {
      console.log('Blocked - already complete')
      return
    }
    
    if (phase === 'code-rain') {
      console.log('Code rain -> reality quote - USER ADVANCED')
      setUserAdvanced(true) // Block all automatic phase transitions
      setPhase('reality-quote')
      setGlitchIntensity(1)
      
      // Start heavy glitching, then fade
      setTimeout(() => setGlitchIntensity(2), 1000)
      setTimeout(() => setGlitchIntensity(3), 2000)
      // Removed old timeout - reality quote will handle its own transition
    } else if (phase === 'build-quote') {
      console.log('Build quote -> completing!')
      setIsComplete(true)
      setPhase('complete')
      onComplete()
    }
  }

  const handleSkip = () => {
    console.log('Skip button clicked!')
    setIsComplete(true)
    setPhase('complete')
    onComplete()
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 z-50 ${
        phase === 'build-quote' ? 'bg-white' : 'bg-black'
      }`}
    >
      {/* 404 Reality Not Found Error Page */}
      {phase === '404-error' && (
        <div className="absolute inset-0 flex items-center justify-center text-black font-mono bg-white">
          <div className="flex items-center space-x-12">
            {/* 404 Number - WITH CLASSIC GLITCH EFFECT AT 2 & 4 SECONDS */}
            <div className="text-9xl font-bold relative w-80 flex-shrink-0">
              {glitchIntensity > 0 ? (
                <h1 className="glitch" data-text="404" style={{fontSize: '128px', margin: 0, padding: 0}}>404</h1>
              ) : (
                <span>404</span>
              )}
            </div>
            
            {/* Error Content */}
            <div className="border-l border-gray-400 pl-12">
              {/* Error Title */}
              <h1 className="text-3xl font-bold mb-6 uppercase tracking-wider">REALITY NOT FOUND</h1>
              
              {/* Error Description */}
              <p className="text-gray-700 max-w-lg mb-8 text-lg leading-relaxed">
                The reality you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              
            </div>
          </div>
        </div>
      )}

      {/* Glitch Transition Phase */}
      {phase === 'glitch-transition' && (
        <div className="absolute inset-0 flex items-center justify-center text-black font-mono bg-white">
          <div className="flex items-center space-x-12">
            {/* 404 Number - corrupting text only */}
            <div className="text-9xl font-bold w-80 flex-shrink-0">{glitchedText404}</div>
            
            {/* Error Content */}
            <div className="border-l border-gray-400 pl-12">
              {/* Error Title - corrupting text only */}
              <h1 className="text-3xl font-bold mb-6 uppercase tracking-wider">{glitchedTextMessage}</h1>
              
              {/* Error Description - corrupting text only */}
              <p className="text-gray-700 max-w-lg mb-8 text-lg leading-relaxed">
                {glitchedTextDesc}
              </p>
              
            </div>
          </div>
          
        </div>
      )}

      {/* Canvas Code Rain Background */}
      {phase === 'code-rain' && (
        <>
          <canvas 
            ref={canvasRef}
            className="absolute inset-0"
            style={{ zIndex: 1 }}
          />
          <canvas 
            ref={rippleCanvasRef}
            className="absolute inset-0"
            style={{ zIndex: 2 }}
          />
        </>
      )}

      {/* Click to Proceed Prompt */}
      {phase === 'code-rain' && showClickPrompt && (
        <>
          {/* Gradient background panel */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            style={{ 
              zIndex: 19,
              width: '800px',
              height: '300px',
              background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.85) 20%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 50%, rgba(0, 0, 0, 0.1) 70%, rgba(0, 0, 0, 0.02) 85%, rgba(0, 0, 0, 0) 95%, transparent 100%)'
            }}
          />
          
          {/* Click to proceed text */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer text-white text-4xl font-mono pointer-events-auto" style={{ zIndex: 20 }} onClick={handleClick}>
            <div className={`${clickPromptText.length >= clickPrompt.length ? 'bg-black bg-opacity-80 px-6 py-3 rounded-lg' : ''}`}>
              {clickPromptText}
              {clickPromptText.length < clickPrompt.length && (
                <span className="animate-pulse text-white">|</span>
              )}
            </div>
          </div>
        </>
      )}


      {/* Reality Quote Phase */}
      {phase === 'reality-quote' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center text-white font-light tracking-wide max-w-4xl px-8 flex-1 flex flex-col justify-between">
            
            {/* Top space - reserved for future content */}
            <div className="flex-1"></div>
            
            {/* Middle section - Sense words */}
            <div className="text-5xl md:text-7xl h-20 md:h-28 flex items-center justify-center">
              {currentSenseWord && (
                currentSenseWord === 'SEE' ? (
                  <div className="mesh-glitch-corrupt">{currentSenseWord}</div>
                ) : currentSenseWord === 'HEAR' ? (
                  <div className="mesh-glitch-datamosh" data-text={currentSenseWord}>{currentSenseWord}</div>
                ) : currentSenseWord === 'TOUCH' ? (
                  <div className="mesh-glitch-hostile">{currentSenseWord}</div>
                ) : (
                  currentSenseWord
                )
              )}
            </div>
            
            {/* Bottom section - Main reality text */}
            <div className="flex-1 flex flex-col justify-end pb-16">
              {/* Line 1 - Fixed height */}
              <div className="text-4xl md:text-6xl mb-4 h-16 md:h-20 flex items-center justify-center">
                {realityLine1}
                {realityPhase === 'line1' && realityLine1.length > 0 && (
                  <span className="animate-pulse text-white/60">|</span>
                )}
              </div>
              
              {/* Line 2 - Fixed height */}
              <div className="text-4xl md:text-6xl h-16 md:h-20 flex items-center justify-center">
                {realityLine2}
                {realityPhase === 'line2' && realityLine2.length > 0 && (
                  <span className="animate-pulse text-white/60">|</span>
                )}
              </div>
            </div>
            
          </div>
        </div>
      )}

      {/* Build Quote Phase */}
      {phase === 'build-quote' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{backgroundColor: 'white', zIndex: 100}}>
          <div className="text-center text-black text-5xl md:text-7xl font-light tracking-wide mb-12">
{previewMode ? (
              renderGlitchText(buildText, "")
            ) : (
              <div className="mesh-glitch-breach" data-text={buildText}>
                {buildText}
              </div>
            )}
            {buildText.length < buildQuote.length && (
              <span className="animate-pulse text-black/60">|</span>
            )}
          </div>
          {buildText.length >= buildQuote.length && (
            <button 
              onClick={handleClick}
              className="px-8 py-4 text-black font-mono text-lg hover:text-gray-600 transition-colors duration-300"
            >
              PRESS TO CONTINUE
            </button>
          )}
        </div>
      )}

      {/* Engulfing darkness overlay - at top level */}
      {showFadeOut && (
        <div className="fixed inset-0 z-60 flex items-center justify-center pointer-events-none">
          <div className="bg-black" style={{
            width: '20px',
            height: '20px',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            filter: 'blur(8px)',
            animation: 'organicEngulf 0.5s ease-out forwards'
          }} />
        </div>
      )}

      {/* Skip Button - Top Right Corner */}
      {showSkipButton && (
        <div className="absolute top-8 right-8 z-[100]">
          <button 
            onClick={handleSkip}
            className="text-white font-mono text-lg hover:text-gray-300 transition-colors"
          >
            [SKIP]
          </button>
        </div>
      )}


      {/* Glitch Preview Mode Indicator */}
      {previewMode && (
        <div className="fixed top-4 left-4 z-[100] bg-black bg-opacity-80 text-white font-mono text-sm p-3 rounded">
          <div className="text-green-400">🎛️ GLITCH PREVIEW MODE</div>
          <div className="mt-1">Current: {glitchEffects[currentGlitchIndex].label}</div>
          <div className="mt-1 text-gray-400">← → arrows to change</div>
          <div className="text-gray-400">G to exit</div>
        </div>
      )}

    </div>
  )
}