import React, { useEffect } from 'react';
import { ArrowLeftIcon } from './Icons';
import { PlayingCards, ScrollText, Printer } from 'lucide-react';

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
        <h1 className="text-gradient" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
          <PlayingCards size={48} /> Het Schematherapie Spel
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)', marginBottom: '1rem' }}>
          Breng schema's en modi tot leven op tafel! Het spel helpt je om samen met je cliënt het patroon van trigger tot gezonde volwassene inzichtelijk te maken en er interactief mee te werken.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Theoriekaarten Bekijken</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Bestudeer de theorie, herkenbare voorbeelden en concrete tips van alle 18 schema's en 14 modi digitaal.</p>
            <button onClick={onViewKaartenOverzicht} className="btn btn-outline">
              Bekijk theoriekaarten
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', color: '#10b981' }}>
            <ScrollText size={32} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Spelregels en Oefeningen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Ontdek hoe je de kaarten in de praktijk gebruikt, met onder andere de Modi-check in de wachtkamer en het uitpluizen van een incident.</p>
            <button onClick={onViewGameRules} className="btn btn-gradient">
              Lees de spelregels
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(234, 179, 8, 0.1)', borderRadius: '16px', color: '#eab308' }}>
            <Printer size={32} />
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
    </div>
  );
}
