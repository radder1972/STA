import React from 'react';
import SchemaCard from './SchemaCard';
import { Sparkle } from 'lucide-react';
import imgStraffendeOuder from '../assets/images/modes/so.png';
import imgOvergave from '../assets/images/modicategorieen/coping_overgave.png';
import imgBlijeKind from '../assets/images/vst/blije_kind.png';

export default function HeroTableLayout({ isHovered }) {
  const cards = [
    { type: 'mode', title: 'Straffende Ouder', color: '#ef4444', id: 'm12', src: imgStraffendeOuder, imageStyle: { transform: 'scale(1.1)' }, base: {x: -6, y: 22, r: -15}, hover: {x: -60, y: -35, r: -12} }, 
    { type: 'modicategorie', title: 'Coping: Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' }, base: {x: 8, y: 19, r: 10}, hover: {x: 60, y: -35, r: 12} }, 
    { type: 'mode', title: 'Blije Kind', color: '#10b981', id: 'm4', src: imgBlijeKind, imageStyle: { transform: 'scale(1.1)' }, base: {x: -2, y: 16, r: -4}, hover: {x: 0, y: 45, r: 0} }    
  ];

  return (
    <div style={{ 
      position: 'relative', width: '100%', height: '140px', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', marginTop: '1rem', marginBottom: '1.5rem',
      transform: 'translateY(-15px)'
    }}>
      <div style={{
        position: 'absolute', width: '170px', height: '170px', borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.05)', border: '1px dashed rgba(16, 185, 129, 0.25)',
        transform: isHovered ? 'scale(1)' : 'scale(0.9)', opacity: isHovered ? 1 : 0.8,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }} />

      <div style={{ position: 'absolute', left: 'calc(50% - 100px)', top: '30px', zIndex: 10 }}>
         <Sparkle size={20} color="#10b981" style={{ 
           opacity: isHovered ? 0.9 : 0.5, 
           transform: isHovered ? 'scale(1.1) rotate(15deg)' : 'scale(0.8) rotate(0deg)',
           transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
         }} fill="rgba(16, 185, 129, 0.2)" />
      </div>
      <div style={{ position: 'absolute', left: 'calc(50% - 85px)', bottom: '30px', zIndex: 10 }}>
         <Sparkle size={14} color="#059669" style={{ 
           opacity: isHovered ? 0.8 : 0.4,
           transform: isHovered ? 'scale(1.2) rotate(-15deg)' : 'scale(0.8) rotate(0deg)',
           transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' 
         }} fill="rgba(5, 150, 105, 0.2)" />
      </div>

      {cards.map((card, idx) => (
        <div key={idx} style={{
          position: 'absolute', width: '110px', height: '155px',
          transform: isHovered 
            ? `translate(\${card.hover.x}px, \${card.hover.y}px) rotate(\${card.hover.r}deg) scale(0.85)`
            : `translate(\${card.base.x}px, \${card.base.y}px) rotate(\${card.base.r}deg) scale(0.75)`,
          transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) \${idx * 0.05}s`, zIndex: idx
        }}>
          <div style={{
             position: 'relative',
             pointerEvents: 'none', width: '100%', height: '100%', 
             boxShadow: isHovered ? `0 15px 35px \${card.color}50` : '0 6px 15px rgba(0,0,0,0.15)',
             borderRadius: '8px',
             filter: isHovered ? 'none' : 'grayscale(1) sepia(0.2) hue-rotate(100deg) saturate(1.2) brightness(0.98)',
             transition: 'filter 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <SchemaCard 
                id={card.id} type={card.type} title={card.title} color={card.color} src={card.src}
                width="110px" height="155px" flipOnClick={false} zoomOnClick={false} isInteractive={false} imageStyle={card.imageStyle}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
