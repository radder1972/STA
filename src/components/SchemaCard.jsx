import React, { useState } from 'react';

import { CardInnerBorder } from '../utils/colors';

export const formatCardTitle = (title) => {
  if (!title) return title;
  
  // 1. Zich rechten toe-eigenen: exact 2 regels en 'toe-eigenen' nooit afbreken
  if (title === 'Zich rechten toe-eigenen' || title.toLowerCase().includes('rechten toe')) {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Zich rechten</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>toe&#8209;eigenen</span>
      </span>
    );
  }

  // 2. Spontaniteit & Spel: exact 2 regels
  if (
    title === 'Spontaniteit & Spel' ||
    title === 'Spontaniteit en spel' ||
    title.toLowerCase().includes('spontaniteit')
  ) {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Spontaniteit &</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>Spel</span>
      </span>
    );
  }

  // 3. Gebrek aan zelfcontrole / Zelfdiscipline: exact 2 regels, gelijke kopgrootte
  if (
    title === 'Gebrek aan zelfcontrole / Zelfdiscipline' ||
    title === 'Gebrek aan zelfcontrole/zelfdiscipline' ||
    title.startsWith('Gebrek aan zelfcontrole')
  ) {
    const isLower = title.includes('zelfdiscipline') && !title.includes('Zelfdiscipline');
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Gebrek aan zelfcontrole /</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>{isLower ? 'zelfdiscipline' : 'Zelfdiscipline'}</span>
      </span>
    );
  }

  // 4. Gebrek aan coherente identiteit: op 2 regels, gelijke kopgrootte
  if (title === 'Gebrek aan coherente identiteit') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Gebrek aan coherente</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>identiteit</span>
      </span>
    );
  }

  // 5. Gebrek aan (een) betekenisvolle wereld: op 2 regels, gelijke kopgrootte
  if (title.startsWith('Gebrek aan') && title.includes('wereld')) {
    const isEen = title.includes('een');
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{isEen ? 'Gebrek aan een' : 'Gebrek aan'}</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>betekenisvolle wereld</span>
      </span>
    );
  }

  // 6. Meedogenloze normen / Overmatig kritisch: op 2 regels, gelijke kopgrootte
  if (title.startsWith('Meedogenloze normen')) {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Meedogenloze normen /</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>Overmatig kritisch</span>
      </span>
    );
  }

  if (title === 'Kwetsbaarheid voor ziekte en gevaar') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Kwetsbaarheid voor</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>ziekte en gevaar</span>
      </span>
    );
  }
  
  // 7. Als een kop een / bevat (zoals twee woorden met een /): ALTIJD over twee regels
  if (title.includes('/')) {
    const parts = title.split('/').map(p => p.trim());
    if (parts.length === 2) {
      return (
        <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{parts[0]} /</span>
          <br />
          <span style={{ whiteSpace: 'nowrap' }}>{parts[1]}</span>
        </span>
      );
    }
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        {parts.map((part, index) => (
          <React.Fragment key={index}>
            <span style={{ whiteSpace: 'nowrap' }}>{part}{index < parts.length - 1 ? ' /' : ''}</span>
            {index < parts.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    );
  }

  const words = title.trim().split(/\s+/);
  if (words.length === 2) {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{words[0]}</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>{words[1]}</span>
      </span>
    );
  }

  if (title === 'Veiligheid & Verbinding') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Veiligheid &</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>Verbinding</span>
      </span>
    );
  }

  if (title === 'Autonomie & Competentie') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Autonomie &</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>Competentie</span>
      </span>
    );
  }

  if (title === 'Vrijheid van expressie') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Vrijheid van</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>expressie</span>
      </span>
    );
  }

  if (title === 'Aandacht- en erkenningzoeker') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Aandacht- en</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>erkenningzoeker</span>
      </span>
    );
  }

  if (title === 'Bedrog en manipulatie') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Bedrog en</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>manipulatie</span>
      </span>
    );
  }

  if (title === 'Perfectionistische overcontroleerder') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Perfectionistische</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>overcontroleerder</span>
      </span>
    );
  }

  if (title === 'Wantrouwende overcontroleerder') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Wantrouwende</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>overcontroleerder</span>
      </span>
    );
  }

  return title;
};

