import React, { useEffect, useState } from 'react';
import { HomeIcon, FileTextIcon, PrinterIcon, CardsIcon, ShoppingCartIcon, InfoIcon, PlayingCardsIcon } from './Icons';

export default function GamePortal({ onBack, onViewKaartenOverzicht, onViewGameRules, onViewPrintShop, onViewOrderCards, onViewAbout, onViewTafelopstelling }) {
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
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <HomeIcon size={40} useGameGradient={true} /> Schema Therapie Kaarten
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>
          Breng schema's en modi tot leven op tafel
        </h2>
      </div>

      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', width: '100%', overflowX: 'auto' }}>
        <a 
          href="index.html" 
          className="btn btn-outline" 
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none', margin: 0, whiteSpace: 'nowrap' }}
        >
          ← Naar de Vragenlijsten & Zelftest
        </a>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)' }}>
        
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px', color: '#3b82f6' }}>
            <PlayingCardsIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>Digitale Tafelopstelling</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Breng een concrete situatie of trigger direct visueel in kaart door modi, schema's en behoeften interactief op tafel te leggen.</p>
            <a 
              href="tafel.html" 
              className="btn btn-gradient-game"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
            >
              <PlayingCardsIcon size={20} useGameGradient={false} /> Open tafelopstelling
            </a>
          </div>
        </div>
        
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

      </div>
      

    </div>
  );
}
