import React, { useEffect } from 'react';
import { FileTextIcon, PrinterIcon, CardsIcon, ShoppingCartIcon, InfoIcon } from './Icons';
import { Sparkles } from 'lucide-react';

export default function GamePortal({ onViewKaartenOverzicht, onViewGameRules, onViewPrintShop, onViewOrderCards, onViewAbout }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>

      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <CardsIcon size={40} useGameGradient={true} /> Schematherapie Kaarten
        </h1>
        <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>
          Verken alle theoriekaarten, werkvormen en printopties
        </h2>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Optie 1: De Theoriekaarten */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', position: 'relative' }}>
          
          {/* Ronde sticker: VSt 2021 Uitbreidingsset (half over de box) */}
          <div 
            style={{
              position: 'absolute',
              top: '-20px',
              right: '-16px',
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              boxShadow: '0 8px 20px rgba(234, 88, 12, 0.4), 0 2px 6px rgba(0, 0, 0, 0.15)',
              transform: 'rotate(12deg)',
              zIndex: 5,
              border: '2px dashed rgba(255, 255, 255, 0.9)',
              outline: '2px solid #ea580c',
              userSelect: 'none',
              pointerEvents: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95 }}>
              <Sparkles size={10} /> INCL.
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.1', margin: '1px 0', textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
              VSt 2021
            </div>
            <div style={{ fontSize: '0.58rem', fontWeight: '800', letterSpacing: '0.04em', textTransform: 'uppercase', opacity: 0.95 }}>
              Uitbreiding
            </div>
          </div>

          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <CardsIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1, paddingRight: '1rem' }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>De Theoriekaarten</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '0.85rem' }}>
              Bestudeer alle achtergronden, herkenbare voorbeelden en praktische tips digitaal. De kaartenverzameling (55 kaarten in totaal) bestaat uit twee complementaire sets:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6', marginTop: '6px', flexShrink: 0 }} />
                <span>
                  <strong>Basisset (43 kaarten):</strong> De klassieke Young & Arntz indeling met alle 18 schema's, 14 modi, 6 modi-categorieën en 5 basisbehoeften.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c', marginTop: '6px', flexShrink: 0 }} />
                <span>
                  <strong>VSt 2021 Uitbreidingsset (12 kaarten):</strong> De officiële actualisatie van de Vereniging voor Schematherapie met 6 aanvullende modi (o.a. Blije Kind & Boze Beschermer), 3 schema's, Coping: Omkering en 2 behoeften.
                </span>
              </div>
            </div>

            <button onClick={onViewKaartenOverzicht} className="btn btn-gradient-game">
              Bekijk theoriekaarten
            </button>
          </div>
        </div>

        {/* Optie 2: Werkvormen & Spelregels */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <FileTextIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>Werkvormen & Spelregels</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Lees hoe je de theoriekaarten inzet als visuele tool en ontdek de speelse bonus-werkvorm.</p>
            <button onClick={onViewGameRules} className="btn btn-gradient-game">
              Lees de werkvormen
            </button>
          </div>
        </div>

        {/* Optie 3: Kaarten Printen */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <PrinterIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>Kaarten Printen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Print de kaarten zelf of stuur een bestand naar de drukker om fysiek met de theoriekaarten aan de slag te gaan.</p>
            <button onClick={onViewPrintShop} className="btn btn-gradient-game">
              Bekijk print opties
            </button>
          </div>
        </div>

        {/* Optie 4: Fysieke Kaarten Bestellen */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <ShoppingCartIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>Fysieke Kaarten Bestellen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Wil je liever een professioneel, fysiek kaartendeck in handen? Bestel direct de Complete Set (55 kaarten), de Klassieke Basisset (43 kaarten) of de losse VSt 2021 Uitbreiding (12 kaarten).</p>
            <button onClick={onViewOrderCards} className="btn btn-gradient-game">
              Kaarten bestellen
            </button>
          </div>
        </div>

        {/* Optie 5: Over de kaarten */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <InfoIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>Over de kaarten</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Lees meer over de achtergrond, verantwoording en visie achter de theoriekaarten.</p>
            <button onClick={onViewAbout} className="btn btn-gradient-game">
              Lees meer over de kaarten
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
