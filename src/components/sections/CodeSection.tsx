import { useState, useEffect } from 'react'

const codeSnippets = [
  `function renderMesh(geometry, material) {
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
}`,
  `class CubeSystem {
  constructor() {
    this.faces = [];
    this.transitions = new Map();
  }
}`,
  `const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader: vertexCode,
  fragmentShader: fragmentCode,
  uniforms: { time: { value: 0 } }
});`
]

export const CodeSection = () => {
  const [currentCode, setCurrentCode] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCode((prev) => (prev + 1) % codeSnippets.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background">
      <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
        <h2 className="text-5xl md:text-6xl font-light text-white tracking-widest mb-16">
          CODE
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Code Display */}
          <div className="bg-black/20 border border-white/10 p-8 text-left rounded-none">
            <div className="flex items-center mb-6">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
                <div className="w-3 h-3 rounded-full bg-white/20" />
              </div>
              <span className="ml-4 text-sm text-white/40 font-mono">mesh-studios.js</span>
            </div>
            
            <pre className="text-sm text-white/80 font-mono overflow-hidden">
              <code>{codeSnippets[currentCode]}</code>
            </pre>
          </div>
          
          {/* Technologies */}
          <div className="space-y-8">
            <div className="text-left space-y-4">
              <div className="text-lg text-white/80 font-mono">CORE TECHNOLOGIES</div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-mono">React Three Fiber</span>
                  <div className="w-32 h-px bg-white/20">
                    <div className="w-full h-full bg-white/60" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-mono">GLSL Shaders</span>
                  <div className="w-32 h-px bg-white/20">
                    <div className="w-5/6 h-full bg-white/60" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-mono">WebGL Optimization</span>
                  <div className="w-32 h-px bg-white/20">
                    <div className="w-4/5 h-full bg-white/60" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 font-mono">Performance Analytics</span>
                  <div className="w-32 h-px bg-white/20">
                    <div className="w-11/12 h-full bg-white/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-sm text-white/20 font-mono">
          // Building infrastructure for tomorrow's interactive experiences
        </div>
      </div>
    </div>
  )
}