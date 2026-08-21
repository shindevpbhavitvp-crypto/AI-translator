import { useState, useEffect } from 'react';
import { ScanFace } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container navbar-content">
        <a href="#" className="logo">
          <ScanFace className="logo-icon" size={28} />
          <span className="logo-text">AI Sign Language <span className="text-gradient">Translator</span></span>
        </a>

        <div className="nav-links">
          <a href="#home" className="nav-link">Home</a>
          <a href="#translator" className="nav-link">Translator</a>
          <a href="#how-it-works" className="nav-link">How It Works</a>
          <a href="#about" className="nav-link">About</a>
        </div>

        <button className="btn btn-primary nav-cta">Start Translating</button>
      </div>
    </nav>
  );
}
