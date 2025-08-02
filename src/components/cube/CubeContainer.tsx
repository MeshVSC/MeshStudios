import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
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
        shadows
        className="absolute inset-0"
      >
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          
          {/* Ambient lighting for subtle illumination */}
          <ambientLight intensity={0.2} />
          
          {/* Directional light for definition */}
          <directionalLight
            position={[5, 5, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          
          {/* Accent lighting for depth */}
          <pointLight position={[-5, -5, -5]} intensity={0.3} color="#ffffff" />
          
          {children}
          
          {/* Controls disabled by default for presentation mode */}
          <OrbitControls 
            enabled={false}
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}