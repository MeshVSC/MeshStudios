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
    <div className="theme-purple relative w-full h-screen flex items-center justify-center">
      {/* Purple accent background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cube-purple/5 to-transparent" />
      
      <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
        <h2 className="section-title mb-8">
          <span className="text-cube-purple">CODE</span> ARCHITECTURE
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Code Display */}
          <div className="bg-card border border-cube-purple/20 p-8 text-left">
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-cube-green" />
              </div>
              <span className="ml-4 text-sm text-muted-foreground">mesh-studios.js</span>
            </div>
            
            <pre className="code-text text-sm text-cube-purple overflow-hidden">
              <code>{codeSnippets[currentCode]}</code>
            </pre>
          </div>
          
          {/* Capabilities */}
          <div className="space-y-6">
            <div className="text-left">
              <h3 className="text-xl font-semibold mb-4 text-cube-purple">CORE TECHNOLOGIES</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="code-text">React Three Fiber</span>
                  <div className="w-32 h-1 bg-muted">
                    <div className="w-full h-full bg-cube-purple" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="code-text">GLSL Shaders</span>
                  <div className="w-32 h-1 bg-muted">
                    <div className="w-5/6 h-full bg-cube-purple" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="code-text">WebGL Optimization</span>
                  <div className="w-32 h-1 bg-muted">
                    <div className="w-4/5 h-full bg-cube-purple" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="code-text">Performance Analytics</span>
                  <div className="w-32 h-1 bg-muted">
                    <div className="w-11/12 h-full bg-cube-purple" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 code-text text-cube-purple/70">
          // Building the infrastructure for tomorrow's interactive experiences
        </div>
      </div>

      {/* Purple corner accents with diagonal emphasis */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cube-purple opacity-50" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cube-purple opacity-50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cube-purple opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cube-purple opacity-50" />
    </div>
  )
}