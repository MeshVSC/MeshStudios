import { useState, useEffect } from 'react'
import '../../styles/glitchEffects.css'

const glitchTexts = [
  "// INITIALIZING MESH PROTOCOLS...",
  "// SCANNING 3D GEOMETRIES...", 
  "// COMPILING VERTEX SHADERS...",
  "// OPTIMIZING RENDER PIPELINES...",
  "// CALCULATING LIGHT MATRICES...",
  "// MESHING REALITY STRUCTURES..."
]

export const HeroSection = () => {
  const [currentGlitchText, setCurrentGlitchText] = useState(0)
  const [showGlitch, setShowGlitch] = useState(true)
  const [showLogo, setShowLogo] = useState(false)
  const [logoSpinning, setLogoSpinning] = useState(true)
  const [meshText, setMeshText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  
  const fullMeshText = "MESH STUDIOS"

  // Glitch text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setShowGlitch(false)
      
      setTimeout(() => {
        setCurrentGlitchText((prev) => (prev + 1) % glitchTexts.length)
        setShowGlitch(true)
      }, 100)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  // Typing effect for MESH STUDIOS
  useEffect(() => {
    // Logo fade in after 2 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(true)
      
      // Start typing MESH STUDIOS after logo appears
      const typingTimer = setTimeout(() => {
        let index = 0
        const typingInterval = setInterval(() => {
          if (index < fullMeshText.length) {
            setMeshText(fullMeshText.slice(0, index + 1))
            index++
          } else {
            clearInterval(typingInterval)
            setIsTypingComplete(true)
            setLogoSpinning(false) // Stop logo spinning when typing complete
          }
        }, 150) // 150ms per character
      }, 500)
      
      return () => clearTimeout(typingTimer)
    }, 2000)

    return () => clearTimeout(logoTimer)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-background" />

      {/* Cube Logo - Fade in and stop spinning when typing complete */}
      <div className={`absolute inset-0 z-10 transition-opacity duration-1000 ${
        showLogo ? 'opacity-100' : 'opacity-0'
      }`}>
        <div className="cube-scene">
          {[1, 2, 3, 4, 5, 6].map(num => (
            <div key={num} className={`cube cube_count_${num} ${
              !logoSpinning ? 'animation-paused' : ''
            }`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center" style={{ marginTop: '200px' }}>
        {/* Main Title - Typing Effect */}
        <h1 className="text-6xl md:text-8xl font-light text-white tracking-wide mb-8 text-center">
          {meshText}
          {!isTypingComplete && (
            <span className="animate-pulse text-white/60">|</span>
          )}
        </h1>
        
        {/* Glitch Code Text Effect */}
        <div className="h-8 flex items-center justify-center">
          <p className={`text-lg text-white/60 font-mono transition-all duration-100 ${
            showGlitch ? 'opacity-100' : 'opacity-0'
          }`}>
            {glitchTexts[currentGlitchText]}
          </p>
        </div>
      </div>

      {/* Minimal instruction - positioned relative to viewport */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <p className="text-sm text-white/30 font-mono">
          SCROLL TO EXPLORE
        </p>
      </div>
    </div>
  )
}