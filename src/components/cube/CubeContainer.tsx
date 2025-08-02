
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'

interface CubeContainerProps {
  children: React.ReactNode
  className?: string
}

export const CubeContainer = ({ children, className = "" }: CubeContainerProps) => {
  return (
    <div className={`relative w-full h-screen ${className}`}>
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 75 }}
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          {/* Ambient lighting for subtle illumination */}
          <ambientLight intensity={0.2} />
          
          {/* Directional light for definition */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
          />
          
          {/* Accent lighting for depth */}
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
          
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}
