import React from 'react';
import { ArrowLeftIcon, PlayingCardsIcon, ScrollTextIcon, DicesIcon, LightbulbIcon, CardsIcon } from './Icons';
import { Printer } from 'lucide-react';

export default function GameRules({ onBack }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="view-container game-rules-page" style={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--bg-color)' }}>
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
      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <PlayingCardsIcon size={48} useGameGradient={true} /> Het Schema-Spel
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.5rem', lineHeight: '1.4' }}>Van Trigger tot Volwassene</h2>
      </div>

      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <button onClick={handlePrint} className="btn btn-gradient-game" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Printer size={18} /> Print Spelregels
        </button>
      </div>
      
      <div className="glass-panel rules-content" style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        padding: '3rem', 
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
      }}>

        
        <div style={{ marginBottom: '3rem', background: '#f8fafc', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', margin: '0 0 1.5rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <CardsIcon size={28} useGameGradient={true} /> Wat zit er in het spel?
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', marginBottom: '1.5rem' }}>
            Het spel bestaat uit theoriekaarten die allemaal een eigen <strong>Letter</strong> (het type) en <strong>Kleur</strong> (het domein of de categorie) hebben. Deze eigenschappen zijn belangrijk voor het matchen tijdens het spelen:
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* B: Basisbehoeften */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>B</div>
                Basisbehoeften
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>(5 stuks) Vormen de kern van de therapie. Ze delen hun kleur met de bijbehorende Schema Domeinen.</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></div>
              </div>
            </div>

            {/* S: Schema's */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>S</div>
                Schema-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>(18 stuks) Tonen de hardnekkige patronen. De kleur van de kaart geeft aan binnen welk <strong>Schema Domein</strong> de kaart valt.</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></div>
              </div>
            </div>
            
            {/* M: Modi */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>M</div>
                Modus-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>(14 stuks) Tonen actuele gemoedstoestanden. Gekleurd naar de specifieke <strong>Modus Categorie</strong> (bijv. Kindmodi of Copingmodi).</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></div>
              </div>
            </div>

            {/* C: Categorieën */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>C</div>
                Categorie-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}>(6 stuks) De Modi Categorieën (zoals Kindmodi, Oudermodi of specifieke Coping). Vaak gebruikt om overkoepelend te clusteren.</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></div>
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#0f172a', margin: 0, padding: '1.5rem', background: '#f1f5f9', borderRadius: '8px' }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.1rem' }}>
              <LightbulbIcon size={20} useGameGradient={true} /> Uitleg van de kleuren (de stippen):
            </strong>
            Elke kaart in het spel krijgt een kleur die verwijst naar een van de 5 vaste domeinen (bijvoorbeeld: <em>Verbondenheid en Afwijzing</em>). Een onvervulde basisbehoefte deelt zo exact dezelfde kleur als het schema dat eruit ontstaat, en de bijbehorende (coping)modus!<br /><br />
            Daarom kun je in het spel een S-kaart moeiteloos op een B-kaart leggen, mits ze <strong>dezelfde kleur</strong> (dus hetzelfde achterliggende thema) delen. Tijdens het spelen mag je overigens kaarten met dezelfde kleur óf dezelfde letter op elkaar leggen.
          </p>
        </div>
        
        <div style={{ marginBottom: '3rem', background: '#f8fafc', borderRadius: '16px', padding: '2rem', border: '1px solid #e2e8f0' }}>
          <h3 style={{ color: '#0f172a', margin: '0 0 1rem 0', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <DicesIcon size={24} useGameGradient={true} /> Voorbereiding
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', margin: 0 }}>
            Schud de stapel van 43 theoriekaarten (18 S, 14 M, 5 B, 6 C) en deel ze uit aan de spelers. Leg één startkaart open in het midden van de tafel (bij voorkeur een Schema of een Basisbehoefte).
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
              <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#eff6ff', borderRadius: '8px', color: '#1e3a8a', fontSize: '0.95rem', borderLeft: '4px solid #3b82f6' }}>
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
              <p className="rule-text">Het spel is niet zomaar uit als je kaarten op zijn. Je kunt pas winnen (en uitgaan) als jouw allerlaatste kaart de groene <strong>'Gezonde Volwassene'</strong> is. Dit mag zowel de Modus-kaart als de Categorie-kaart zijn. Hiermee doorbreek je het patroon en sluit je het spel succesvol af!</p>
              <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: '#eff6ff', borderRadius: '8px', color: '#1e3a8a', fontSize: '0.95rem', borderLeft: '4px solid #3b82f6' }}>
                <strong>Let op:</strong> Dit spel is bedoeld als een speelse, interactieve manier om schema's, modi en basisbehoeften te verkennen en te bespreken. De nadruk ligt op de <strong>dialoog</strong> (het uitleggen van de verbindingen) in plaats van alleen het winnen.
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
