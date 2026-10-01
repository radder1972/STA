import React from 'react';
import { HomeIcon, CardsIcon, FileTextIcon, PrinterIcon, ShoppingCartIcon, InfoIcon, PlayingCardsIcon, ClipboardIcon } from './Icons';

export default function GameNavbar({ currentView, setCurrentView, isTafelApp = false, isSpelApp = false }) {
  const navItems = [
    { id: 'game-portal', label: 'Home', icon: HomeIcon, hash: '' },
    { id: 'tafelopstelling', label: 'Tafelopstelling', icon: PlayingCardsIcon },
    { id: 'kaartenoverzicht', label: 'Spelkaarten', icon: CardsIcon, hash: 'theoriekaarten' },
    { id: 'game-rules', label: 'Spelregels', icon: FileTextIcon, hash: 'spelregels' },
    { id: 'print-shop', label: 'Printen', icon: PrinterIcon, hash: 'print-shop' },
    { id: 'order-cards', label: 'Bestellen', icon: ShoppingCartIcon, hash: 'bestel-kaarten' },
    { id: 'about', label: 'Over', icon: InfoIcon, hash: 'over' }
  ];

  const handleItemClick = (item) => {
    if (item.id === 'tafelopstelling') {
      if (!isTafelApp) {
        window.location.href = 'tafel.html';
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (isTafelApp) {
      window.location.href = item.hash ? `spel.html#${item.hash}` : 'spel.html';
      return;
    }

    setCurrentView(item.id);
  };

  return (
    <div className="no-print" style={{
      background: 'var(--bg-color)',
      border: '1px solid var(--border-color)',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
      borderRadius: '16px',
      marginBottom: '1rem'
    }}>
      <div 
        className="hide-scrollbar"
        style={{
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          maxWidth: '100%',
          padding: '0.25rem'
        }}
      >
        {navItems.map(item => {
          const isActive = currentView === item.id || (item.id === 'print-shop' && currentView === 'home-print-export');
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                border: 'none',
                background: isActive ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
                fontSize: '0.9rem'
              }}
              onMouseOver={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--hover-bg)';
                  e.currentTarget.style.color = 'var(--text-main)';
                }
              }}
              onMouseOut={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <Icon size={18} />
              <span className="game-nav-label">{item.label}</span>
            </button>
          );
        })}
        <div style={{ width: '1px', background: 'var(--border-color)', margin: '0 4px', alignSelf: 'stretch' }} />
        <a
          href="index.html"
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
          title="Naar de Vragenlijsten & Zelftest"
        >
          <ClipboardIcon size={18} />
          <span className="game-nav-label">Zelftest</span>
        </a>
      </div>
    </div>
  );
}
