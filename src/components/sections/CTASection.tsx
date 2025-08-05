export const CTASection = () => {
  return (
    <section className="w-full py-32 bg-background">
      <div className="max-w-4xl mx-auto px-8">
        {/* Main CTA Content */}
        <div className="text-center">
          <h2 className="text-5xl md:text-7xl font-light text-white tracking-widest mb-8">
            Ready to get in touch for<br />
            your new project?
          </h2>
          
          <div className="w-24 h-0.5 bg-white mx-auto mb-12"></div>
          
          <p className="text-xl text-white/70 mb-16 leading-relaxed max-w-2xl mx-auto">
            Let's create something extraordinary together. Whether it's immersive visuals, 
            spatial audio, or cutting-edge code - we're ready to bring your vision to life.
          </p>

          {/* Contact Button */}
          <div className="mb-16">
            <button className="group relative px-12 py-6 border-2 border-white text-white font-mono text-lg tracking-widest hover:bg-white hover:text-black transition-all duration-300 overflow-hidden">
              <span className="relative z-10">GET IN TOUCH</span>
              <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="text-2xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">📧</div>
              <h4 className="text-white font-mono mb-2 tracking-wide">EMAIL</h4>
              <p className="text-white/60 text-sm">hello@meshstudios.com</p>
            </div>
            
            <div className="group">
              <div className="text-2xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">💬</div>
              <h4 className="text-white font-mono mb-2 tracking-wide">DISCORD</h4>
              <p className="text-white/60 text-sm">MeshStudios#0001</p>
            </div>
            
            <div className="group">
              <div className="text-2xl mb-4 text-white/30 group-hover:text-white/60 transition-colors duration-300">📱</div>
              <h4 className="text-white font-mono mb-2 tracking-wide">SOCIAL</h4>
              <p className="text-white/60 text-sm">@meshstudios</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}