import { useState } from 'react'
import { IntroSequence } from '@/components/IntroSequence'
import { HeroSection } from '@/components/sections/HeroSection'
import { HeaderSection } from '@/components/sections/HeaderSection'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'

const Index = () => {
  const [showIntro, setShowIntro] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  return (
    <div className="relative w-full min-h-screen bg-background">
      {/* Intro Sequence */}
      {showIntro && <IntroSequence onComplete={handleIntroComplete} />}
      
      {/* Main Website Content - Normal Scrolling */}
      {!showIntro && (
        <div className="w-full">
          {/* Hero Section - Full Screen */}
          <section className="h-screen">
            <HeroSection />
          </section>
          
          {/* Header Section - Services */}
          <section>
            <HeaderSection />
          </section>
          
          {/* CTA Section - Contact */}
          <section>
            <CTASection />
          </section>
          
          {/* Footer */}
          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
