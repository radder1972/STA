import React, { useEffect } from 'react';
import { ArrowLeftIcon, PlayingCardsIcon, ScrollTextIcon, PrinterIcon, CardsIcon } from './Icons';
import packageJson from '../../package.json';

export default function GamePortal({ onBack, onViewKaartenOverzicht, onViewGameRules, onViewPrintShop }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      
      <div className="no-print" style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar de App
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px' }}>
        <h1 className="text-gradient-game" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
          <PlayingCardsIcon size={48} useGameGradient={true} /> Het Schematherapie Spel
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Breng schema's en modi tot leven op tafel! Het spel helpt je om samen met je cliënt het patroon van trigger tot gezonde volwassene inzichtelijk te maken en er interactief mee te werken.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <CardsIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Theoriekaarten Bekijken</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Bestudeer de theorie, herkenbare voorbeelden en concrete tips van alle 18 schema's en 14 modi digitaal.</p>
            <button onClick={onViewKaartenOverzicht} className="btn btn-gradient-game">
              Bekijk theoriekaarten
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <ScrollTextIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Spelregels en Oefeningen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Ontdek hoe je de kaarten in de praktijk gebruikt, met onder andere de Modi-check in de wachtkamer en het uitpluizen van een incident.</p>
            <button onClick={onViewGameRules} className="btn btn-gradient-game">
              Lees de spelregels
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <PrinterIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Kaarten Printen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Print de kaarten zelf of stuur een bestand naar de drukker om fysiek met de theoriekaarten aan de slag te gaan.</p>
            <button onClick={onViewPrintShop} className="btn btn-outline">
              Bekijk print opties
            </button>
          </div>
        </div>

      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        v{packageJson.version}
      </div>
    </div>
  );
}
