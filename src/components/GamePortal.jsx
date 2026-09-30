import React, { useEffect, useState } from 'react';
import { HomeIcon, ScrollTextIcon, PrinterIcon, CardsIcon, ShoppingCartIcon } from './Icons';
import packageJson from '../../package.json';

export default function GamePortal({ onBack, onViewKaartenOverzicht, onViewGameRules, onViewPrintShop, onViewOrderCards }) {
  const [filter, setFilter] = useState('optie1');
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const FilterButton = ({ id, label }) => (
    <button 
      className={`btn ${filter === id ? 'btn-gradient-game' : 'btn-outline'}`}
      onClick={() => setFilter(id)}
      style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}
    >
      {label}
    </button>
  );

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>


      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <HomeIcon size={48} useGameGradient={true} /> Home
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.5rem', lineHeight: '1.4' }}>
          Breng schema's en modi tot leven op tafel
        </h2>
      </div>

      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button className="btn btn-outline" onClick={onBack} style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            {"< Schematherapie app"}
          </button>
        </div>
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
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Lees hier de officiële spelregels en ontdek hoe je de theoriekaarten in de praktijk kunt gebruiken.</p>
            <button onClick={onViewGameRules} className="btn btn-gradient-game">
              Lees de spelregels
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <PrinterIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Kaarten Printen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Print de kaarten zelf of stuur een bestand naar de drukker om fysiek met de theoriekaarten aan de slag te gaan.</p>
            <button onClick={onViewPrintShop} className="btn btn-gradient-game">
              Bekijk print opties
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <ShoppingCartIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Fysieke Kaarten Bestellen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Wil je liever een professioneel, fysiek kaartendeck in handen? Bekijk hier de mogelijkheden om een set te bestellen.</p>
            <button onClick={onViewOrderCards} className="btn btn-gradient-game">
              Kaarten bestellen
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
