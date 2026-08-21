import { useState, useEffect } from 'react';
import { Volume2, Loader, Camera, Activity } from 'lucide-react';
import './Translator.css';

export default function Translator({ selectedSign }) {
  const [processingState, setProcessingState] = useState('scanning'); // scanning, processing, recognized
  const [displayedSign, setDisplayedSign] = useState('');
  const [playingSpeech, setPlayingSpeech] = useState(false);

  // Effect to handle state changes when a new sign is selected
  useEffect(() => {
    if (!selectedSign) return;
    
    setProcessingState('scanning');
    setDisplayedSign('');
    
    const processingTimer = setTimeout(() => {
      setProcessingState('processing');
    }, 1000);
    
    const recognizeTimer = setTimeout(() => {
      setProcessingState('recognized');
      setDisplayedSign(selectedSign);
    }, 2500);
    
    return () => {
      clearTimeout(processingTimer);
      clearTimeout(recognizeTimer);
    };
  }, [selectedSign]);

  const handlePlaySpeech = () => {
    if (processingState !== 'recognized' || !displayedSign) return;
    
    setPlayingSpeech(true);
    setTimeout(() => {
      setPlayingSpeech(false);
    }, 3000);
  };

  return (
    <section id="translator" className="translator-section">
      <div className="container">
        <div className="section-header reveal-up active">
          <h2>Live <span className="text-gradient">Translation</span></h2>
          <p>Real-time visual processing simulation</p>
        </div>

        <div className="translator-interface glass reveal-up active">
          <div className="camera-header">
            <div className="live-indicator">
              <span className="dot pulse"></span> LIVE CAMERA
            </div>
            <div className="status-indicator">
              {processingState === 'scanning' && <><Camera size={16} /> Scanning...</>}
              {processingState === 'processing' && <><Loader size={16} className="spin" /> AI Processing</>}
              {processingState === 'recognized' && <><Activity size={16} /> Recognized</>}
            </div>
          </div>

          <div className="camera-view">
            {/* The detection box with corner brackets */}
            <div className={`detection-box ${processingState}`}>
              <div className="bracket tl"></div>
              <div className="bracket tr"></div>
              <div className="bracket bl"></div>
              <div className="bracket br"></div>
              
              {/* Abstract Hand Silhouette or Graphic */}
              <div className="hand-silhouette">
                <svg viewBox="0 0 100 100" className="hand-svg">
                  <path d="M50 80 C 40 80, 30 70, 30 50 C 30 40, 20 20, 25 15 C 30 10, 35 30, 40 40 C 40 30, 40 10, 45 5 C 50 0, 55 10, 55 30 C 55 20, 60 5, 65 10 C 70 15, 65 35, 65 45 C 70 30, 75 25, 80 30 C 85 35, 75 55, 75 60 C 75 75, 65 80, 50 80 Z" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" />
                </svg>
              </div>

              {processingState === 'scanning' && <div className="scan-laser"></div>}
            </div>
          </div>

          <div className="translator-footer">
            <div className="detected-result">
              <span className="label">Detected Sign</span>
              <div className="result-text">
                {displayedSign ? (
                  <span className="reveal-text">{displayedSign}</span>
                ) : (
                  <span className="placeholder-text">Awaiting gesture...</span>
                )}
              </div>
            </div>

            <button 
              className={`btn btn-primary btn-speech ${playingSpeech ? 'playing' : ''}`}
              onClick={handlePlaySpeech}
              disabled={processingState !== 'recognized' || !displayedSign}
            >
              <Volume2 size={20} /> Play Speech
            </button>
          </div>

          {/* Audio Waveform Animation */}
          <div className={`waveform-container ${playingSpeech ? 'visible' : ''}`}>
            <div className="bar b1"></div>
            <div className="bar b2"></div>
            <div className="bar b3"></div>
            <div className="bar b4"></div>
            <div className="bar b5"></div>
            <div className="bar b6"></div>
            <div className="bar b7"></div>
          </div>
        </div>

        {/* Process Indicator */}
        <div className="process-indicator reveal-up active">
          <div className={`step ${processingState === 'scanning' ? 'active' : ''} ${processingState !== 'scanning' ? 'completed' : ''}`}>
            <div className="step-dot"></div>
            <span>Hand Detected</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${processingState === 'processing' ? 'active' : ''} ${processingState === 'recognized' ? 'completed' : ''}`}>
            <div className="step-dot"></div>
            <span>AI Processing</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${processingState === 'recognized' ? 'active' : ''}`}>
            <div className="step-dot"></div>
            <span>Recognized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
