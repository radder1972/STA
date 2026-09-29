import React from 'react';
import { ArrowLeftIcon, PlayingCardsIcon, ScrollTextIcon, DicesIcon, LightbulbIcon, CardsIcon } from './Icons';
import { Printer } from 'lucide-react';

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
          .rule-box { border: none !important; box-shadow: none !important; background: white !important; padding: 1rem 0 !important; }
          body { color: black !important; }
        }
        
        .rule-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .rule-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .rule-number {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #64748b 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          font-weight: bold;
          font-size: 1.25rem;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }

        .rule-title {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .rule-text {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }
        
        @media (max-width: 600px) {
          .rule-box {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
        <button onClick={handlePrint} className="btn btn-gradient-game" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Printer size={18} /> Print Spelregels
        </button>
      </div>
      
      <div className="glass-panel rules-content" style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        padding: '3rem', 
        background: 'white', 
        borderRadius: '24px',
        color: '#222',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
            <PlayingCardsIcon size={48} useGameGradient={true} /> Het Schema-Spel
          </h1>
          <h2 style={{ color: '#64748b', margin: 0, fontWeight: '500', fontSize: '1.5rem' }}>Van Trigger tot Volwassene</h2>
        </div>
        
        <div style={{ marginBottom: '3rem', background: '#f8fafc', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', margin: '0 0 1.5rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CardsIcon size={28} useGameGradient={true} /> Wat zit er in het spel?
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', marginBottom: '1.5rem' }}>
            Het spel bestaat uit theoriekaarten die allemaal een eigen <strong>Letter</strong> (het type) en <strong>Kleur</strong> (het domein of de categorie) hebben. Deze eigenschappen zijn belangrijk voor het matchen tijdens het spelen:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#ef4444', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>S</div>
                Schema-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>Gekleurd naar hun bijbehorende Schema Domein. Ze tonen de hardnekkige patronen.</div>
            </div>
            
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#3b82f6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>M</div>
                Modus-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>Gekleurd naar de Modus Categorie (bijv. Kindmodi, Oudermodi). Tonen actuele gemoedstoestanden.</div>
            </div>

            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#10b981', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>B</div>
                Basisbehoeften
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>Vormen de kern van de therapie. Het doel is vaak om terug te werken naar een vervulde basisbehoefte.</div>
            </div>
            
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#f59e0b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>C</div>
                Coping-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>Laten zien op welke manieren cliënten (onbewust) met hun schema's proberen om te gaan.</div>
            </div>
          </div>
          
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#0f172a', margin: 0, padding: '1rem', background: '#f1f5f9', borderRadius: '8px' }}>
            <strong>💡 Kleur bekennen:</strong> Kleuren zijn essentieel in dit spel. Ze helpen je in één oogopslag te zien in welk "Domein" je zit. Tijdens het spelen is een veelgebruikte regel dat je kaarten met <strong>dezelfde kleur</strong> óf <strong>dezelfde letter</strong> op elkaar mag leggen!
          </p>
        </div>
        
        <div style={{ marginBottom: '3rem', background: '#f8fafc', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DicesIcon size={24} useGameGradient={true} /> Voorbereiding
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', margin: 0 }}>
            Schud alle 42 kaarten en deel ze uit aan de spelers. Leg één startkaart open in het midden van de tafel (bij voorkeur een Schema of een Basisbehoefte).
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: '#0f172a', margin: '0 0 2rem 0', fontSize: '1.75rem', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
            <ScrollTextIcon size={28} useGameGradient={true} /> De Regels
          </h3>
          
          <div className="rule-box">
            <div className="rule-number">1</div>
            <div>
              <h4 className="rule-title">Matchen</h4>
              <p className="rule-text">Je mag een kaart spelen als deze dezelfde <strong>Kleur</strong> (Domein) óf dezelfde <strong>Letter</strong> (Type: S, M, B of C) heeft als de bovenste kaart op de aflegstapel.</p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">2</div>
            <div>
              <h4 className="rule-title">Modus-regel (Kleur veranderen)</h4>
              <p className="rule-text">Modi (M-kaarten) mag je inzetten als reactie op een Schema, zelfs als de kleur niet matcht. De Modus verandert dan de actieve kleur van het spel naar zijn eigen kleur!</p>
              <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#fef3c7', borderRadius: '8px', color: '#92400e', fontSize: '0.95rem', borderLeft: '4px solid #f59e0b' }}>
                <strong>Therapeutische twist:</strong> De speler moet kort benoemen hoe deze Modus in de praktijk zou reageren op dat specifieke Schema.
              </div>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">3</div>
            <div>
              <h4 className="rule-title">Terug naar de Kern</h4>
              <p className="rule-text">Na een Modus of Schema mag je altijd terugspelen naar een Basisbehoefte (B-kaart), zolang de kleur matcht, om het onderliggende patroon weer te verhelderen.</p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">4</div>
            <div>
              <h4 className="rule-title">De Actiekaarten</h4>
              <p className="rule-text">De Categorie-kaarten (C-kaarten) kunnen worden ingezet als speciale actiekaarten (bijvoorbeeld 'beurt overslaan' bij Vermijding). Spreek de effecten hiervan vooraf met elkaar af.</p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">5</div>
            <div>
              <h4 className="rule-title">Het Einddoel</h4>
              <p className="rule-text">Het spel is niet zomaar uit als je kaarten op zijn. Je kunt pas winnen (en uitgaan) als jouw allerlaatste kaart de groene <strong>'Gezonde Volwassene'</strong> is. Hiermee doorbreek je het patroon en sluit je het spel succesvol af!</p>
            </div>
          </div>

        </div>
        
        <div style={{ marginTop: '4rem', padding: '2rem', background: '#ecfdf5', borderRadius: '16px', borderLeft: '6px solid #10b981', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <LightbulbIcon size={32} useGameGradient={true} />
          </div>
          <p style={{ margin: 0, fontStyle: 'italic', color: '#065f46', lineHeight: '1.7', fontSize: '1.1rem' }}>
            <strong>Let op:</strong> Dit spel is bedoeld als een speelse, interactieve manier om schema's, modi en basisbehoeften te verkennen en te bespreken. De nadruk ligt op de <strong>dialoog</strong> (het uitleggen van de verbindingen) in plaats van alleen het winnen.
          </p>
        </div>
      </div>
    </div>
  );
}
