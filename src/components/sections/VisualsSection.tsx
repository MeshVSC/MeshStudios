export const VisualsSection = () => {
  return (
    <div className="theme-blue relative w-full h-screen flex items-center justify-center">
      {/* Blue accent background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cube-blue/5 to-transparent" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h2 className="section-title mb-8">
          <span className="text-cube-blue">VISUAL</span> SYSTEMS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="p-6 bg-card border border-cube-blue/20 hover:border-cube-blue/40 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-cube-blue">3D RENDERING</h3>
            <p className="code-text text-sm">
              Advanced real-time graphics<br/>
              WebGL optimization<br/>
              Shader programming
            </p>
          </div>
          
          <div className="p-6 bg-card border border-cube-blue/20 hover:border-cube-blue/40 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-cube-blue">UI/UX DESIGN</h3>
            <p className="code-text text-sm">
              Minimal interface design<br/>
              User experience flow<br/>
              Interaction patterns
            </p>
          </div>
          
          <div className="p-6 bg-card border border-cube-blue/20 hover:border-cube-blue/40 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-cube-blue">VISUAL EFFECTS</h3>
            <p className="code-text text-sm">
              Particle systems<br/>
              Post-processing<br/>
              Animation frameworks
            </p>
          </div>
        </div>

        <div className="code-text text-cube-blue/70">
          // Crafting visual experiences that bridge digital and physical reality
        </div>
      </div>

      {/* Blue corner accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-cube-blue opacity-50" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-cube-blue opacity-50" />
    </div>
  )
}