import { useState, useEffect, useRef } from 'react'
import '../styles/glitchEffects.css'

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
  'glitch-noise', 
  'glitch-scanline',
  'glitch-red-blue'
]

export const IntroSequence = ({ onComplete }: IntroSequenceProps) => {
  const [phase, setPhase] = useState<'code-rain' | 'reality-quote' | 'build-quote' | 'complete'>('code-rain')
  const mousePosRef = useRef({ x: 0, y: 0 })
  const [showClickPrompt, setShowClickPrompt] = useState(false)
  const [glitchIntensity, setGlitchIntensity] = useState(0)
  const [realityText, setRealityText] = useState('')
  const [buildText, setBuildText] = useState('')
  const [clickPromptText, setClickPromptText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const autoCompleteTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const realityQuote = "Reality is no longer just what you see, hear, or touch"
  const buildQuote = "it's what you build"
  const clickPrompt = "CLICK TO PROCEED"

  // Automatically proceed after a delay if no interaction occurs
  useEffect(() => {
    autoCompleteTimeoutRef.current = setTimeout(() => {
      onComplete()
    }, 15000)

    return () => {
      if (autoCompleteTimeoutRef.current) {
        clearTimeout(autoCompleteTimeoutRef.current)
      }
    }
  }, [onComplete])

  // Show click prompt after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClickPrompt(true)
    }, 8000)
    return () => clearTimeout(timer)
  }, [])

  // Typing effect for click prompt
  useEffect(() => {
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

  // Track mouse position without causing re-renders
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {

      mousePosRef.current.x = e.clientX
      mousePosRef.current.y = e.clientY

    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Canvas-based code rain with all features
  useEffect(() => {
    if (phase !== 'code-rain') return

    const canvas = canvasRef.current
    if (!canvas) {
      console.error('Canvas not found')
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      console.error('Canvas context not found')
      return
    }

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    console.log('Canvas initialized:', canvas.width, 'x', canvas.height)

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
    }> = []

    // Animation loop
    const animate = () => {
      // Clear canvas with trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Spawn new lines frequently for dense effect
      if (codeLines.length < maxLines && Math.random() < 0.4) {
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        codeLines.push({
          x: Math.random() * (canvas.width - 500),
          y: Math.random() * canvas.height,
          text: '',
          fullText: snippet,
          typingIndex: 0,
          opacity: Math.random() * 0.5 + 0.3,
          size: Math.random() * 0.4 + 0.6,
          lastUpdate: Date.now()
        })
      }

      // Update and draw lines
      for (let i = codeLines.length - 1; i >= 0; i--) {
        const line = codeLines[i]
        const now = Date.now()

        // Typing effect
        if (line.typingIndex < line.fullText.length && now - line.lastUpdate > 100) {
          line.typingIndex++
          line.text = line.fullText.slice(0, line.typingIndex)
          line.lastUpdate = now
        }

        // Check mouse safe zone
        const { x: mouseX, y: mouseY } = mousePosRef.current
        const distance = Math.sqrt((line.x - mouseX) ** 2 + (line.y - mouseY) ** 2)
        const inSafeZone = distance < 150

        if (!inSafeZone) {
          // Draw the line
          ctx.fillStyle = `rgba(255, 255, 255, ${line.opacity})`
          ctx.font = `${line.size * 16}px monospace`
          ctx.fillText(line.text, line.x, line.y)

          // Draw cursor if still typing
          if (line.typingIndex < line.fullText.length) {
            ctx.fillStyle = `rgba(0, 255, 100, 0.7)`
            const textWidth = ctx.measureText(line.text).width
            ctx.fillText('|', line.x + textWidth, line.y)
          }
        }

        // Remove completed lines occasionally
        if (line.typingIndex >= line.fullText.length && Math.random() < 0.005) {
          codeLines.splice(i, 1)
        }
      }
    }

    const interval = setInterval(animate, 50) // 20fps

    return () => {
      clearInterval(interval)
    }
  }, [phase])

  // Typing effect for reality quote
  useEffect(() => {
    if (phase === 'reality-quote') {
      setRealityText('')
      let index = 0
      const typingInterval = setInterval(() => {
        if (index < realityQuote.length) {
          setRealityText(realityQuote.slice(0, index + 1))
          index++
        } else {
          clearInterval(typingInterval)
        }
      }, 80)
      
      return () => clearInterval(typingInterval)
    }
  }, [phase])

  // Typing effect for build quote
  useEffect(() => {
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
    if (autoCompleteTimeoutRef.current) {
      clearTimeout(autoCompleteTimeoutRef.current)
    }

    if (phase === 'code-rain') {
      setPhase('reality-quote')
      setGlitchIntensity(1)
      
      // Start heavy glitching, then fade
      setTimeout(() => setGlitchIntensity(2), 1000)
      setTimeout(() => setGlitchIntensity(3), 2000)
      // Give user time to read the full sentence + pause
      setTimeout(() => setPhase('build-quote'), 8000)
    } else if (phase === 'build-quote') {
      setPhase('complete')
      onComplete()
    }
  }

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-50 cursor-pointer transition-all duration-1000 ${
        phase === 'build-quote' ? 'bg-white' : 'bg-black'
      }`}
      onClick={handleClick}
    >
      <button
        className="absolute top-4 right-4 z-50 px-3 py-1 text-sm text-white border border-white bg-black/40 hover:bg-black/60"
        onClick={(e) => {
          e.stopPropagation()
          if (autoCompleteTimeoutRef.current) {
            clearTimeout(autoCompleteTimeoutRef.current)
          }
          onComplete()
        }}
      >
        Skip intro
      </button>
      {/* Canvas Code Rain Background */}
      {phase === 'code-rain' && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 1 }}
        />
      )}

      {/* Click to Proceed Prompt */}
      {phase === 'code-rain' && showClickPrompt && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2" style={{ zIndex: 10 }}>
          <div className="glitch-red-blue text-white text-4xl font-mono" data-text={clickPromptText}>
            {clickPromptText}
            {clickPromptText.length < clickPrompt.length && (
              <span className="animate-pulse text-green-400">|</span>
            )}
          </div>
        </div>
      )}

      {/* Reality Quote Phase */}
      {phase === 'reality-quote' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white text-4xl md:text-6xl font-light tracking-wide max-w-4xl px-8">
            {realityText}
            {realityText.length < realityQuote.length && (
              <span className="animate-pulse text-white/60">|</span>
            )}
          </div>
        </div>
      )}

      {/* Build Quote Phase */}
      {phase === 'build-quote' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center text-black text-5xl md:text-7xl font-light tracking-wide mb-12">
            {buildText}
            {buildText.length < buildQuote.length && (
              <span className="animate-pulse text-black/60">|</span>
            )}
          </div>
          <button className="px-8 py-4 border-2 border-black text-black font-mono text-lg hover:bg-black hover:text-white transition-colors duration-300">
            PRESS TO CONTINUE
          </button>
        </div>
      )}
    </div>
  )
}
