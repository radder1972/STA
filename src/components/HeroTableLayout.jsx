import React from 'react';
import SchemaCard from './SchemaCard';
import { 
  vstBasisbehoeftenData,
  vstSchemaData,
  vstModiData,
  vstCopingData 
} from '../data/cards';

const allData = [...vstBasisbehoeftenData, ...vstSchemaData, ...vstModiData, ...vstCopingData];

export default function HeroTableLayout({ isHovered }) {
  const cardSetup = [
    { id: 'm12', base: {x: 0, y: 15}, hover: {x: -55, y: -45} }, 
    { id: 'c1', base: {x: 0, y: 20}, hover: {x: 55, y: -45} }, 
    { id: 'm1', base: {x: 0, y: 25}, hover: {x: 0, y: -10} },    
    { id: 'm14', base: {x: 0, y: 30}, hover: {x: 0, y: 50} }       
  ];
  
  const cards = cardSetup.map(setup => ({
    ...setup,
    ...allData.find(c => c.id === setup.id)
  })).filter(c => c.title);

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem'
    }}>
      <div style={{
        position: 'absolute', width: '140px', height: '140px', borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.25)',
        transform: isHovered ? 'scale(1)' : 'scale(0.5)', opacity: isHovered ? 1 : 0,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      {cards.map((card, idx) => (
        <div key={idx} style={{
          position: 'absolute', width: '110px', height: '155px',
          transform: isHovered 
            ? `translate(${card.hover.x}px, ${card.hover.y}px) rotate(${card.hover.x * 0.15}deg) scale(0.45)`
            : `translate(${card.base.x}px, ${card.base.y}px) rotate(0deg) scale(0.35)`,
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${idx * 0.05}s`, zIndex: idx
        }}>
          <div style={{
             pointerEvents: 'none', width: '100%', height: '100%', 
             boxShadow: isHovered ? `0 15px 35px ${card.color}60` : '0 6px 15px rgba(0,0,0,0.15)',
             borderRadius: '8px'
          }}>
            <SchemaCard 
                id={card.id} type={card.type || (card.id.startsWith('n') ? 'need' : card.id.startsWith('m') ? 'mode' : card.id.startsWith('c') ? 'coping' : 'schema')} 
                title={card.title} color={card.color} src={card.src}
                width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}