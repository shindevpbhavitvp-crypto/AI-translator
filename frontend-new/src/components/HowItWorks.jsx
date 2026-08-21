import { Camera, Cpu, Type, Volume2 } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    id: '01',
    title: 'Capture',
    description: 'Camera captures the hand gesture in real-time.',
    icon: Camera,
  },
  {
    id: '02',
    title: 'Detect',
    description: 'Computer vision identifies the hand movement.',
    icon: Cpu,
  },
  {
    id: '03',
    title: 'Translate',
    description: 'The detected gesture is converted into text.',
    icon: Type,
  },
  {
    id: '04',
    title: 'Speak',
    description: 'The translated text is converted into audible speech.',
    icon: Volume2,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header reveal-up active">
          <h2>How It <span className="text-gradient">Works</span></h2>
          <p>The magic behind the translation process</p>
        </div>

        <div className="steps-grid">
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className="step-card glass reveal-up active"
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-icon-wrapper">
                <step.icon className="step-icon" size={32} />
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
