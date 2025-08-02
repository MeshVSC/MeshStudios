export const SoundSection = () => {
  return (
    <div className="theme-green relative w-full h-screen flex items-center justify-center">
      {/* Green accent background */}
      <div className="absolute inset-0 bg-gradient-to-tl from-cube-green/5 to-transparent" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h2 className="section-title mb-8">
          <span className="text-cube-green">AUDIO</span> SYNTHESIS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-8 bg-card border border-cube-green/20 hover:border-cube-green/40 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-cube-green">SPATIAL AUDIO</h3>
            <p className="code-text text-sm">
              3D positional sound<br/>
              Binaural processing<br/>
              Environmental acoustics<br/>
              Real-time audio rendering
            </p>
          </div>
          
          <div className="p-8 bg-card border border-cube-green/20 hover:border-cube-green/40 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-cube-green">PROCEDURAL MUSIC</h3>
            <p className="code-text text-sm">
              Algorithmic composition<br/>
              Adaptive soundscapes<br/>
              Interactive audio systems<br/>
              Generative sound design
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4 mb-8">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-cube-green animate-pulse"
              style={{
                height: `${Math.random() * 40 + 20}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>

        <div className="code-text text-cube-green/70">
          // Engineering immersive audio landscapes for next-generation experiences
        </div>
      </div>

      {/* Green corner accents */}
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-cube-green opacity-50" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-cube-green opacity-50" />
    </div>
  )
}