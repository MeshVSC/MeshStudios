import { useState, useEffect, useCallback } from 'react'
import { CubeContainer } from '@/components/cube/CubeContainer'
import { CubeFace } from '@/components/cube/CubeFace'
import { TransitionController } from '@/components/cube/TransitionController'
import { HeroSection } from '@/components/sections/HeroSection'
import { VisualsSection } from '@/components/sections/VisualsSection'
import { SoundSection } from '@/components/sections/SoundSection'
import { CodeSection } from '@/components/sections/CodeSection'

const sections = [
  { id: 0, name: 'hero', component: HeroSection },
  { id: 1, name: 'visuals', component: VisualsSection, color: '#3b82f6' },
  { id: 2, name: 'sound', component: SoundSection, color: '#10b981' },
  { id: 3, name: 'code', component: CodeSection, color: '#8b5cf6' }
]

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  const handleScroll = useCallback((e: WheelEvent) => {
    e.preventDefault()
    
    if (isTransitioning) return

    const direction = e.deltaY > 0 ? 1 : -1
    const nextSection = Math.max(0, Math.min(sections.length - 1, currentSection + direction))
    
    if (nextSection !== currentSection) {
      setIsTransitioning(true)
      setCurrentSection(nextSection)
      
      // Reset transition state after animation completes
      setTimeout(() => {
        setIsTransitioning(false)
      }, 1200)
    }
  }, [currentSection, isTransitioning])

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false })
    
    return () => {
      window.removeEventListener('wheel', handleScroll)
    }
  }, [handleScroll])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        const nextSection = Math.min(sections.length - 1, currentSection + 1)
        if (nextSection !== currentSection) {
          setIsTransitioning(true)
          setCurrentSection(nextSection)
          setTimeout(() => setIsTransitioning(false), 1200)
        }
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        const prevSection = Math.max(0, currentSection - 1)
        if (prevSection !== currentSection) {
          setIsTransitioning(true)
          setCurrentSection(prevSection)
          setTimeout(() => setIsTransitioning(false), 1200)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentSection, isTransitioning])

  const CurrentSectionComponent = sections[currentSection].component

  // Debug logging
  console.log('Current section:', currentSection, 'Component:', CurrentSectionComponent.name)

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background">
      {/* 3D Background Cube System */}
      <CubeContainer className="absolute inset-0 pointer-events-none">
        <TransitionController 
          currentSection={currentSection} 
          isTransitioning={isTransitioning}
        >
          {sections.map((section, index) => (
            <CubeFace
              key={section.id}
              position={[0, 0, index === 0 ? 0 : -2]}
              color={section.color || "#ffffff"}
              opacity={index === currentSection ? 0.3 : 0.1}
              isActive={index === currentSection}
            />
          ))}
        </TransitionController>
      </CubeContainer>

      {/* 2D Content Layer - with transition effects */}
      <div className={`absolute inset-0 z-10 w-full h-full transition-all duration-1000 ${
        isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}>
        <CurrentSectionComponent />
      </div>

      {/* Debug info */}
      <div className="fixed top-4 left-4 z-50 bg-black/50 text-white p-2 rounded">
        Section: {currentSection} ({sections[currentSection].name})
        {isTransitioning && ' - Transitioning'}
      </div>

      {/* Section Navigation Indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => {
                if (!isTransitioning && index !== currentSection) {
                  setIsTransitioning(true)
                  setCurrentSection(index)
                  setTimeout(() => setIsTransitioning(false), 1200)
                }
              }}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                index === currentSection
                  ? 'bg-primary border-primary scale-125'
                  : 'bg-transparent border-primary/30 hover:border-primary/60'
              }`}
              aria-label={`Go to ${section.name} section`}
            />
          ))}
        </div>
      </div>

      {/* Section Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-30 pointer-events-none">
          <div className="absolute inset-0 bg-background/20 backdrop-blur-sm" />
        </div>
      )}
    </div>
  );
};

export default Index;
