export const Footer = () => {
  return (
    <footer className="w-full py-16 bg-background border-t border-white/10">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-light text-white tracking-widest mb-4">
              MESH STUDIOS
            </h3>
            <p className="text-white/60 leading-relaxed mb-6 max-w-md">
              Crafting reality through art and technology. We create immersive experiences 
              that blur the lines between digital and physical worlds.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300">
                <span className="sr-only">Twitter</span>
                🐦
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300">
                <span className="sr-only">Instagram</span>
                📷
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300">
                <span className="sr-only">LinkedIn</span>
                💼
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300">
                <span className="sr-only">GitHub</span>
                👨‍💻
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-mono mb-6 tracking-wide">SERVICES</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Visual Excellence</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Immersive Audio</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Technical Innovation</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Custom Development</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-mono mb-6 tracking-wide">CONTACT</h4>
            <ul className="space-y-3">
              <li><a href="mailto:hello@meshstudios.com" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">hello@meshstudios.com</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Discord</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Schedule a Call</a></li>
              <li><a href="#" className="text-white/60 hover:text-white transition-colors duration-300 text-sm">Project Inquiry</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © 2024 Mesh Studios. All rights reserved.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-white/40 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}