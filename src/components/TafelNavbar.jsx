import React from 'react';
import { PlayingCardsIcon, PlatformBadge, ThreeSparklesLogo, InfoIcon } from './Icons';
import { Printer, RotateCcw } from 'lucide-react';

const activePill = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  border: 'none',
  background: 'linear-gradient(to right, #059669, #10b981)',
  color: 'white',
  fontWeight: '600',
  fontSize: '0.9rem',
  whiteSpace: 'nowrap',
  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
};

const idlePill = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '9999px',
  border: 'none',
  background: 'transparent',
  color: 'var(--text-muted)',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  fontSize: '0.9rem'
};

const hoverIn = (e) => { e.currentTarget.style.background = 'var(--hover-bg)'; e.currentTarget.style.color = 'var(--text-main)'; };
const hoverOut = (e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; };

// activeView: 'tafel' (standaard) of 'over'
export default function TafelNavbar({ onPrint, onClear, activeView = 'tafel', onOpenTafel, onOpenAbout }) {
  const isTafel = activeView === 'tafel';
  return (
    <div className="no-print" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '950px',
      margin: '0 auto 2rem auto',
      position: 'relative'
    }}>
      {/* Top Platform Return Badge with right-aligned logo */}
      <PlatformBadge theme="tafel" marginBottom="1.5rem" />

      <div style={{
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        padding: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Draped 3 Sparkles Logo on Right Side of Navbar */}
        <div style={{
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          pointerEvents: 'none',
          opacity: 0.88
        }}>
          <ThreeSparklesLogo size={22} theme="tafel" />
        </div>

        <div 
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'visible',
            maxWidth: '100%',
            padding: '0.25rem',
            alignItems: 'center'
          }}
        >
          {/* Hoofdmenu Item: Tafelopstelling */}
          {isTafel ? (
            <div style={activePill}>
              <PlayingCardsIcon size={18} color="white" />
              <span>Tafelopstelling</span>
            </div>
          ) : (
            <button onClick={onOpenTafel} style={idlePill} onMouseOver={hoverIn} onMouseOut={hoverOut}>
              <PlayingCardsIcon size={18} color="currentColor" />
              <span>Tafelopstelling</span>
            </button>
          )}

          {isTafel && (<>
          {/* Knop: Tafel Printen */}
          <button
            onClick={onPrint}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-main)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              fontSize: '0.9rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--hover-bg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            title="Tafelopstelling afdrukken / als PDF opslaan"
          >
            <Printer size={16} color="currentColor" />
            <span>Printen</span>
          </button>

          {/* Knop: Tafel Leegmaken */}
          <button
            onClick={onClear}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: 'transparent',
              color: 'var(--text-main)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              fontSize: '0.9rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'var(--hover-bg)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            title="Alle kaarten en teksten op tafel wissen"
          >
            <RotateCcw size={16} color="currentColor" />
            <span>Leegmaken</span>
          </button>
          </>)}

          {/* Menu Item: Over (Verantwoording & privacy) */}
          {isTafel ? (
            <button onClick={onOpenAbout} style={idlePill} onMouseOver={hoverIn} onMouseOut={hoverOut} title="Over, verantwoording en privacy">
              <InfoIcon size={18} color="currentColor" />
              <span>Over</span>
            </button>
          ) : (
            <div style={activePill}>
              <InfoIcon size={18} color="white" />
              <span>Over</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
