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
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
               backgroundSize: '50px 50px'
             }} 
        />
      </div>

      <div className="relative z-10 text-center">
        {/* Main Title */}
        <h1 className="mesh-title mb-8">
          MESH STUDIOS
        </h1>
        
        {/* Glitch Code Text */}
        <div className="h-8 flex items-center justify-center">
          {showGlitch && (
            <p className={`code-text text-lg transition-all duration-300 ${
              showGlitch ? 'animate-glitch' : 'opacity-0'
            }`}>
              {glitchTexts[currentGlitchText]}
            </p>
          )}
        </div>

        {/* Subtle instruction */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <p className="code-text text-sm opacity-50">
            SCROLL TO EXPLORE DIMENSIONS
          </p>
        </div>
      </div>

      {/* Corner accent lines */}
      <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-primary opacity-30" />
      <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-primary opacity-30" />
      <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-primary opacity-30" />
      <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-primary opacity-30" />
    </div>
  )
}