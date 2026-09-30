import React from 'react';
import { ArrowLeft, Home, BookOpen, FileText, Printer, ShoppingCart } from 'lucide-react';

export default function GameNavbar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'home', label: 'Terug', icon: ArrowLeft },
    { id: 'game-portal', label: 'Portaal', icon: Home },
    { id: 'kaartenoverzicht', label: 'Theorie', icon: BookOpen },
    { id: 'game-rules', label: 'Spelregels', icon: FileText },
    { id: 'print-shop', label: 'Printen', icon: Printer },
    { id: 'order-cards', label: 'Bestellen', icon: ShoppingCart }
  ];

  return (
    <div style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'var(--bg-color)',
      borderBottom: '1px solid var(--border-color)',
      padding: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)'
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
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
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
  );
}
