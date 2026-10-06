import React, { useEffect, useState } from 'react';
import { FileTextIcon, PrinterIcon, CardsIcon, ShoppingCartIcon, InfoIcon } from './Icons';
import { Sparkles } from "lucide-react";
import { ThreeSparklesLogo } from "./Icons";
import OrderBoxAnimation from "./OrderBoxAnimation";


export default function GamePortal({ onViewKaartenOverzicht, onViewGameRules, onViewPrintShop, onViewOrderCards, onViewAbout }) {
  const [isHoveredOrder, setIsHoveredOrder] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>

      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', gap: '16px' }}>
          <CardsIcon size={40} useGameGradient={true} /> Schematherapie Kaarten
        </h1>
        <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>
          Verken alle theoriekaarten, werkvormen en printopties
        </h2>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', position: 'relative' }}>
        
        {/* Ronde sticker: Theorie-uitbreiding (helemaal bovenaan de hoofdkaart) */}
        <button
          type="button"
          onClick={onViewKaartenOverzicht}
          title="Bekijk de theoriekaarten inclusief de 12 theorie-uitbreidingskaarten"
          style={{
            position: 'absolute',
            top: '-26px',
            right: '-22px',
            width: '112px',
            height: '112px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center', overflow: 'hidden',
            textAlign: 'center',
            filter: 'drop-shadow(0 8px 12px rgba(234, 88, 12, 0.45))',
            transform: 'rotate(12deg)',
            zIndex: 10,
            border: 'none',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            padding: 0
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'rotate(12deg) scale(1.06)';
            e.currentTarget.style.filter = 'drop-shadow(0 12px 16px rgba(234, 88, 12, 0.6))';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'rotate(12deg)';
            e.currentTarget.style.filter = 'drop-shadow(0 8px 12px rgba(234, 88, 12, 0.45))';
          }}
        >
          <div style={{ position: 'absolute', opacity: 0.15, transform: 'scale(2.5) rotate(-15deg)' }}><ThreeSparklesLogo size={60} theme="white" /></div><div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95 }}>
            <ThreeSparklesLogo size={13} theme="white" /> Inclusief
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.1', margin: '2px 0', textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
            12 Extra
          </div>
          <div style={{ fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1.15 }}>
            Theorie-<br />kaarten
          </div>
        </button>

        {/* Optie 1: De Theoriekaarten */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '16px', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
            <CardsIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>De Theoriekaarten</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '0.85rem' }}>
              Bestudeer alle achtergronden, herkenbare voorbeelden en praktische tips digitaal. De kaartenverzameling (55 kaarten in totaal) bestaat uit twee complementaire sets:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem', fontSize: '0.92rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c', marginTop: '6px', flexShrink: 0 }} />
                <span>
                  <strong>Basisset (43 kaarten):</strong> De klassieke Young & Arntz indeling met alle 18 schema's, 14 modi, 6 modi-categorieën en 5 basisbehoeften.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#ea580c', marginTop: '6px', flexShrink: 0 }} />
                <span>
                  <strong>Theorie-uitbreidingsset (12 kaarten):</strong> Theoretische actualisatie (Arntz et al., 2021) met 6 aanvullende modi (o.a. Blije Kind & Boze Beschermer), 3 schema's, Coping: Omkering en 2 behoeften.
                </span>
              </div>
            </div>

            <button onClick={onViewKaartenOverzicht} className="btn btn-gradient-game">
              Bekijk theoriekaarten
            </button>
          </div>
        </div>

        {/* Optie 3: Werkvormen & Spelvormen */}
        {/* Optie 2: Fysieke Kaarten Bestellen (Accentuated) */}
        <div className="inner-box" onMouseEnter={() => setIsHoveredOrder(true)} onMouseLeave={() => setIsHoveredOrder(false)} style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', background: 'linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 247, 237, 0.8))', border: '1px solid rgba(234, 88, 12, 0.3)', boxShadow: '0 8px 30px rgba(234, 88, 12, 0.1)' }}>
          <div style={{ padding: '1rem', background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(234, 88, 12, 0.15) 100%)', borderRadius: '16px', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.3)' }}>
            <OrderBoxAnimation isHovered={isHoveredOrder} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem', color: '#ea580c' }}>Fysieke Kaarten Bestellen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Wil je liever een professioneel, fysiek kaartendeck in handen? Bestel direct de Complete Set (55 kaarten), de Klassieke Basisset (43 kaarten) of de losse Theorie-uitbreiding (12 kaarten).</p>
            <button onClick={onViewOrderCards} className="btn" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)', color: 'white', border: 'none', boxShadow: '0 4px 15px rgba(234, 88, 12, 0.4)', fontWeight: 'bold' }}>
              Fysieke kaarten bestellen
            </button>
          </div>
        </div>

        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '16px', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
            <FileTextIcon size={32} useGameGradient={true} />
          </div>
          <div style={{ flex: 1 }}>
            <h2 className="box-heading" style={{ marginBottom: '0.5rem' }}>Werkvormen & Spelvormen</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>Lees hoe je de theoriekaarten inzet als visuele tool en ontdek interactieve werkvormen en spelvormen.</p>
            <button onClick={onViewGameRules} className="btn btn-gradient-game">
              Lees de werkvormen
            </button>
          </div>
        </div>

        {/* Optie 4: Kaarten Printen */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '16px', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
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

        {/* Optie 5: Over de kaarten */}
        <div className="inner-box" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(14, 165, 233, 0.1)', borderRadius: '16px', color: '#0ea5e9', border: '1px solid rgba(14, 165, 233, 0.2)' }}>
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
