import { Play, Info } from 'lucide-react';
import './HeroSection.css';

export default function HeroSection() {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-content">
        <div className="hero-text reveal-up active">
          <h1>
            Turn Hand Signs Into <span className="text-gradient">Words.</span>
          </h1>
          <p className="hero-subtitle">
            Real-time sign language recognition powered by computer vision.
          </p>
          <div className="hero-buttons">
            <a href="#translator" className="btn btn-primary">
              <Play size={20} /> Start Demo
            </a>
            <a href="#how-it-works" className="btn btn-secondary">
              <Info size={20} /> How It Works
            </a>
          </div>
        </div>

        <div className="hero-visual reveal-up active" style={{ transitionDelay: '0.2s' }}>
          <div className="scanner-container">
            {/* Visual representation of hand scan */}
            <div className="hand-wireframe">
              <div className="node n1"></div>
              <div className="node n2"></div>
              <div className="node n3"></div>
              <div className="node n4"></div>
              <div className="node n5"></div>
              <div className="connection c1"></div>
              <div className="connection c2"></div>
              <div className="connection c3"></div>
              <div className="connection c4"></div>
            </div>
            
            <div className="scanner-line"></div>
            
            <div className="floating-particles">
              <div className="particle p1"></div>
              <div className="particle p2"></div>
              <div className="particle p3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
