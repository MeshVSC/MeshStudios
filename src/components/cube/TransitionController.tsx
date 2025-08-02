import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Group } from 'three'
import gsap from 'gsap'

interface TransitionControllerProps {
  children: React.ReactNode
  currentSection: number
  isTransitioning: boolean
}

export const TransitionController = ({ 
  children, 
  currentSection, 
  isTransitioning 
}: TransitionControllerProps) => {
  const groupRef = useRef<Group>(null!)
  
  useEffect(() => {
    if (!groupRef.current || !isTransitioning) return
    
    const tl = gsap.timeline()
    
    // Different rotation patterns for different section transitions
    switch (currentSection) {
      case 0: // Hero to Visuals (blue)
        tl.to(groupRef.current.rotation, {
          y: Math.PI / 2,
          duration: 1,
          ease: "power2.inOut"
        })
        break
      case 1: // Visuals to Sound (green) 
        tl.to(groupRef.current.rotation, {
          x: -Math.PI / 2,
          duration: 1,
          ease: "power2.inOut"
        })
        break
      case 2: // Sound to Code (purple)
        tl.to(groupRef.current.rotation, {
          x: Math.PI / 4,
          y: Math.PI / 4,
          duration: 1.2,
          ease: "power2.inOut"
        })
        break
      default:
        tl.to(groupRef.current.rotation, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "power2.inOut"
        })
    }
    
    return () => {
      tl.kill()
    }
  }, [currentSection, isTransitioning])
  
  return (
    <group ref={groupRef}>
      {children}
    </group>
  )
}