export const getCardTypeLetter = (type) => {
  if (type === 'schema') return 'S';
  if (type === 'mode') return 'M';
  if (type === 'basisbehoefte') return 'B';
  if (type === 'modicategorie') return 'C';
  return '';
};

export const getCardTypeLabel = (type) => {
  if (type === 'schema') return "Schema";
  if (type === 'mode') return "Modus";
  if (type === 'basisbehoefte') return "Basisbehoefte";
  if (type === 'modicategorie') return "Categorie";
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

  const descText = description || (title ? 'Geen theorie beschikbaar.' : '');
  // Uniforme typografie voor alle kaarten
  const descSize = 0.58;
  const descLineHeight = 1.30;
  const lineClamp = 13;

  return (
    <div className={`card-scene ${className}`} style={{ width, height, position: 'relative', transform: `rotate(${rotation}deg)`, pointerEvents: isInteractive ? 'auto' : 'none', ...style }} title={flipOnClick ? "Klik om te draaien voor theorie" : ""}>
      <div className={`card-flip-container ${flipped ? 'flipped' : ''}`} style={{ width: '100%', height: '100%' }}>
        
        {/* Front */}
        <div className="card-face-front schema-img playing-card" onClick={handleFlip} style={{ padding: '12px', boxSizing: 'border-box', cursor: flipOnClick || onClick ? 'pointer' : 'default', display: 'flex', flexDirection: 'column', backgroundColor: 'white', backgroundImage: `radial-gradient(circle at center, white 20%, ${color}40 120%)` }}>
          <CardInnerBorder color={color} outerColor="white" />
          
          {/* Header (Badge) */}
          {type && getCardTypeLetter(type) && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color, lineHeight: 1.1, zIndex: 10, marginTop: src ? `${12 * s}px` : `${16 * s}px` }}>
              <span style={{ fontSize: src ? `${0.8 * s}rem` : `${1.0 * s}rem`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: src ? `${1.4 * s}rem` : `${1.8 * s}rem`, height: src ? `${1.4 * s}rem` : `${1.8 * s}rem`, borderRadius: '50%', backgroundColor: 'black', color: 'white', marginBottom: `${4 * s}px`, boxSizing: 'border-box' }}>{getCardTypeLetter(type)}</span>
              <span style={{ fontSize: src ? `${0.48 * s}rem` : `${0.55 * s}rem`, marginTop: `${2 * s}px`, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black' }}>{getCardTypeLabel(type)}</span>
            </div>
          )}

          {/* Image Container (Flex 1 ensures exact centering between Header and Footer) */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 }}>
            {src && <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', imageRendering: '-webkit-optimize-contrast', ...imageStyle }} />}
          </div>

          {/* Footer (Title) */}
          {title && (
            <div style={{ textAlign: 'center', fontSize: `${0.75 * s}rem`, fontWeight: '900', color: 'black', margin: `${4 * s}px 0 ${16 * s}px 0`, lineHeight: '1.2', height: `${1.8 * s}rem` }}>
              {formatCardTitle(title)}
            </div>
          )}
        </div>

        {/* Back */}
        <div className="card-face-back playing-card" onClick={handleFlip} style={{ display: 'flex', flexDirection: 'column', cursor: flipOnClick || onClick ? 'pointer' : 'default', padding: `${8 * s}px`, backgroundColor: 'white', backgroundImage: `radial-gradient(circle at center, white 50%, ${color}30 120%)`, boxSizing: 'border-box' }}>
          <CardInnerBorder color={color} />
          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: `0 ${11 * s}px` }}>
            {title && (
              <h4 style={{ 
                fontSize: `${0.75 * s}rem`, 
                marginTop: `${12 * s}px`, 
                marginBottom: `${4 * s}px`, 
                paddingBottom: `${4 * s}px`, 
                borderBottom: `1px solid ${color && color.startsWith('#') ? color + '50' : 'rgba(0,0,0,0.15)'}`,
                lineHeight: '1.2', 
                height: `${2.0 * s}rem`,
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center', 
                justifyContent: 'center', 
                textAlign: 'center' 
              }}>
                {formatCardTitle(title)}
              </h4>
            )}
            <div className="card-desc" style={{ fontSize: `${descSize * s}rem`, lineHeight: descLineHeight, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: lineClamp, WebkitBoxOrient: 'vertical', margin: 0, paddingBottom: `${6 * s}px`, textAlign: 'center' }}>
              {descText}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SchemaCard;
