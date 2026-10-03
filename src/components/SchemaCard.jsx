import React, { useState } from 'react';

import { CardInnerBorder } from '../utils/colors';

export const formatCardTitle = (title) => {
  if (!title) return title;
  
  if (title === 'Disfunctionele kindmodi' || title.toLowerCase() === 'disfunctionele kindmodi') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Disfunctionele</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>kindmodi</span>
      </span>
    );
  }

  if (title === 'Disfunctionele oudermodi' || title.toLowerCase() === 'disfunctionele oudermodi') {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Disfunctionele</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>oudermodi</span>
      </span>
    );
  }
  
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
  if (type === 'basisbehoefte' || type === 'need') return 'B';
  if (type === 'modicategorie') return 'C';
  return '';
};

export const isForensicMode = (title = '', id = '') => {
  const t = (title || '').toLowerCase();
  const i = (id || '').toLowerCase();
  return (
    i === 'vst_m_bm' || i === 'vst_m_rd' || i === 'vst_m_bb' || i === 'pa' ||
    t.includes('bedrog') || t.includes('roofdier') || t.includes('pest') || t.includes('boze beschermer')
  );
};

export const formatCardTypeLabel = (label) => {
  if (!label || typeof label !== 'string') return label;
  
  if (label.includes(' ')) {
    const parts = label.split(' ');
    return (
      <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.1', textAlign: 'center' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{parts[0]}</span>
        <span style={{ whiteSpace: 'nowrap' }}>{parts.slice(1).join(' ')}</span>
      </span>
    );
  }
  return label;
};

export const getCopingStyle = (title = '', id = '') => {
  const t = (title || '').toLowerCase();
  const i = (id || '').toLowerCase();
  
  if (t.includes('inschikkelijke') || i === 'wi') {
    return 'OVERGAVE';
  }
  if (
    t.includes('onthechte') || 
    t.includes('boze beschermer') || 
    i === 'ob' || 
    i === 'oz' || 
    i === 'bb' || 
    i === 'vst_m_bb'
  ) {
    return 'VERMIJDING';
  }
  if (
    t.includes('overcontroleerder') || 
    t.includes('zelfverheerlijker') || 
    t.includes('pest') || 
    t.includes('bedrog') || 
    t.includes('erkenningzoeker') || 
    t.includes('roofdier') || 
    i === 'wk' || 
    i === 'zh' || 
    i === 'pa' || 
    i === 'vst_m_wo' || 
    i === 'vst_m_po' || 
    i === 'vst_m_zh' || 
    i === 'vst_m_pa' || 
    i === 'vst_m_bm' || 
    i === 'vst_m_az' || 
    i === 'vst_m_rd'
  ) {
    return 'OVERCOMPENSATIE';
  }
  return null;
};

