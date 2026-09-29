import React from 'react';
import { ArrowLeftIcon } from './Icons';
import { Printer, PlayingCards } from 'lucide-react';

export default function GameRules({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="view-container game-rules-page" style={{ padding: '1rem', minHeight: '100vh', background: 'var(--bg-color)' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .game-rules-page { background: white !important; padding: 0 !important; }
          .rules-content { box-shadow: none !important; border: none !important; padding: 0 !important; }
          body { color: black !important; }
        }
      `}</style>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
        <button onClick={handlePrint} className="btn btn-gradient" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Printer size={18} /> Print Spelregels
        </button>
      </div>
      
      <div className="glass-panel rules-content" style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '3rem', 
        background: 'white', 
        borderRadius: '16px',
        color: '#222'
      }}>
        <h1 style={{ color: '#1e293b', marginBottom: '0.5rem', textAlign: 'center', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}><PlayingCards size={40} color="#10b981" /> Het Schema-Spel</h1>
        <h2 style={{ color: '#64748b', marginBottom: '3rem', textAlign: 'center', fontWeight: 'normal' }}>"Van Trigger tot Volwassene"</h2>
        
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#3b82f6', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Voorbereiding</h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
            Schud alle 42 kaarten en deel ze uit aan de spelers. Leg één startkaart open in het midden van de tafel (bij voorkeur een Schema of een Basisbehoefte).
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#ef4444', borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>De Regels</h3>
          
          <ul style={{ fontSize: '1.1rem', lineHeight: '1.8', listStyleType: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <strong style={{ minWidth: '150px', color: '#1e293b' }}>1. Matchen:</strong>
              <span>Je mag een kaart spelen als deze dezelfde <strong>Kleur</strong> (Domein) óf dezelfde <strong>Letter</strong> (Type: S, M, B of C) heeft als de bovenste kaart op de aflegstapel.</span>
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <strong style={{ minWidth: '150px', color: '#1e293b' }}>2. Modus-regel (Kleur veranderen):</strong>
              <span>Modi (M-kaarten) mag je inzetten als reactie op een Schema, zelfs als de kleur niet matcht. De Modus verandert dan de actieve kleur van het spel naar zijn eigen kleur! <em>Therapeutische twist: De speler moet kort benoemen hoe deze Modus in de praktijk zou reageren op dat specifieke Schema.</em></span>
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <strong style={{ minWidth: '150px', color: '#1e293b' }}>3. Terug naar de Kern:</strong>
              <span>Na een Modus of Schema mag je altijd terugspelen naar een Basisbehoefte (B-kaart), zolang de kleur matcht, om het onderliggende patroon weer te verhelderen.</span>
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <strong style={{ minWidth: '150px', color: '#1e293b' }}>4. De Actiekaarten:</strong>
              <span>De Categorie-kaarten (C-kaarten) kunnen worden ingezet als speciale actiekaarten (bijvoorbeeld 'beurt overslaan' bij Vermijding). Spreek de effecten hiervan vooraf met elkaar af.</span>
            </li>
            <li style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
              <strong style={{ minWidth: '150px', color: '#1e293b' }}>5. Het Einddoel:</strong>
              <span>Het spel is niet zomaar uit als je kaarten op zijn. Je kunt pas winnen (en uitgaan) als jouw allerlaatste kaart de groene <strong>'Gezonde Volwassene'</strong> is. Hiermee doorbreek je het patroon en sluit je het spel succesvol af!</span>
            </li>
          </ul>
        </div>
        
        <div style={{ marginTop: '3rem', padding: '1.5rem', background: '#f8fafc', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#475569', lineHeight: '1.6' }}>
            <strong>Let op:</strong> Dit spel is bedoeld als een speelse, interactieve manier om schema's, modi en basisbehoeften te verkennen en te bespreken. De nadruk ligt op de dialoog (het uitleggen van de verbindingen) in plaats van alleen het winnen.
          </p>
        </div>
      </div>
    </div>
  );
}
