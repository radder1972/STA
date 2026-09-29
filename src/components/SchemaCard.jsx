import React, { useState } from 'react';

const CardInnerBorder = ({ color }) => (
  <div style={{ position: 'absolute', top: '4px', left: '4px', right: '4px', bottom: '4px', border: `2px solid ${color}`, borderRadius: '4px', pointerEvents: 'none' }}></div>
);

const formatCardTitle = (title) => {
  if (!title) return title;
  const words = title.trim().split(/\s+/);
  if (words.length === 2) {
    return <>{words[0]}<br />{words[1]}</>;
  }
  return title;
};

const SchemaCard = ({ 
  id, 
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

  return (
    <div className={`card-scene ${className}`} style={{ width, height, position: 'relative', transform: `rotate(${rotation}deg)`, ...style }} title={flipOnClick ? "Klik om te draaien voor theorie" : ""}>
      <div className={`card-flip-container ${flipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
        
        {/* Front */}
        <div className="card-face-front schema-img playing-card" onClick={handleFlip} style={{ padding: '12px', boxSizing: 'border-box', cursor: flipOnClick || onClick ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', background: 'white' }}>
          <CardInnerBorder color={color} />
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...imageStyle }} />
          </div>
          {title && (
            <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '8px 0 2px 0', lineHeight: '1.2' }}>
              {formatCardTitle(title)}
            </div>
          )}
        </div>

        {/* Back */}
        <div className="card-face-back playing-card" onClick={handleFlip} style={{ display: 'flex', flexDirection: 'column', cursor: flipOnClick || onClick ? 'pointer' : 'default', padding: '12px', background: 'white', boxSizing: 'border-box' }}>
          <CardInnerBorder color={color} />
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            {title && (
              <h4 style={{ fontSize: '0.75rem', marginTop: '0.2rem', marginBottom: '0.2rem', lineHeight: '1.2', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                {title}
              </h4>
            )}
            <p style={{ fontSize: '0.6rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 10, WebkitBoxOrient: 'vertical', margin: 0 }}>
              {description || (title ? 'Geen theorie beschikbaar.' : '')}
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SchemaCard;