export const getCardTypeLabel = (type, title = '', id = '') => {
  if (type === 'schema') return "Schema";
  if (type === 'basisbehoefte' || type === 'need') return "Basisbehoefte";
  if (type === 'modicategorie') return "Modus Categorie";
  if (type === 'mode') {
    const t = (title || '').toLowerCase();
    if (t.includes('kind')) {
      if (t.includes('blije kind')) return "Functionele Modus";
      return "Disfunctionele Kindmodus";
    }
    if (t.includes('ouder')) return "Disfunctionele Oudermodus";
    if (t.includes('volwassene')) return "Functionele Modus";
    return "Copingmodus";
  }
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
  flipOnHover = false,
  zoomOnClick = true,
  isFlipped = undefined,
  onToggleFlip = undefined,
  rotation = 0,
  style = {},
  imageStyle = {},
  className = '',
  onClick = undefined
}) => {
  const [internalFlipped, setInternalFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const flipped = isFlipped !== undefined ? isFlipped : internalFlipped;

  React.useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsZoomed(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (flipOnHover) {
      if (onToggleFlip) {
        onToggleFlip(true);
      } else {
        setInternalFlipped(true);
      }
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (flipOnHover) {
      if (onToggleFlip) {
        onToggleFlip(false);
      } else {
        setInternalFlipped(false);
      }
    }
  };

  const handleFlip = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (zoomOnClick) {
      setIsZoomed(true);
      return;
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

  const isInteractive = flipOnClick || zoomOnClick || flipOnHover || onClick;

  const descText = description || (title ? 'Geen theorie beschikbaar.' : '');

  return (
    <>
      <div 
        className={`card-scene ${className}`} 
        onClick={handleFlip}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ 
          width, 
          height, 
          position: 'relative', 
          transform: isHovered && flipOnHover 
            ? `rotate(${rotation}deg) scale(1.28) translateY(-10px)` 
            : `rotate(${rotation}deg) scale(1)`, 
          zIndex: isHovered ? 50 : 1,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.25, 0.64, 1), z-index 0.1s ease',
          pointerEvents: isInteractive ? 'auto' : 'none', 
          filter: isHovered && flipOnHover ? 'drop-shadow(0 20px 30px rgba(0,0,0,0.35))' : 'none',
          ...style 
        }} 
        title={zoomOnClick ? "Klik om te vergroten en te lezen" : flipOnHover ? "Beweeg muis over kaart voor 3D theorie-kaartslag" : flipOnClick ? "Klik om te draaien voor theorie" : ""}
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
              cursor: isInteractive ? 'pointer' : 'default', 
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
                  <span style={{ fontSize: src ? `${11 * scaleRatio}px` : `${13 * scaleRatio}px`, marginTop: `${(1 / 58) * widthNum}px`, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black', fontWeight: 'bold' }}>{formatCardTypeLabel(getCardTypeLabel(type, title, id))}</span>
                  {getCardTypeLabel(type, title, id) === 'Copingmodus' && getCopingStyle(title, id) && (
                    <span style={{ fontSize: src ? `${9.5 * scaleRatio}px` : `${11.5 * scaleRatio}px`, textTransform: 'uppercase', letterSpacing: '0.6px', color: 'black', fontWeight: '600', marginTop: `${(1.5 / 58) * widthNum}px`, opacity: 0.9 }}>
                      {getCopingStyle(title, id)}
                    </span>
                  )}
                  {isForensicMode(title, id) && (
                    <span style={{ fontSize: src ? `${9 * scaleRatio}px` : `${11 * scaleRatio}px`, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'black', fontWeight: 'bold', marginTop: `${(2.5 / 58) * widthNum}px`, opacity: 0.85 }}>
                      FORENSISCH
                    </span>
                  )}
                </div>
              )}

              {/* Image Container */}
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
              cursor: isInteractive ? 'pointer' : 'default', 
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
                lineHeight: '1.38', 
                color: '#111', 
                margin: 0, 
                padding: 0,
                paddingBottom: `${(7 / 58) * widthNum}px`,
                textAlign: 'center', 
                flexShrink: 0, 
                zIndex: 1,
                maxHeight: '100%',
                overflowY: 'auto'
              }}>
                {descText}
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {isZoomed && (
        <div 
          className="no-print"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem'
          }}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false);
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.25rem',
              maxWidth: '90vw'
            }}
          >
            <button
              onClick={() => setIsZoomed(false)}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#ef4444',
                color: 'white',
                border: '3px solid white',
                fontSize: '1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                zIndex: 100001,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1
              }}
              title="Sluiten"
            >
              &times;
            </button>

            <SchemaCard
              id={id}
              type={type}
              title={title}
              description={description}
              src={src}
              color={color}
              width="360px"
              height="511px"
              imageStyle={imageStyle}
              flipOnClick={true}
              zoomOnClick={false}
            />

            <div style={{ color: 'white', fontSize: '0.95rem', fontWeight: '500', opacity: 0.95, textAlign: 'center', background: 'rgba(0,0,0,0.6)', padding: '8px 20px', borderRadius: '20px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }}>
              🔄 Tik op de kaart om hem om te draaien voor theorie
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SchemaCard;
