import React from 'react';
import SchemaCard from './SchemaCard';

// Using a few representative cards
import imgBlijeKind from '../assets/images/vst/blije_kind.png';
import imgWantrouwen from '../assets/images/schemas/Mistrust.png';
import imgVeiligheid from '../assets/images/basisbehoeften/1.png';

export default function CornerCardFan({ isHovered }) {
  const cards = [
    { type: 'schema', title: 'Wantrouwen / Misbruik', color: '#0ea5e9', id: 's2', src: imgWantrouwen, imageStyle: { transform: 'scale(1)' } },
    { type: 'need', title: 'Veiligheid & Verbinding', color: '#f59e0b', id: 'bb1', src: imgVeiligheid, imageStyle: { transform: 'scale(1)' } },
    { type: 'mode', title: 'Blije Kind', color: '#10b981', id: 'm4', src: imgBlijeKind, imageStyle: { transform: 'scale(1.1)' } }
  ];

  return (
    <div style={{
      position: 'absolute',
      right: '30px', 
      top: '20px',
      width: '0',
      height: '0',
      zIndex: 50,
      perspective: '1000px',
      pointerEvents: 'none' // allow clicking through
    }}>
      {cards.map((card, idx) => {
        // Base state: tightly stacked, slightly rotated to look natural
        const baseAngle = (idx - 1) * 5 + 15;
        const baseOffset = (idx - 1) * 8;
        
        // Hover state: fanned out widely
        const hoverAngle = (idx - 1) * 20 + 15;
        const hoverOffset = (idx - 1) * 35;
        const hoverY = Math.abs(idx - 1) * 10 - 25; // middle card pops up
        
        return (
          <div key={idx} style={{
            position: 'absolute', width: '110px', height: '155px',
            transformOrigin: 'bottom right',
            transform: isHovered 
              ? `translateX(${hoverOffset - 110}px) translateY(${hoverY - 155}px) rotate(${hoverAngle}deg) scale(1.15)`
              : `translateX(${baseOffset - 110}px) translateY(${-155}px) rotate(${baseAngle}deg) scale(0.85)`,
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: idx
          }}>
             <div style={{
                pointerEvents: 'none', width: '100%', height: '100%', 
                boxShadow: isHovered ? `0 15px 35px ${card.color}50` : '0 6px 15px rgba(0,0,0,0.2)',
                borderRadius: '8px'
             }}>
               <SchemaCard 
                  id={card.id} type={card.type} title={card.title} color={card.color} src={card.src}
                  width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false} imageStyle={card.imageStyle}
               />
             </div>
          </div>
        );
      })}
    </div>
  );
}
