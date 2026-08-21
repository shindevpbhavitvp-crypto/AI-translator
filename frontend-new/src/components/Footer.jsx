import { ScanFace } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container footer-content">
        <div className="footer-brand">
          <a href="#" className="logo">
            <ScanFace className="logo-icon" size={24} />
            <span className="logo-text">AI Sign Language <span className="text-gradient">Translator</span></span>
          </a>
          <p className="footer-desc">AI Sign Language Translator</p>
          <span className="demo-badge">Frontend Demo Project</span>
        </div>
        
        <div className="footer-links">
          <div className="link-group">
            <a href="#home">Home</a>
            <a href="#translator">Translator</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} AI Sign Language Translator. Built for demonstration.</p>
          <p style={{ marginTop: '8px', color: 'var(--text-main)', fontSize: '0.95rem' }}>
            Created by Ayush Wadekar, Ganesh Patil, Ayush Bait, Vignesh Sawant & Bhavit Shinde
          </p>
        </div>
      </div>
    </footer>
  );
}
