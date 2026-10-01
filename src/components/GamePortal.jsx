import React, { useEffect } from 'react';
import { FileTextIcon, PrinterIcon, CardsIcon, ShoppingCartIcon, InfoIcon } from './Icons';

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
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>
          Verken alle theoriekaarten, werkvormen en printopties
        </h2>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Optie 1: De Theoriekaarten */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <CardsIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>De Theoriekaarten</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Bestudeer de theorie, herkenbare voorbeelden en concrete tips van alle 18 schema's en 14 modi digitaal.</p>
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
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Wil je liever een professioneel, fysiek kaartendeck in handen? Bekijk hier de mogelijkheden om een set te bestellen.</p>
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
