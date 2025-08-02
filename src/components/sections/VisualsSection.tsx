export const VisualsSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background">
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h2 className="text-5xl md:text-6xl font-light text-white tracking-widest mb-16">
          VISUALS
        </h2>
        
        <div className="grid grid-cols-3 gap-12 mb-16">
          <div className="text-center">
            <h3 className="text-lg text-white/80 font-mono mb-4">3D RENDERING</h3>
            <div className="text-sm text-white/40 font-mono leading-relaxed">
              Real-time graphics<br/>
              WebGL optimization<br/>
              Shader programming
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg text-white/80 font-mono mb-4">UI/UX DESIGN</h3>
            <div className="text-sm text-white/40 font-mono leading-relaxed">
              Minimal interfaces<br/>
              User flows<br/>
              Interaction patterns
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg text-white/80 font-mono mb-4">VISUAL EFFECTS</h3>
            <div className="text-sm text-white/40 font-mono leading-relaxed">
              Particle systems<br/>
              Post-processing<br/>
              Animation frameworks
            </div>
          </div>
        </div>

        <div className="text-sm text-white/20 font-mono">
          // Visual experiences bridging digital and physical reality
        </div>
      </div>
    </div>
  )
}