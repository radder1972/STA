import React from 'react';

export default function HeroCardFan({ isHovered }) {
  // Realistic schema therapy cards representations
  const cards = [
    { color: '#f59e0b', cat: 'BEHOEFTE', title: 'Verbinding' },
    { color: '#10b981', cat: 'MODUS', title: 'Gezonde\nVolwassene' },
    { color: '#0ea5e9', cat: 'SCHEMA', title: 'Minder-\nwaardigheid' },
    { color: '#8b5cf6', cat: 'COPING', title: 'Vermijding' },
    { color: '#f43f5e', cat: 'MODUS', title: 'Kwetsbare\nKind' }
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'flex-end', marginTop: '1rem', marginBottom: '1.5rem', perspective: '1000px'
    }}>
      {cards.map((card, idx) => {
        const baseAngle = (idx - 2) * 12;
        const hoverAngle = (idx - 2) * 20;
        const baseOffset = (idx - 2) * 10;
        const hoverOffset = (idx - 2) * 25;
        
        return (
          <div key={idx} style={{
            position: 'absolute', width: '80px', height: '115px', backgroundColor: 'white',
            borderRadius: '6px', border: `2px solid ${card.color}`, overflow: 'hidden',
            boxShadow: isHovered ? '0 10px 25px rgba(0,0,0,0.12)' : '0 4px 10px rgba(0,0,0,0.05)',
            transformOrigin: 'bottom center',
            transform: isHovered 
              ? `translateX(${hoverOffset}px) translateY(${Math.abs(idx-2) * 5}px) rotate(${hoverAngle}deg) scale(1.05)`
              : `translateX(${baseOffset}px) translateY(${Math.abs(idx-2) * 2}px) rotate(${baseAngle}deg) scale(1)`,
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: idx, display: 'flex', flexDirection: 'column'
          }}>
            <div style={{ background: card.color, width: '100%', height: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span style={{ color: 'white', fontSize: '7px', fontWeight: 'bold', letterSpacing: '0.5px' }}>{card.cat}</span>
            </div>
            <div style={{ flex: 1, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4px' }}>
               <span style={{ color: 'var(--text-main)', fontSize: '9px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }}>
                 {card.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}
               </span>
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '4px' }}>
               <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--text-muted)', opacity: 0.2 }}></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}