import { Hand } from 'lucide-react';
import './SignSelector.css';

const SIGNS = ['HELLO', 'THANK YOU', 'YES', 'NO', 'HELP'];

export default function SignSelector({ selectedSign, onSelectSign }) {
  return (
    <section className="sign-selector-section">
      <div className="container">
        <div className="selector-header reveal-up active">
          <h3>Try Different Signs</h3>
          <p>Select a card below to simulate AI recognition</p>
        </div>

        <div className="signs-grid reveal-up active" style={{ transitionDelay: '0.2s' }}>
          {SIGNS.map((sign) => (
            <button
              key={sign}
              className={`sign-card ${selectedSign === sign ? 'active' : ''}`}
              onClick={() => onSelectSign(sign)}
            >
              <div className="card-icon">
                <Hand size={24} />
              </div>
              <span className="card-text">{sign}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
