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

  // 8. Als er 'en' in de kop staat: ALTIJD over twee regels
  if (/\ben\b/i.test(title)) {
    if (title === 'Goedkeuring en erkenning zoeken') {
      return (
        <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
          <span style={{ whiteSpace: 'nowrap' }}>Goedkeuring en</span>
          <br />
          <span style={{ whiteSpace: 'nowrap' }}>erkenning zoeken</span>
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
    if (title.includes('- en')) {
      const parts = title.split(/- en\s*/i);
      return (
        <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{parts[0]}- en</span>
          <br />
          <span style={{ whiteSpace: 'nowrap' }}>{parts[1]}</span>
        </span>
      );
    }
    const enIndex = title.toLowerCase().indexOf(' en ');
    if (enIndex !== -1) {
      const part1 = title.substring(0, enIndex + 3).trim();
      const part2 = title.substring(enIndex + 4).trim();
      return (
        <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
          <span style={{ whiteSpace: 'nowrap' }}>{part1}</span>
          <br />
          <span style={{ whiteSpace: 'nowrap' }}>{part2}</span>
        </span>
      );
    }
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
  const scaleRatio = widthNum / 219.2; // 219.2px corresponds to 58mm at standard 96 DPI

  const isInteractive = flipOnClick || onClick;

  const descText = description || (title ? 'Geen theorie beschikbaar.' : '');

  return (
    <div 
      className={`card-scene ${className}`} 
      onClick={handleFlip}
      style={{ width, height, position: 'relative', transform: `rotate(${rotation}deg)`, pointerEvents: isInteractive ? 'auto' : 'none', ...style }} 
      title={flipOnClick ? "Klik om te draaien voor theorie" : ""}
    >
      <div 
        className={`card-flip-container ${flipped ? 'flipped' : ''}`} 
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          WebkitTransformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          WebkitTransform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        
        {/* Front */}
        <div 
          className="card-face-front schema-img playing-card" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            padding: 0, 
            boxSizing: 'border-box', 
            cursor: flipOnClick || onClick ? 'pointer' : 'default', 
            display: 'flex', 
            flexDirection: 'column', 
            backgroundColor: 'white', 
            backgroundImage: `radial-gradient(circle at center, white 30%, ${color}50 130%)`,
            overflow: 'hidden',
            borderRadius: `${Math.max(4, Math.round(6 * scaleRatio))}px`
          }}
        >
          <CardInnerBorder color={color} outerColor="white" />
          
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            padding: `${(1 / 58) * widthNum}px`,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxSizing: 'border-box'
          }}>
            {/* Header (Badge) */}
            {type && getCardTypeLetter(type) && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color, lineHeight: 1.1, zIndex: 10, marginTop: src ? `${(7 / 58) * widthNum}px` : `${(11 / 58) * widthNum}px` }}>
                <span style={{ fontSize: src ? `${14 * scaleRatio}px` : `${18 * scaleRatio}px`, display: 'flex', alignItems: 'center', justifyContent: 'center', width: src ? `${(9 / 58) * widthNum}px` : `${(12 / 58) * widthNum}px`, height: src ? `${(9 / 58) * widthNum}px` : `${(12 / 58) * widthNum}px`, borderRadius: '50%', backgroundColor: 'black', color: 'white', marginBottom: `${(1.5 / 58) * widthNum}px`, boxSizing: 'border-box' }}>{getCardTypeLetter(type)}</span>
                <span style={{ fontSize: src ? `${11 * scaleRatio}px` : `${13 * scaleRatio}px`, marginTop: `${(1 / 58) * widthNum}px`, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black', fontWeight: 'bold' }}>{getCardTypeLabel(type)}</span>
              </div>
            )}

            {/* Image Container (Flex 1 ensures exact centering between Header and Footer) */}
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0, width: '100%' }}>
              {src && <img src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', imageRendering: '-webkit-optimize-contrast', ...imageStyle }} />}
            </div>

            {/* Footer (Title) */}
            {title && (
              <div style={{ textAlign: 'center', fontSize: `${0.85 * scaleRatio}rem`, fontWeight: 'bold', color: 'black', margin: `${(2 / 58) * widthNum}px 0 ${(6 / 58) * widthNum}px 0`, lineHeight: '1.2', height: `${(10 / 58) * widthNum}px`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
                {formatCardTitle(title)}
              </div>
            )}
          </div>
        </div>

        {/* Back */}
        <div 
          className="card-face-back playing-card" 
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            transform: 'rotateY(180deg)',
            WebkitTransform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            padding: 0, 
            display: 'flex', 
            flexDirection: 'column', 
            cursor: flipOnClick || onClick ? 'pointer' : 'default', 
            backgroundColor: 'white', 
            overflow: 'hidden', 
            boxSizing: 'border-box',
            borderRadius: `${Math.max(4, Math.round(6 * scaleRatio))}px`
          }}
        >
          <CardInnerBorder color={color} />
          <div style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            padding: `${(6.5 / 58) * widthNum}px ${(8.0 / 58) * widthNum}px`, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'flex-start', 
            boxSizing: 'border-box' 
          }}>
            {title && (
              <h4 style={{ 
                margin: 0, 
                padding: 0,
                border: 'none',
                borderBottom: 'none',
                fontSize: `${0.85 * scaleRatio}rem`, 
                color: 'black', 
                textAlign: 'center', 
                width: '100%', 
                lineHeight: '1.18', 
                fontWeight: 800, 
                letterSpacing: '-0.2px', 
                flexShrink: 0, 
                zIndex: 1, 
                height: `${(8.5 / 58) * widthNum}px`, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                {formatCardTitle(title)}
              </h4>
            )}
            <div style={{ 
              width: '100%', 
              height: `${Math.max(2, Math.round(2 * scaleRatio))}px`, 
              backgroundColor: color, 
              margin: `${(2.5 / 58) * widthNum}px 0`, 
              flexShrink: 0, 
              zIndex: 1 
            }} />
            <div className="card-desc" style={{ 
              fontSize: `${0.80 * scaleRatio}rem`, 
              fontWeight: 'normal', 
              lineHeight: '1.35', 
              color: '#111', 
              margin: 0, 
              padding: 0,
              paddingTop: 0,
              textAlign: 'center', 
              flexShrink: 0, 
              zIndex: 1 
            }}>
              {descText}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default SchemaCard;
