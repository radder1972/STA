import React from 'react';
import SchemaCard from './SchemaCard';
import imgVeiligheid from '../assets/images/basisbehoeften/1.png';
import imgGezondeVolwassene from '../assets/images/modes/gv.png';
import imgMinderwaardigheid from '../assets/images/schemas/Defectiveness_unlovability.png';
import imgVermijding from '../assets/images/modicategorieen/coping_vermijding.png';
import imgKwetsbareKind from '../assets/images/modes/kk.png';

export default function HeroCardFan({ isHovered }) {
  const cards = [
    { type: 'need', title: 'Veiligheid & Verbinding', color: '#f59e0b', id: 'bb1', src: imgVeiligheid },
    { type: 'mode', title: 'Gezonde Volwassene', color: '#10b981', id: 'm14', src: imgGezondeVolwassene },
    { type: 'schema', title: 'Minderwaardigheid / Schaamte', color: '#0ea5e9', id: 's4', src: imgMinderwaardigheid },
    { type: 'coping', title: 'Vermijding', color: '#8b5cf6', id: 'c2', src: imgVermijding },
    { type: 'mode', title: 'Kwetsbare kind', color: '#ef4444', id: 'm1', src: imgKwetsbareKind }
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
            position: 'absolute', width: '110px', height: '155px',
            transformOrigin: 'bottom center',
            transform: isHovered 
              ? `translateX(${hoverOffset}px) translateY(${Math.abs(idx-2) * 10 - 20}px) rotate(${hoverAngle}deg) scale(0.85)`
              : `translateX(${baseOffset}px) translateY(${Math.abs(idx-2) * 5}px) rotate(${baseAngle}deg) scale(0.75)`,
            transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)', zIndex: idx
          }}>
             <div style={{
                pointerEvents: 'none', width: '100%', height: '100%', 
                boxShadow: isHovered ? `0 15px 35px ${card.color}40` : '0 6px 15px rgba(0,0,0,0.15)',
                borderRadius: '8px'
             }}>
               <SchemaCard 
                  id={card.id} type={card.type} title={card.title} color={card.color} src={card.src}
                  width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false}
               />
             </div>
          </div>
        );
      })}
    </div>
  );
}