import React from 'react';
import SchemaCard from './SchemaCard';
import { 
  vstBasisbehoeftenData,
  vstSchemaData,
  vstModiData,
  vstCopingData 
} from '../data/cards';

const allData = [...vstBasisbehoeftenData, ...vstSchemaData, ...vstModiData, ...vstCopingData];

export default function HeroCardFan({ isHovered }) {
  const cardIds = ['n1', 'm14', 's4', 'c2', 'm1'];
  const cards = cardIds.map(id => allData.find(c => c.id === id)).filter(Boolean);

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
                  id={card.id} type={card.type || (card.id.startsWith('n') ? 'need' : card.id.startsWith('m') ? 'mode' : card.id.startsWith('c') ? 'coping' : 'schema')} 
                  title={card.title} color={card.color} src={card.src}
                  width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false}
               />
             </div>
          </div>
        );
      })}
    </div>
  );
}