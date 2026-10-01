import React from 'react';
import { HomeIcon, CardsIcon, FileTextIcon, PrinterIcon, ShoppingCartIcon, InfoIcon, PlayingCardsIcon, ClipboardIcon } from './Icons';

export default function GameNavbar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'game-portal', label: 'Home', icon: HomeIcon },
    { id: 'kaartenoverzicht', label: 'Kaarten', icon: CardsIcon },
    { id: 'game-rules', label: 'Spelregels', icon: FileTextIcon },
    { id: 'print-shop', label: 'Printen', icon: PrinterIcon },
    { id: 'order-cards', label: 'Bestellen', icon: ShoppingCartIcon },
    { id: 'about', label: 'Over', icon: InfoIcon }
  ];

  const handleItemClick = (item) => {
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
      marginBottom: '1.5rem',
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto 1.5rem auto'
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
          title="Naar de Vragenlijsten & Zelftest (YSQ-S3 & SMI)"
        >
          <ClipboardIcon size={18} />
          <span className="game-nav-label">Vragenlijsten</span>
        </a>

        {/* Link naar Tafelopstelling */}
        <a
          href="tafel.html"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            background: 'rgba(16, 185, 129, 0.05)',
            color: 'var(--text-main)',
            fontWeight: '600',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
            fontSize: '0.9rem'
          }}
          title="Naar de Digitale Tafelopstelling"
        >
          <PlayingCardsIcon size={18} useTafelGradient={true} />
          <span className="game-nav-label">Tafelopstelling</span>
        </a>

        {/* Link naar Startpagina */}
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
          title="Naar de Startpagina"
        >
          <HomeIcon size={18} />
          <span className="game-nav-label">Startpagina</span>
        </a>
      </div>
    </div>
  );
}
