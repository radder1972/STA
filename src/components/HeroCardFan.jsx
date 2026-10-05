import React, { useState, useEffect } from 'react';
import SchemaCard from './SchemaCard';

// Load images directly to avoid Vite glob import issues in production
import imgVeiligheid from '../assets/images/basisbehoeften/1.png';
import imgAutonomie from '../assets/images/basisbehoeften/2.png';

import imgGezondeVolwassene from '../assets/images/modes/gv.png';
import imgKwetsbareKind from '../assets/images/modes/kk.png';
import imgStraffendeOuder from '../assets/images/modes/so.png';
import imgImpulsieveKind from '../assets/images/modes/ik.png';
import imgVeeleisendeOuder from '../assets/images/modes/vo.png';

import imgMinderwaardigheid from '../assets/images/schemas/Defectiveness_unlovability.png';
import imgVerlating from '../assets/images/schemas/Abandonment.png';
import imgWantrouwen from '../assets/images/schemas/Mistrust.png';
import imgMeedogenlozeNormen from '../assets/images/schemas/Unrelenting Standards.png';

import imgVermijding from '../assets/images/modicategorieen/coping_vermijding.png';
import imgOvergave from '../assets/images/modicategorieen/coping_overgave.png';

const allPoolCards = [
  { type: 'need', title: 'Veiligheid & Verbinding', color: '#f59e0b', id: 'bb1', src: imgVeiligheid, imageStyle: { transform: 'scale(0.85)' } },
  { type: 'need', title: 'Autonomie & Competentie', color: '#f59e0b', id: 'bb2', src: imgAutonomie, imageStyle: { transform: 'scale(0.85)' } },
  { type: 'mode', title: 'Gezonde Volwassene', color: '#10b981', id: 'm14', src: imgGezondeVolwassene, imageStyle: { transform: 'scale(1.1)' } },
  { type: 'mode', title: 'Kwetsbare kind', color: '#60a5fa', id: 'm1', src: imgKwetsbareKind, imageStyle: { transform: 'scale(1.1)' } },
  { type: 'mode', title: 'Impulsieve kind', color: '#60a5fa', id: 'm3', src: imgImpulsieveKind, imageStyle: { transform: 'scale(1.1)' } },
  { type: 'mode', title: 'Straffende ouder', color: '#ef4444', id: 'm12', src: imgStraffendeOuder, imageStyle: { transform: 'scale(1.1)' } },
  { type: 'mode', title: 'Veeleisende ouder', color: '#ef4444', id: 'm13', src: imgVeeleisendeOuder, imageStyle: { transform: 'scale(1.1)' } },
  { type: 'schema', title: 'Minderwaardigheid', color: '#0ea5e9', id: 's4', src: imgMinderwaardigheid, imageStyle: { transform: 'scale(1)' } },
  { type: 'schema', title: 'Verlating / Instabiliteit', color: '#0ea5e9', id: 's1', src: imgVerlating, imageStyle: { transform: 'scale(1)' } },
  { type: 'schema', title: 'Wantrouwen / Misbruik', color: '#0ea5e9', id: 's2', src: imgWantrouwen, imageStyle: { transform: 'scale(1)' } },
  { type: 'schema', title: 'Meedogenloze normen', color: '#0ea5e9', id: 's17', src: imgMeedogenlozeNormen, imageStyle: { transform: 'scale(1)' } },
  { type: 'coping', title: 'Vermijding', color: '#8b5cf6', id: 'c2', src: imgVermijding, imageStyle: { transform: 'scale(0.85)' } },
  { type: 'coping', title: 'Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' } }
];

export default function HeroCardFan({ isHovered }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Pick 5 random cards on mount
    const shuffled = [...allPoolCards].sort(() => 0.5 - Math.random());
    setCards(shuffled.slice(0, 5));
  }, []);

  if (cards.length === 0) return null;

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
          <div key={`${card.id}-${idx}`} style={{
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
                  width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false} imageStyle={card.imageStyle}
               />
             </div>
          </div>
        );
      })}
    </div>
  );
}