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
  const [glitchDisplayText, setGlitchDisplayText] = useState('')
  const [showLogo, setShowLogo] = useState(false)
  const [logoSpinning, setLogoSpinning] = useState(true)
  const [meshText, setMeshText] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)
  const [glitchTypingComplete, setGlitchTypingComplete] = useState(false)
  
  const fullMeshText = "MESHSTUDIOS"

  // Glitch text animation - type first sentence only, then fade cycle
  useEffect(() => {
    const firstSentence = glitchTexts[0]
    let charIndex = 0
    setGlitchDisplayText('')

    const timeouts: Array<ReturnType<typeof setTimeout>> = []
    const intervals: Array<ReturnType<typeof setInterval>> = []

    const scheduleTimeout = (fn: () => void, delayMs: number) => {
      const id = setTimeout(fn, delayMs)
      timeouts.push(id)
      return id
    }

    const scheduleInterval = (fn: () => void, intervalMs: number) => {
      const id = setInterval(fn, intervalMs)
      intervals.push(id)
      return id
    }

    const startFadeCycling = () => {
      scheduleInterval(() => {
        setGlitchDisplayText('')
        scheduleTimeout(() => {
          setCurrentGlitchText(prev => {
            const nextIndex = (prev + 1) % glitchTexts.length
            setGlitchDisplayText(glitchTexts[nextIndex])
            return nextIndex
          })
        }, 100)
      }, 3000)
    }

    const showRemainingSentences = () => {
      let sentenceIndex = 1
      const showNextSentence = () => {
        if (sentenceIndex < 3) {
          setGlitchDisplayText('')
          scheduleTimeout(() => {
            setGlitchDisplayText(glitchTexts[sentenceIndex])
            sentenceIndex++
            scheduleTimeout(showNextSentence, 3000)
          }, 100)
        } else {
          setGlitchTypingComplete(true)
          setShowLogo(true)
          startFadeCycling()
        }
      }
      showNextSentence()
    }

    const typingInterval = setInterval(() => {
      if (charIndex < firstSentence.length) {
        setGlitchDisplayText(firstSentence.slice(0, charIndex + 1))
        charIndex++
      } else {
        clearInterval(typingInterval)
        scheduleTimeout(showRemainingSentences, 2000)
      }
    }, 50)
    intervals.push(typingInterval)

    return () => {
      intervals.forEach(clearInterval)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  // Logo and text timing - triggered when logo becomes visible
  useEffect(() => {
    if (!showLogo) return
    
    // Stop cube after 2 full rotations, then start typing
    const stopCubeTimer = setTimeout(() => {
      setLogoSpinning(false) // Stop logo spinning first
      
      // Start typing MESHSTUDIO after cube stops
      const typingTimer = setTimeout(() => {
        let index = 0
        const typingInterval = setInterval(() => {
          if (index < fullMeshText.length) {
            setMeshText(fullMeshText.slice(0, index + 1))
            index++
          } else {
            clearInterval(typingInterval)
            setIsTypingComplete(true)
          }
        }, 150) // 150ms per character
      }, 300) // Small delay after cube stops
      
      return () => clearTimeout(typingTimer)
    }, 4000) // 4 seconds for 2 full rotations (2s per rotation)
    
    return () => clearTimeout(stopCubeTimer)
  }, [showLogo])

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background">
      {/* Clean minimal background */}
      <div className="absolute inset-0 bg-background" />

      {/* Main content container with proper centering */}
      <div className="relative z-20 flex flex-col items-center justify-center">
        {/* Cube Logo - Positioned above and centered */}
        <div className={`transition-opacity duration-1000 mb-16 ${
          showLogo ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="scene relative w-[200px] h-[250px]">
            <div className={`cube cube_count_1 ${!logoSpinning ? 'cube-stopped' : ''}`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
            <div className={`cube cube_count_2 ${!logoSpinning ? 'cube-stopped' : ''}`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
            <div className={`cube cube_count_3 ${!logoSpinning ? 'cube-stopped' : ''}`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
            <div className={`cube cube_count_4 ${!logoSpinning ? 'cube-stopped' : ''}`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
            <div className={`cube cube_count_5 ${!logoSpinning ? 'cube-stopped' : ''}`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
            <div className={`cube cube_count_6 ${!logoSpinning ? 'cube-stopped' : ''}`}>
              <div className="cube__face cube__face--front"></div>
              <div className="cube__face cube__face--back"></div>
              <div className="cube__face cube__face--right"></div>
              <div className="cube__face cube__face--left"></div>
              <div className="cube__face cube__face--top"></div>
              <div className="cube__face cube__face--bottom"></div>
            </div>
          </div>
        </div>
        
        {/* MESHSTUDIO Text - Positioned below the cube */}
        {/* Main Title - Typing Effect */}
        <h1 className="text-6xl md:text-8xl font-light text-white tracking-wide mb-8 text-center">
          {meshText}
        </h1>
        
        {/* Glitch Code Text Effect */}
        <div className="h-8 flex items-center justify-center">
          <p className="text-lg text-white/60 font-mono">
            {glitchDisplayText}
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
