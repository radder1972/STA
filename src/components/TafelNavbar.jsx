import React from 'react';
import { HomeIcon, CardsIcon, ClipboardIcon, PlayingCardsIcon } from './Icons';
import { Printer, RotateCcw } from 'lucide-react';

export default function TafelNavbar({ onPrint, onClear }) {
  return (
    <div className="no-print" style={{
      background: 'var(--bg-color)',
      border: '1px solid var(--border-color)',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      borderRadius: '16px',
      marginBottom: '2rem',
      width: '100%',
      maxWidth: '950px',
      margin: '0 auto 2rem auto'
    }}>
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
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

        {/* Actie: Print Tafel */}
        <button
          onClick={onPrint}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: 'none',
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
          title="Druk de tafelopstelling af of bewaar als PDF"
        >
          <Printer size={18} />
          <span>Tafel Printen</span>
        </button>

        {/* Actie: Tafel Leegmaken */}
        <button
          onClick={onClear}
          style={{
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
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--hover-bg)';
            e.currentTarget.style.color = 'var(--text-main)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
          title="Maak alle kaarten en teksten op tafel leeg"
        >
          <RotateCcw size={16} />
          <span>Tafel Leegmaken</span>
        </button>

        {/* Scheidingslijn */}
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px', alignSelf: 'stretch' }} />

        {/* Link naar Vragenlijsten */}
        <a
          href="test.html"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            background: 'rgba(59, 130, 246, 0.05)',
            color: 'var(--text-main)',
            fontWeight: '600',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
          }}
          title="Naar Vragenlijsten & Zelftest (YSQ-S3 & SMI)"
        >
          <ClipboardIcon size={18} />
          <span>Vragenlijsten</span>
        </a>

        {/* Link naar Kaarten */}
        <a
          href="kaarten.html"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontWeight: '500',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--hover-bg)';
            e.currentTarget.style.color = 'var(--text-main)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
          title="Naar Kaarten (Theorie, Werkvormen & Printen)"
        >
          <CardsIcon size={18} />
          <span>Kaarten</span>
        </a>

        {/* Link naar StartHub */}
        <a
          href="index.html"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: '1px solid var(--border-color)',
            background: 'transparent',
            color: 'var(--text-muted)',
            fontWeight: '500',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'var(--hover-bg)';
            e.currentTarget.style.color = 'var(--text-main)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
          title="Naar de centrale Startpagina"
        >
          <HomeIcon size={18} />
          <span>Startpagina</span>
        </a>
      </div>
    </div>
  );
}
