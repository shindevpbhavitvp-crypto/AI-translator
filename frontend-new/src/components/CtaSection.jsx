import { ArrowRight } from 'lucide-react';
import './CtaSection.css';

export default function CtaSection() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-box glass reveal-up active">
          <div className="cta-content">
            <h2>Communication Without <span className="text-gradient">Barriers.</span></h2>
            <p className="cta-subtitle">
              Technology that helps turn gestures into understandable communication.
            </p>
            <a href="#translator" className="btn btn-primary cta-btn">
              Try Translator <ArrowRight size={20} />
            </a>
          </div>
          
          <div className="cta-visual">
            <div className="abstract-ai-hand">
              <div className="hand-core"></div>
              <div className="ring r1"></div>
              <div className="ring r2"></div>
              <div className="ring r3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
