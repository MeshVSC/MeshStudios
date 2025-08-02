
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'
import * as THREE from 'three'

interface CubeFaceProps {
  position: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  opacity?: number
  children?: React.ReactNode
  isActive?: boolean
}

export const CubeFace = ({
  position,
  rotation = [0, 0, 0],
  color = "#ffffff",
  opacity = 0.1,
  isActive = false
}: CubeFaceProps) => {
  const meshRef = useRef<Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Subtle floating animation for active face
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.position.set(...position)
      meshRef.current.rotation.set(...rotation)
    }
  }, [position, rotation])

  return (
    <mesh 
      ref={meshRef}
      position={position}
      rotation={rotation}
    >
      <boxGeometry args={[2, 2, 0.1]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        roughness={0.1}
        metalness={0.8}
      />
    </mesh>
  )
}
