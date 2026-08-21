import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Translator from './components/Translator';
import SignSelector from './components/SignSelector';
import HowItWorks from './components/HowItWorks';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import ScrollSequence from './components/ScrollSequence';

function App() {
  const [selectedSign, setSelectedSign] = useState(null);

  useEffect(() => {
    // Intersection Observer for scroll reveal animations
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Slight delay to allow DOM to render before attaching observers
    setTimeout(() => {
      document.querySelectorAll('.reveal-up').forEach(element => {
        // Remove active class initially for scroll items (except those already marked active like Hero)
        if (!element.closest('#home')) {
          element.classList.remove('active');
          observer.observe(element);
        }
      });
    }, 100);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollSequence />
      
      <Navbar />
      
      <main>
        <HeroSection />
        
        <Translator selectedSign={selectedSign} />
        
        <SignSelector 
          selectedSign={selectedSign} 
          onSelectSign={setSelectedSign} 
        />
        
        <HowItWorks />
        
        <CtaSection />
      </main>
      
      <Footer />
    </>
  );
}

export default App;
