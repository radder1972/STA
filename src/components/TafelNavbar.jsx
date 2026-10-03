import React, { useState, useRef, useEffect } from 'react';
import { HomeIcon, CardsIcon, PlayingCardsIcon, PlatformBadge, ThreeSparklesLogo } from './Icons';
import { Printer, RotateCcw, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default function TafelNavbar({ onPrint, onClear }) {
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="no-print" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '950px',
      margin: '0 auto 2rem auto'
    }}>
      {/* Top Platform Return Badge */}
      <PlatformBadge theme="tafel" marginBottom="0.85rem" />

      <div style={{
        background: 'var(--bg-color)',
        border: '1px solid var(--border-color)',
        padding: '0.5rem',
        display: 'flex',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
        borderRadius: '16px',
        width: '100%',
        position: 'relative'
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

        {/* Submenu Trigger: Tafelopties */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: '1px solid var(--border-color)',
              background: showMenu ? 'var(--hover-bg)' : 'transparent',
              color: 'var(--text-main)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              fontSize: '0.9rem'
            }}
            onMouseOver={(e) => {
              if (!showMenu) e.currentTarget.style.background = 'var(--hover-bg)';
            }}
            onMouseOut={(e) => {
              if (!showMenu) e.currentTarget.style.background = 'transparent';
            }}
            title="Tafelopties & acties (Printen, Leegmaken)"
          >
            <SlidersHorizontal size={16} />
            <span>Tafelopties</span>
            <ChevronDown size={14} style={{ transform: showMenu ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} />
          </button>

          {/* Floating Submenu Dropdown */}
          {showMenu && (
            <div 
              style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: '0',
                background: 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
                padding: '6px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                minWidth: '180px',
                zIndex: 9999
              }}
            >
              <button
                onClick={() => { setShowMenu(false); onPrint(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-main)',
                  fontSize: '0.88rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(59, 130, 246, 0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <Printer size={16} color="#3b82f6" />
                <span>Tafel Printen</span>
              </button>

              <button
                onClick={() => { setShowMenu(false); onClear(); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#ef4444',
                  fontSize: '0.88rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.15s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.08)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <RotateCcw size={16} color="#ef4444" />
                <span>Tafel Leegmaken</span>
              </button>
            </div>
          )}
        </div>

        {/* Scheidingslijn */}
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px', alignSelf: 'stretch' }} />



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

      </div>
    </div>
    </div>
  );
}
