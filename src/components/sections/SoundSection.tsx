export const SoundSection = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-background">
      <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
        <h2 className="text-5xl md:text-6xl font-light text-white tracking-widest mb-16">
          SOUND
        </h2>
        
        <div className="grid grid-cols-2 gap-16 mb-16">
          <div className="text-center">
            <h3 className="text-lg text-white/80 font-mono mb-4">SPATIAL AUDIO</h3>
            <div className="text-sm text-white/40 font-mono leading-relaxed">
              3D positional sound<br/>
              Binaural processing<br/>
              Environmental acoustics<br/>
              Real-time rendering
            </div>
          </div>
          
          <div className="text-center">
            <h3 className="text-lg text-white/80 font-mono mb-4">PROCEDURAL MUSIC</h3>
            <div className="text-sm text-white/40 font-mono leading-relaxed">
              Algorithmic composition<br/>
              Adaptive soundscapes<br/>
              Interactive audio<br/>
              Generative design
            </div>
          </div>
        </div>

        <div className="text-sm text-white/20 font-mono">
          // Engineering immersive audio landscapes for next-generation experiences
        </div>
      </div>
    </div>
  )
}