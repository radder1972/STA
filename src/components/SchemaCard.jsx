import React, { useState } from 'react';

import { CardInnerBorder } from '../utils/colors';

const formatCardTitle = (title) => {
  if (!title) return title;
  
  if (title.includes('/')) {
    const parts = title.split('/');
    return (
      <>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            {part.trim()}
            {index < parts.length - 1 && (
              <>
                {' /'}
                <br />
              </>
            )}
          </React.Fragment>
        ))}
      </>
    );
  }

  const words = title.trim().split(/\s+/);
  if (words.length === 2) {
    return <>{words[0]}<br />{words[1]}</>;
  }
  return title;
};

const getCardTypeLetter = (type) => {
  if (type === 'schema') return 'S';
  if (type === 'mode') return 'M';
  if (type === 'basisbehoefte') return 'B';
  if (type === 'modicategorie') return 'C';
  return '';
};

const getCardTypeLabel = (type) => {
  if (type === 'schema') return "Schema's";
  if (type === 'mode') return "Modi";
  if (type === 'basisbehoefte') return "Basisbehoeften";
  if (type === 'modicategorie') return "Categorieën";
  return '';
};

const SchemaCard = ({ 
  id, 
  type, 
  title, 
  description, 
  src, 
  color = '#94a3b8', 
  width = '150px', 
  height = '213px', 
  flipOnClick = true,
  isFlipped = undefined,
  onToggleFlip = undefined,
  rotation = 0,
  style = {},
  imageStyle = {},
  className = '',
  onClick = undefined
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);

  const flipped = isFlipped !== undefined ? isFlipped : internalFlipped;

  const handleFlip = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (flipOnClick) {
      if (onToggleFlip) {
        onToggleFlip();
      } else {
        setInternalFlipped(!internalFlipped);
      }
    }
  };

  const widthNum = parseFloat(width) || 150;
  const s = widthNum / 150;

  const isInteractive = flipOnClick || onClick;

  return (
    <div className={`card-scene ${className}`} style={{ width, height, position: 'relative', transform: `rotate(${rotation}deg)`, pointerEvents: isInteractive ? 'auto' : 'none', ...style }} title={flipOnClick ? "Klik om te draaien voor theorie" : ""}>
      <div className={`card-flip-container ${flipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
        
        {/* Front */}
        <div className="card-face-front schema-img playing-card" onClick={handleFlip} style={{ padding: '12px', boxSizing: 'border-box', cursor: flipOnClick || onClick ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', background: `linear-gradient(180deg, ${color}25 0%, white 50%)` }}>
          <CardInnerBorder color={color} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: src ? `${28 * s}px ${8 * s}px 0 ${8 * s}px` : '0' }}>
            {src && <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...imageStyle }} />}
          </div>
          {type && getCardTypeLetter(type) && !src && (
              <div style={{ position: 'absolute', top: `${14 * s}px`, left: `${14 * s}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color, lineHeight: 1.1, zIndex: 10 }}>
                <span style={{ fontSize: `${1.2 * s}rem` }}>{getCardTypeLetter(type)}</span>
                <span style={{ fontSize: `${0.35 * s}rem`, marginTop: `${2 * s}px`, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{getCardTypeLabel(type)}</span>
              </div>
          )}
          {type && getCardTypeLetter(type) && src && (
              <div style={{ position: 'absolute', top: `${10 * s}px`, left: `${12 * s}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color, lineHeight: 1.1, zIndex: 10 }}>
                <span style={{ fontSize: `${1.0 * s}rem` }}>{getCardTypeLetter(type)}</span>
                <span style={{ fontSize: `${0.3 * s}rem`, marginTop: `${2 * s}px`, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{getCardTypeLabel(type)}</span>
              </div>
          )}
          {title && (
            <div style={{ textAlign: 'center', fontSize: `${0.75 * s}rem`, fontWeight: 'bold', margin: `${4 * s}px 0 ${16 * s}px 0`, lineHeight: '1.2' }}>
              {formatCardTitle(title)}
            </div>
          )}
        </div>

        {/* Back */}
        <div className="card-face-back playing-card" onClick={handleFlip} style={{ display: 'flex', flexDirection: 'column', cursor: flipOnClick || onClick ? 'pointer' : 'default', padding: `${12 * s}px`, background: `radial-gradient(circle at center, white 50%, ${color}20 120%)`, boxSizing: 'border-box' }}>
          <CardInnerBorder color={color} />
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: `0 ${6 * s}px` }}>
            {title && (
              <h4 style={{ 
                fontSize: `${0.75 * s}rem`, 
                marginTop: `${10 * s}px`, 
                marginBottom: `${2 * s}px`, 
                paddingBottom: `${6 * s}px`, 
                borderBottom: `1px solid ${color && color.startsWith('#') ? color + '50' : 'rgba(0,0,0,0.15)'}`,
                lineHeight: '1.2', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center' 
              }}>
                {title}
              </h4>
            )}
            <p style={{ fontSize: `${0.6 * s}rem`, lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 11, WebkitBoxOrient: 'vertical', margin: 0, paddingBottom: `${6 * s}px` }}>
              {description || (title ? 'Geen theorie beschikbaar.' : '')}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SchemaCard;
