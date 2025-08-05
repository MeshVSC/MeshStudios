import { useState } from 'react'

export const HeaderSection = () => {
  return (
    <section className="w-full py-24 bg-background">
      <div className="max-w-7xl mx-auto px-8">
        {/* Main Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-widest mb-8">
            Crafting Reality Through Art<br />
            and Technology
          </h2>
          <div className="w-24 h-0.5 bg-white mx-auto mb-8"></div>
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            We specialize in creating immersive experiences that blur the lines between 
            digital and physical reality through cutting-edge technology and artistic vision.
          </p>
        </div>

        {/* Services Grid */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-light text-white mb-16 tracking-wide">
            Crafting Digital Realities
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {/* Visual Services */}
          <div className="text-center group">
            <div className="w-full h-64 bg-white/5 border border-white/20 mb-6 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
              <div className="text-6xl text-white/30">👁</div>
            </div>
            <h4 className="text-xl font-medium text-white mb-4 tracking-wide">
              Visual Excellence
            </h4>
            <p className="text-white/60 leading-relaxed text-sm">
              Advanced 3D rendering, motion graphics, and immersive visual experiences 
              that captivate and engage your audience through cutting-edge technology.
            </p>
          </div>

          {/* Sound Services */}
          <div className="text-center group">
            <div className="w-full h-64 bg-white/5 border border-white/20 mb-6 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
              <div className="text-6xl text-white/30">🎵</div>
            </div>
            <h4 className="text-xl font-medium text-white mb-4 tracking-wide">
              Immersive Audio
            </h4>
            <p className="text-white/60 leading-relaxed text-sm">
              Spatial audio design, interactive soundscapes, and dynamic audio systems 
              that create emotional depth and enhance user engagement.
            </p>
          </div>

          {/* Code Services */}
          <div className="text-center group">
            <div className="w-full h-64 bg-white/5 border border-white/20 mb-6 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
              <div className="text-6xl text-white/30">⟨/⟩</div>
            </div>
            <h4 className="text-xl font-medium text-white mb-4 tracking-wide">
              Technical Innovation
            </h4>
            <p className="text-white/60 leading-relaxed text-sm">
              Custom development solutions, interactive applications, and robust 
              technical infrastructure that brings creative visions to life.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}