import { useState, useEffect } from 'react'

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

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-background" />

      <div className="relative z-10 text-center">
        {/* Main Title - Pure White */}
        <h1 className="text-6xl md:text-8xl font-light text-white tracking-widest mb-8">
          MESH STUDIOS
        </h1>
        
        {/* Glitch Code Text Effect */}
        <div className="h-8 flex items-center justify-center">
          <p className={`text-lg text-white/60 font-mono transition-all duration-100 ${
            showGlitch ? 'opacity-100' : 'opacity-0'
          }`}>
            {glitchTexts[currentGlitchText]}
          </p>
        </div>

        {/* Minimal instruction */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <p className="text-sm text-white/30 font-mono">
            SCROLL TO EXPLORE
          </p>
        </div>
      </div>
    </div>
  )
}