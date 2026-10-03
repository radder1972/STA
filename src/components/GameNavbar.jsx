import React from 'react';
import { HomeIcon, CardsIcon, FileTextIcon, PrinterIcon, ShoppingCartIcon, InfoIcon, PlatformBadge } from './Icons';

export default function GameNavbar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'game-portal', label: 'Portaal', icon: HomeIcon },
    { id: 'kaartenoverzicht', label: 'Kaarten', icon: CardsIcon },
    { id: 'game-rules', label: 'Werkvormen', icon: FileTextIcon },
    { id: 'print-shop', label: 'Printen', icon: PrinterIcon },
    { id: 'order-cards', label: 'Bestellen', icon: ShoppingCartIcon },
    { id: 'about', label: 'Over', icon: InfoIcon }
  ];

  const handleItemClick = (item) => {
    setCurrentView(item.id);
  };

  return (
    <div className="no-print" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto 1.5rem auto'
    }}>
      {/* Top Platform Return Badge */}
      <PlatformBadge theme="kaarten" marginBottom="1.5rem" />

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
      </div>
    </div>
    </div>
  );
}
