import React from 'react';
import { PlayingCardsIcon, PlatformBadge, ThreeSparklesLogo } from './Icons';
import { Printer, RotateCcw } from 'lucide-react';

export default function TafelNavbar({ onPrint, onClear }) {
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
      {/* Groot 3-sterren logo achter DSP badge & half onder de menubalk */}
      <div style={{
        position: 'absolute',
        top: '-16px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.25
      }}>
        <ThreeSparklesLogo size={90} theme="tafel" />
      </div>

      {/* Top Platform Return Badge */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <PlatformBadge theme="tafel" marginBottom="0.85rem" />
      </div>

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
          {/* Actief Hoofdmenu Item: Tafelopstelling */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              background: 'linear-gradient(to right, #059669, #10b981)',
              color: 'white',
              fontWeight: '600',
              fontSize: '0.9rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)'
            }}
          >
            <PlayingCardsIcon size={18} color="white" />
            <span>Tafelopstelling</span>
          </div>

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

        </div>
      </div>
    </div>
  );
}
