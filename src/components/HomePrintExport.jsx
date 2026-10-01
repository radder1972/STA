import React, { useState } from 'react';
import { PrinterIcon } from './Icons';
import { FileText, Maximize, Image as ImageIcon, Info, Files, Sparkles, Layers, Package } from 'lucide-react';
import { getCardColor, CardInnerBorder } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { formatCardTitle, getCardTypeLetter, getCardTypeLabel } from './SchemaCard';
import { schemaDescriptions } from '../data/descriptions';
import {
  ysqSchemaNamesMap,
  smiModesMap,
  schemaSortOrder,
  modeSortOrder,
  basisbehoeftenData,
  modicategorieenData,
  vstBasisbehoeftenData,
  vstSchemaData,
  vstCopingData,
  vstModiData
} from '../data/cards';

export default function HomePrintExport({ onBack, onViewPrintShop }) {
  const [deckSelection, setDeckSelection] = useState('all'); // 'all', 'vst', 'base'
  const [layoutMode, setLayoutMode] = useState('same'); // 'same' (1-op-1 uitlijning voor knippen & plakken / scherm) of 'mirrored' (duplex)

  // 1. Classical Basisbehoeften (5)
  const classicalBasisbehoeften = basisbehoeftenData.map(c => ({
    ...c,
    type: 'basisbehoefte',
    style: { transform: 'scale(0.85)' }
  }));

  // 2. VSt Basisbehoeften (2)
  const vstBasisbehoeften = vstBasisbehoeftenData.map(c => ({
    ...c,
    type: 'basisbehoefte',
    style: { transform: 'scale(0.85)' }
  }));

  // 3. Classical Schemas (18)
  const classicalSchemas = Object.keys(schemaImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
    return { 
      id: filename, 
      type: 'schema', 
      src: schemaImages[path], 
      title, 
      description: schemaDescriptions[title], 
      style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' } 
    };
  }).sort((a, b) => {
    const indexA = schemaSortOrder.indexOf(a.title);
    const indexB = schemaSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // 4. VSt Schemas (3)
  const vstSchemas = vstSchemaData.map(c => ({
    ...c,
    type: 'schema',
    style: c.style || { transform: 'scale(0.75)' }
  }));

  // 5. Classical Modi Categorieën (6)
  const classicalModiCategorieen = modicategorieenData.map(c => ({
    ...c,
    type: 'modicategorie',
    style: { transform: 'scale(0.85)' }
  }));

  // 6. VSt Coping Categorie (1)
  const vstCoping = vstCopingData.map(c => ({
    ...c,
    type: 'modicategorie',
    style: c.style || { transform: 'scale(0.75)' }
  }));

  // 7. Classical Modi (14)
  const classicalModi = Object.keys(modeImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = smiModesMap[filename] || filename;
    return { 
      id: filename, 
      type: 'mode', 
      src: modeImages[path], 
      title, 
      description: schemaDescriptions[title], 
      style: { transform: 'scale(1.1)' } 
    };
  }).sort((a, b) => {
    const indexA = modeSortOrder.indexOf(a.title);
    const indexB = modeSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // 8. VSt Modi (6)
  const vstModi = vstModiData.map(c => ({
    ...c,
    type: 'mode',
    style: c.style || { transform: 'scale(0.70)' }
  }));

  // Construct decks
  const baseCards = [
    ...classicalBasisbehoeften,
    ...classicalSchemas,
    ...classicalModiCategorieen,
    ...classicalModi
  ];

  const vstCards = [
    ...vstBasisbehoeften,
    ...vstSchemas,
    ...vstCoping,
    ...vstModi
  ];

  // Full set: cleanly integrated per category
  const allCards = [
    ...classicalBasisbehoeften,
    ...vstBasisbehoeften,
    ...classicalSchemas,
    ...vstSchemas,
    ...classicalModiCategorieen,
    ...vstCoping,
    ...classicalModi,
    ...vstModi
  ];

  // Ensure every card has its designated color
  [...baseCards, ...vstCards].forEach(card => {
    if (!card.color) {
      card.color = getCardColor(card.type, card.id);
    }
  });

  // Determine active cards based on user selection
  const activeCards = deckSelection === 'vst' ? vstCards : (deckSelection === 'base' ? baseCards : allCards);

  // Chunk cards into groups of 9 (3x3 grid for A4)
  const chunks = [];
  for (let i = 0; i < activeCards.length; i += 9) {
    chunks.push(activeCards.slice(i, i + 9));
  }

  const handlePrint = () => {
    window.print();
  };

  const getDeckSubline = () => {
    if (deckSelection === 'vst') return 'Uitbreidingsset • 12 kaarten • 2 vellen A4';
    if (deckSelection === 'base') return 'Basisset • 43 kaarten • 5 vellen A4';
    return 'Volledige set • 55 kaarten • 7 vellen A4';
  };

  return (
    <div className="home-print-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .home-print-container {
            padding: 0 !important;
            background: white !important;
          }
          .a4-page {
            page-break-after: always;
            break-after: page;
            width: 210mm !important;
            min-height: 290mm !important;
            height: auto !important;
            margin: 0 !important;
            padding-top: 11mm !important;
            padding-bottom: 0 !important;
            padding-left: 13mm !important;
            padding-right: 0 !important;
            box-shadow: none !important;
            border: none !important;
            display: block !important;
            box-sizing: border-box !important;
          }
          /* Force exact sizing for A4 to prevent scaling */
          .a4-page-content {
            width: 184mm !important; 
            height: 274mm !important; 
            margin: 0 !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '2.5rem', width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <PrinterIcon size={40} useGameGradient={true} /> Printen
        </h1>
        <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>Druk je eigen kaarten af</h2>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button onClick={onViewPrintShop} className="btn btn-outline" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Drukkerij
          </button>
          <button className="btn btn-gradient-game" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Thuisprint
          </button>
        </div>
      </div>

      {/* Printhulp Box met geïntegreerde instellingen */}
      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '820px', margin: '0 auto 2.5rem auto', padding: '2.5rem 3rem', borderRadius: '24px' }}>
        <div className="inner-box" style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', margin: 0 }}>
          
          <h3 className="box-heading" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Info size={26} color="#0ea5e9" /> Printhulp voor Thuis / Praktijk
          </h3>

          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
            Met deze weergave print je de kaarten direct op A4-papier (inkjet of laserprinter). De kaarten staan in een 3x3 grid (9 kaarten per vel). {layoutMode === 'same' ? 'De kaarten staan op voor- en achterkant op exact dezelfde plek (ideaal voor wie losse vellen afdrukt om uit te knippen en op elkaar te plakken).' : 'De achterkanten zijn horizontaal gespiegeld voor automatische dubbelzijdige invoer via de lange zijde.'}
          </p>

          {/* Instellingen Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', padding: '1.25rem', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            
            {/* Setting 1: Kaartenset Keuze */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                <Layers size={17} color="#0ea5e9" /> Kaartenset
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', background: 'rgba(0,0,0,0.06)', padding: '5px', borderRadius: '12px' }}>
                <button
                  type="button"
                  onClick={() => setDeckSelection('all')}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: deckSelection === 'all' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: deckSelection === 'all' ? 'white' : 'var(--text-main)',
                    fontWeight: deckSelection === 'all' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: deckSelection === 'all' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Volledig</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>55 kaarten</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeckSelection('vst')}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: deckSelection === 'vst' ? '#ea580c' : 'transparent',
                    color: deckSelection === 'vst' ? 'white' : 'var(--text-main)',
                    fontWeight: deckSelection === 'vst' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: deckSelection === 'vst' ? '0 2px 8px rgba(234, 88, 12, 0.35)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Uitbreiding</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>12 kaarten</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeckSelection('base')}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: deckSelection === 'base' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: deckSelection === 'base' ? 'white' : 'var(--text-main)',
                    fontWeight: deckSelection === 'base' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: deckSelection === 'base' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Basisdeck</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>43 kaarten</div>
                </button>
              </div>
            </div>

            {/* Setting 2: Uitlijning achterkant */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                <Files size={17} color="#0ea5e9" /> Uitlijning achterzijde
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', background: 'rgba(0,0,0,0.06)', padding: '5px', borderRadius: '12px' }}>
                <button
                  type="button"
                  onClick={() => setLayoutMode('same')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: layoutMode === 'same' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: layoutMode === 'same' ? 'white' : 'var(--text-main)',
                    fontWeight: layoutMode === 'same' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: layoutMode === 'same' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Zelfde positie</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Knippen & plakken</div>
                </button>

                <button
                  type="button"
                  onClick={() => setLayoutMode('mirrored')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: layoutMode === 'mirrored' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: layoutMode === 'mirrored' ? 'white' : 'var(--text-main)',
                    fontWeight: layoutMode === 'mirrored' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: layoutMode === 'mirrored' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Gespiegeld</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Duplex lange zijde</div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Action Button */}
          <button 
            onClick={handlePrint} 
            className="btn btn-gradient-game" 
            style={{ 
              width: '100%', 
              padding: '0.95rem 1.5rem', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '14px', 
              borderRadius: '14px',
              cursor: 'pointer',
              border: 'none'
            }}
          >
            <PrinterIcon size={26} style={{ flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '1.25' }}>
              <span style={{ fontSize: '1.22rem', fontWeight: '700', letterSpacing: '-0.01em' }}>
                Print PDF
              </span>
              <span style={{ fontSize: '0.86rem', fontWeight: '500', opacity: 0.9, marginTop: '3px' }}>
                {getDeckSubline()}
              </span>
            </div>
          </button>

          {/* Volledige Checklist / Tips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', marginTop: '0.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <FileText size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Papierformaat:</strong> A4 Staand (Portrait)
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Maximize size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Schaal & Marges:</strong> Schaal op 100% (of Standaard). Marges op <strong>Geen</strong> (essentieel voor uitlijning!)
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Files size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>{layoutMode === 'mirrored' ? 'Dubbelzijdig:' : 'Afdrukmodus:'}</strong> {layoutMode === 'mirrored' ? 'Omdraaien over de lange zijde (Long edge binding)' : 'Enkelzijdig printen (vellen los afdrukken, knippen & op elkaar plakken)'}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <ImageIcon size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Achtergrondafbeeldingen:</strong> AAN
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Pages Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {chunks.map((chunk, chunkIdx) => {
          // Both front and back pages must have exactly 9 slots (3x3) so empty rows on the last page
          // don't cause vertical misalignment between front and back
          const frontChunk = [];
          for (let i = 0; i < 9; i++) {
            frontChunk.push(chunk[i] || null);
          }

          // Reorder the back page according to layoutMode
          const backChunk = [];
          if (layoutMode === 'mirrored') {
            for (let row = 0; row < 3; row++) {
              for (let col = 0; col < 3; col++) {
                const originalIndex = row * 3 + (2 - col);
                backChunk.push(chunk[originalIndex] || null); // null for empty slots on last page
              }
            }
          } else {
            // 'same': exact identical positions on front and back
            for (let i = 0; i < 9; i++) {
              backChunk.push(chunk[i] || null);
            }
          }

          const cardCount = chunk.filter(Boolean).length;

          return (
            <React.Fragment key={chunkIdx}>
              {/* PAGE INDICATOR (PREVIEW ONLY) */}
              <div className="no-print" style={{ width: '210mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 -1.25rem 0', padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Vel {chunkIdx + 1} van {chunks.length} • Voorkanten</span>
                <span>{cardCount} {cardCount === 1 ? 'kaart' : 'kaarten'}</span>
              </div>

              {/* PAGE: FRONTS */}
              <div className="a4-page" style={{ width: '210mm', height: '297mm', background: 'white', padding: '10mm', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <div className="a4-page-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58mm)', gridTemplateRows: 'repeat(3, 88mm)', gap: '5mm', justifyContent: 'center', alignContent: 'start', height: '100%' }}>
                  {frontChunk.map((card, i) => {
                    const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'white';
                    return (
                    <div key={`front-${i}`} style={{ width: '58mm', height: '88mm', border: card ? '1px dashed #ccc' : 'none', boxSizing: 'border-box', position: 'relative', background: card ? `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)` : 'transparent', borderRadius: '6px', overflow: 'hidden', visibility: card ? 'visible' : 'hidden' }}>
                      {card && (
                        <>
                          <CardInnerBorder color={cardColor} outerColor="white" />
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Header (Badge) */}
                            {card.type && getCardTypeLetter(card.type) && (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color: cardColor, lineHeight: 1.1, zIndex: 10, marginTop: card.src ? '7mm' : '11mm' }}>
                                <span style={{ fontSize: card.src ? '14px' : '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: card.src ? '9mm' : '12mm', height: card.src ? '9mm' : '12mm', borderRadius: '50%', backgroundColor: 'black', color: 'white', marginBottom: '1.5mm', boxSizing: 'border-box' }}>{getCardTypeLetter(card.type)}</span>
                                <span style={{ fontSize: card.src ? '11px' : '13px', marginTop: '1mm', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black', fontWeight: 'bold' }}>{getCardTypeLabel(card.type)}</span>
                              </div>
                            )}

                            {/* Image Container */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0, width: '100%' }}>
                              {card.src && <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', imageRendering: '-webkit-optimize-contrast', ...card.style }} />}
                            </div>

                            {/* Footer (Title) */}
                            {card.title && (
                              <div style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold', color: 'black', margin: '2mm 0 6mm 0', lineHeight: '1.2', height: '10mm', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                {formatCardTitle(card.title)}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  )})}
                </div>
              </div>

              {/* PAGE INDICATOR (PREVIEW ONLY) */}
              <div className="no-print" style={{ width: '210mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 -1.25rem 0', padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Vel {chunkIdx + 1} van {chunks.length} • Achterkanten</span>
                <span style={{ fontSize: '0.82rem', background: 'rgba(0,0,0,0.06)', padding: '2px 8px', borderRadius: '6px' }}>
                  {layoutMode === 'same' ? 'Zelfde positie als voorkant' : 'Horizontaal gespiegeld (duplex)'}
                </span>
              </div>

              {/* PAGE: BACKS */}
              <div className="a4-page" style={{ width: '210mm', height: '297mm', background: 'white', padding: '10mm', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <div className="a4-page-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58mm)', gridTemplateRows: 'repeat(3, 88mm)', gap: '5mm', justifyContent: 'center', alignContent: 'start', height: '100%' }}>
                  {backChunk.map((card, i) => {
                    const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'white';
                    const descFontSize = '0.80rem';
                    const descLineHeight = '1.28';

                    return (
                    <div key={`back-${i}`} style={{ width: '58mm', height: '88mm', border: card ? '1px dashed #ccc' : 'none', boxSizing: 'border-box', visibility: card ? 'visible' : 'hidden', position: 'relative', background: 'white', borderRadius: '6px', overflow: 'hidden' }}>
                      {card && (
                        <>
                          <CardInnerBorder color={cardColor} />
                          <div style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            padding: '6.5mm 5mm', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'flex-start', 
                            boxSizing: 'border-box' 
                          }}>
                            <div style={{ 
                              height: '9.5mm', 
                              width: '100%', 
                              display: 'flex', 
                              flexDirection: 'column', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              borderBottom: `2px solid ${cardColor}`, 
                              paddingBottom: '1.5mm', 
                              margin: '0 0 2.5mm 0', 
                              boxSizing: 'border-box', 
                              flexShrink: 0, 
                              zIndex: 1 
                            }}>
                              <h4 style={{ 
                                margin: 0, 
                                fontSize: '0.85rem', 
                                color: 'black', 
                                textAlign: 'center', 
                                width: '100%', 
                                lineHeight: '1.15', 
                                fontWeight: 800,
                                letterSpacing: '-0.2px' 
                              }}>
                                {formatCardTitle(card.title)}
                              </h4>
                            </div>
                            <div style={{ 
                              fontSize: descFontSize, 
                              fontWeight: 'normal', 
                              lineHeight: descLineHeight, 
                              color: '#111', 
                              margin: '0', 
                              textAlign: 'center', 
                              flexShrink: 0, 
                              zIndex: 1 
                            }}>
                              {card.description}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  )})}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
