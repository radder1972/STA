import React, { useState } from 'react';
import { PrinterIcon, ThreeSparklesLogo } from './Icons';
import { FileText, Maximize, Image as ImageIcon, Info, Files, Sparkles, Layers, Package, RotateCcw, Plus, Minus } from 'lucide-react';
import { getCardColor, CardInnerBorder } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { formatCardTitle, formatCardTypeLabel, getCardTypeLetter, getCardTypeLabel, getCopingStyle, isForensicMode } from './SchemaCard';
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
  const [cardFormat, setCardFormat] = useState('a7'); // 'standard' (58x88mm) or 'a7' (70x100mm)
  const [layoutMode, setLayoutMode] = useState('duplex'); // 'duplex' (automatisch dubbelzijdig) of 'same' (enkelzijdig knippen & plakken)
  const [duplexBinding, setDuplexBinding] = useState('book'); // 'book' (Aanbevolen: korte zijde bij liggend, lange zijde bij staand) of 'calendar' (alternatief)
  const [backOffsetX, setBackOffsetX] = useState(0); // Horizontale fijn-afstelling in mm (-10 tot +10)
  const [backOffsetY, setBackOffsetY] = useState(0); // Verticale fijn-afstelling in mm (-10 tot +10)
  const [backBorderMode, setBackBorderMode] = useState('clean'); // 'clean' (vergevingsgezind zonder buitenrand) of 'border' (met buitenkader)

  const isA7 = cardFormat === 'a7';
  const cardsPerPage = isA7 ? 8 : 9;
  const cols = isA7 ? 4 : 3;
  const rows = isA7 ? 2 : 3;

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

  // 7. Classical Modi (13)
  const classicalModi = Object.keys(modeImages)
    .filter(path => !path.endsWith('/bk.png'))
    .map(path => {
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

  // Chunk cards into groups based on format (9 for standard, 4 for A7)
  const chunks = [];
  for (let i = 0; i < activeCards.length; i += cardsPerPage) {
    chunks.push(activeCards.slice(i, i + cardsPerPage));
  }

  const handlePrint = () => {
    window.print();
  };

  const getDeckSubline = () => {
    const sheetCount = chunks.length;
    const formatName = isA7 ? 'A7 • 8 per vel' : 'Speelkaart • 9 per vel';
    if (deckSelection === 'vst') return `Uitbreidingsset • 12 kaarten • ${sheetCount} vellen A4 (${formatName})`;
    if (deckSelection === 'base') return `Basisset • 43 kaarten • ${sheetCount} vellen A4 (${formatName})`;
    return `Volledige set • 55 kaarten • ${sheetCount} vellen A4 (${formatName})`;
  };

  return (
    <div className="home-print-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <style>{`
        @media print {
          @page {
            size: ${isA7 ? 'A4 landscape' : 'A4 portrait'};
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
            width: ${isA7 ? '297mm' : '210mm'} !important;
            min-height: ${isA7 ? '210mm' : '297mm'} !important;
            height: ${isA7 ? '210mm' : '297mm'} !important;
            margin: 0 !important;
            padding: ${isA7 ? '4.5mm' : '11.5mm 13mm'} !important;
            box-shadow: none !important;
            border: none !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-sizing: border-box !important;
          }
          /* Force exact sizing for A4 to prevent scaling */
          .a4-page-content {
            width: ${isA7 ? '288mm' : '184mm'} !important; 
            height: ${isA7 ? '201mm' : '274mm'} !important; 
            margin: 0 auto !important;
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
      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '840px', margin: '0 auto 2.5rem auto', padding: '2.25rem 2.75rem', borderRadius: '24px' }}>
        <div className="inner-box" style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem', margin: 0 }}>
          
          <h3 className="box-heading" style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Info size={26} color="#0ea5e9" /> Printhulp voor Thuis / Praktijk
          </h3>

          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
            Met deze weergave print je de kaarten direct op A4-papier (inkjet of laserprinter).{' '}
            {isA7 
              ? 'Gekozen: A7-formaat (70×100 mm, 8 kaarten per vel A4 liggend in een 4x2 grid). Slechts 7 vellen A4 voor alle 55 kaarten met comfortabel grote afbeeldingen en teksten.' 
              : 'Gekozen: Speelkaartformaat (58×88 mm, 9 kaarten per vel A4 staand in een 3x3 grid) voor een compact deck.'}{' '}
            {layoutMode === 'duplex' 
              ? 'De achterkanten zijn gespiegeld zodat de voor- en achterkant van elke kaart exact op elkaar aansluiten bij dubbelzijdig printen.' 
              : 'De kaarten staan op voor- en achterkant op exact dezelfde positie (geschikt om losse vellen af te drukken en op elkaar te plakken).'}
          </p>

          {/* Instellingen Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', padding: '1.25rem', background: 'rgba(0,0,0,0.03)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            
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

            {/* Setting 2: Kaartformaat Keuze */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                <Maximize size={17} color="#0ea5e9" /> Kaartformaat
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', background: 'rgba(0,0,0,0.06)', padding: '5px', borderRadius: '12px' }}>
                <button
                  type="button"
                  onClick={() => setCardFormat('a7')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: cardFormat === 'a7' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: cardFormat === 'a7' ? 'white' : 'var(--text-main)',
                    fontWeight: cardFormat === 'a7' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: cardFormat === 'a7' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>A7 Formaat</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>70×100 mm • 8/vel (Liggend)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setCardFormat('standard')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: cardFormat === 'standard' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: cardFormat === 'standard' ? 'white' : 'var(--text-main)',
                    fontWeight: cardFormat === 'standard' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: cardFormat === 'standard' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Speelkaart</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>58×88 mm • 9/vel (Staand)</div>
                </button>
              </div>
            </div>

            {/* Setting 3: Afdrukmodus (Dubbelzijdig vs Enkelzijdig) */}
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                <Files size={17} color="#0ea5e9" /> Afdrukmodus
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', background: 'rgba(0,0,0,0.06)', padding: '5px', borderRadius: '12px' }}>
                <button
                  type="button"
                  onClick={() => setLayoutMode('duplex')}
                  style={{
                    padding: '8px 6px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    background: layoutMode === 'duplex' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                    color: layoutMode === 'duplex' ? 'white' : 'var(--text-main)',
                    fontWeight: layoutMode === 'duplex' ? 'bold' : 'normal',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    boxShadow: layoutMode === 'duplex' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div>Dubbelzijdig</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>{isA7 ? 'Omdraaien korte zijde' : 'Omdraaien lange zijde'}</div>
                </button>

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
                  <div>Enkelzijdig</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Knippen & plakken</div>
                </button>
              </div>
            </div>

            {/* Setting 4: Printer-omslagrichting (alleen bij duplex) */}
            {layoutMode === 'duplex' && (
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: '600', color: 'var(--text-main)', marginBottom: '8px' }}>
                  <Files size={17} color="#0ea5e9" /> Duplex omslag in printer
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', background: 'rgba(0,0,0,0.06)', padding: '5px', borderRadius: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setDuplexBinding('book')}
                    style={{
                      padding: '8px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      background: duplexBinding === 'book' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                      color: duplexBinding === 'book' ? 'white' : 'var(--text-main)',
                      fontWeight: duplexBinding === 'book' ? 'bold' : 'normal',
                      fontSize: '0.86rem',
                      textAlign: 'center',
                      boxShadow: duplexBinding === 'book' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>{isA7 ? 'Korte zijde' : 'Lange zijde'}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Boekvorm (Aanbevolen)</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDuplexBinding('calendar')}
                    style={{
                      padding: '8px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      background: duplexBinding === 'calendar' ? 'linear-gradient(to right, #64748b, #3b82f6)' : 'transparent',
                      color: duplexBinding === 'calendar' ? 'white' : 'var(--text-main)',
                      fontWeight: duplexBinding === 'calendar' ? 'bold' : 'normal',
                      fontSize: '0.86rem',
                      textAlign: 'center',
                      boxShadow: duplexBinding === 'calendar' ? '0 2px 8px rgba(59, 130, 246, 0.25)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>{isA7 ? 'Lange zijde' : 'Korte zijde'}</div>
                    <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>Kalendervorm (Alternatief)</div>
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Printer-kalibratie & Marge-correctie */}
          <div style={{ marginTop: '0.25rem', padding: '1.25rem 1.4rem', background: 'rgba(14, 165, 233, 0.05)', borderRadius: '18px', border: '1.5px solid rgba(14, 165, 233, 0.22)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Maximize size={18} color="#0ea5e9" />
                <span style={{ fontSize: '0.96rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Printer-kalibratie & Marge-correctie
                </span>
                <span style={{ fontSize: '0.74rem', background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '999px', fontWeight: '700' }}>
                  Fijn-afstelling
                </span>
              </div>
              {(backOffsetX !== 0 || backOffsetY !== 0 || backBorderMode !== 'clean') && (
                <button
                  type="button"
                  onClick={() => { setBackOffsetX(0); setBackOffsetY(0); setBackBorderMode('clean'); }}
                  style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: '2px 6px', fontWeight: '600' }}
                >
                  <RotateCcw size={13} /> Reset naar standaard (0 mm)
                </button>
              )}
            </div>

            <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: '0 0 1rem 0' }}>
              Vrijwel elke thuisprinter trekt papier bij dubbelzijdig printen 1 tot 3 mm scheef door mechanische rol-tolerantie. Met de twee onderstaande opties sluiten jouw kaarten altijd 100% strak aan:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              
              {/* Optie 1: Rand op achterzijde */}
              <div style={{ background: 'white', padding: '1.1rem', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>1. Rand op achterzijde</span>
                  <span style={{ fontSize: '0.72rem', color: '#0284c7', fontWeight: 'normal' }}>
                    {backBorderMode === 'clean' ? '✨ Aanbevolen' : ''}
                  </span>
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => setBackBorderMode('clean')}
                    style={{
                      padding: '8px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      background: backBorderMode === 'clean' ? 'linear-gradient(to right, #0284c7, #0ea5e9)' : 'rgba(0,0,0,0.05)',
                      color: backBorderMode === 'clean' ? 'white' : 'var(--text-main)',
                      fontWeight: backBorderMode === 'clean' ? 'bold' : 'normal',
                      fontSize: '0.82rem',
                      textAlign: 'center',
                      boxShadow: backBorderMode === 'clean' ? '0 2px 6px rgba(14, 165, 233, 0.3)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>Vergevingsgezind</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>Geen strak buitenkader</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setBackBorderMode('border')}
                    style={{
                      padding: '8px 6px',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      background: backBorderMode === 'border' ? 'linear-gradient(to right, #0284c7, #0ea5e9)' : 'rgba(0,0,0,0.05)',
                      color: backBorderMode === 'border' ? 'white' : 'var(--text-main)',
                      fontWeight: backBorderMode === 'border' ? 'bold' : 'normal',
                      fontSize: '0.82rem',
                      textAlign: 'center',
                      boxShadow: backBorderMode === 'border' ? '0 2px 6px rgba(14, 165, 233, 0.3)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>Met buitenkader</div>
                    <div style={{ fontSize: '0.68rem', opacity: 0.9 }}>Klassieke gekleurde rand</div>
                  </button>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: '1.35', marginTop: '2px' }}>
                  {backBorderMode === 'clean' 
                    ? '💡 Omdat de achterkant geen strak kader heeft vlakbij de rand, valt 1 tot 3 mm printerverschuiving helemaal niet op bij het uitsnijden!' 
                    : '⚠️ Let op: Bij een fysieke printerafwijking kan de gekleurde kaderlijn aan één kant dicht op de snijrand komen.'}
                </span>
              </div>

              {/* Optie 2: Millimeter verschuiving regelaars */}
              <div style={{ background: 'white', padding: '1.1rem', borderRadius: '14px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>2. Achterkant fijn-afstellen (in mm)</span>
                  <span style={{ fontSize: '0.72rem', color: (backOffsetX !== 0 || backOffsetY !== 0) ? '#0284c7' : '#94a3b8', fontWeight: '600' }}>
                    {(backOffsetX !== 0 || backOffsetY !== 0) ? 'Actief' : '0.0 mm'}
                  </span>
                </label>

                {/* Horizontaal X */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: '0.80rem', color: 'var(--text-main)', minWidth: '95px', fontWeight: '500' }}>
                    Horizontaal (X):
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <button
                      type="button"
                      onClick={() => setBackOffsetX(prev => Math.max(-10, Math.round((prev - 0.5) * 10) / 10))}
                      style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="0.5 mm naar links"
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ minWidth: '55px', textAlign: 'center', fontSize: '0.86rem', fontWeight: '700', color: backOffsetX !== 0 ? '#0284c7' : 'var(--text-main)' }}>
                      {backOffsetX > 0 ? `+${backOffsetX.toFixed(1)}` : backOffsetX.toFixed(1)} mm
                    </span>
                    <button
                      type="button"
                      onClick={() => setBackOffsetX(prev => Math.min(10, Math.round((prev + 0.5) * 10) / 10))}
                      style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="0.5 mm naar rechts"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span style={{ fontSize: '0.70rem', color: '#64748b', minWidth: '60px', textAlign: 'right' }}>
                    {backOffsetX < 0 ? '← naar links' : (backOffsetX > 0 ? 'naar rechts →' : 'gecentreerd')}
                  </span>
                </div>

                {/* Verticaal Y */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                  <span style={{ fontSize: '0.80rem', color: 'var(--text-main)', minWidth: '95px', fontWeight: '500' }}>
                    Verticaal (Y):
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <button
                      type="button"
                      onClick={() => setBackOffsetY(prev => Math.max(-10, Math.round((prev - 0.5) * 10) / 10))}
                      style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="0.5 mm naar boven"
                    >
                      <Minus size={13} />
                    </button>
                    <span style={{ minWidth: '55px', textAlign: 'center', fontSize: '0.86rem', fontWeight: '700', color: backOffsetY !== 0 ? '#0284c7' : 'var(--text-main)' }}>
                      {backOffsetY > 0 ? `+${backOffsetY.toFixed(1)}` : backOffsetY.toFixed(1)} mm
                    </span>
                    <button
                      type="button"
                      onClick={() => setBackOffsetY(prev => Math.min(10, Math.round((prev + 0.5) * 10) / 10))}
                      style={{ width: '28px', height: '28px', borderRadius: '6px', border: '1px solid #cbd5e1', background: '#f8fafc', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      title="0.5 mm naar beneden"
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                  <span style={{ fontSize: '0.70rem', color: '#64748b', minWidth: '60px', textAlign: 'right' }}>
                    {backOffsetY < 0 ? '↑ naar boven' : (backOffsetY > 0 ? 'naar beneden ↓' : 'gecentreerd')}
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* Duplex Highlight Notice */}
          {layoutMode === 'duplex' && (
            <div style={{ padding: '0.9rem 1.15rem', background: '#eff6ff', border: '1.5px solid #93c5fd', borderRadius: '14px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Info size={22} color="#2563eb" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontSize: '0.88rem', color: '#1e3a8a', lineHeight: '1.5' }}>
                <strong>Belangrijk voor het dubbelzijdig printen ({isA7 ? 'A4 Liggend / Landscape' : 'A4 Staand / Portrait'}):</strong><br />
                Selecteer in het printvenster (onder <em>Dubbelzijdig</em> / <em>Twee-zijdig afdrukken</em>):{' '}
                <strong style={{ color: '#1d4ed8', background: '#dbeafe', padding: '2px 8px', borderRadius: '6px' }}>
                  {isA7 
                    ? (duplexBinding === 'book' ? 'Omdraaien over de KORTE zijde (Flip on short edge)' : 'Omdraaien over de LANGE zijde (Flip on long edge)') 
                    : (duplexBinding === 'book' ? 'Omdraaien over de LANGE zijde (Flip on long edge)' : 'Omdraaien over de KORTE zijde (Flip on short edge)')
                  }
                </strong>.<br />
                <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>
                  Hierdoor vallen de voorkant en achterkant van elke kaart exact op elkaar bij het omdraaien.
                </span>
              </div>
            </div>
          )}

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
                <strong>Papierformaat & Stand:</strong> {isA7 ? 'A4 Liggend (Landscape) • 297 × 210 mm' : 'A4 Staand (Portrait) • 210 × 297 mm'}
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Maximize size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Schaal & Marges:</strong> Schaal op 100% (of 'Aanpassen aan pagina' uitschakelen). Marges op <strong>Geen</strong> (essentieel voor uitlijning!)
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Files size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>{layoutMode === 'duplex' ? 'Dubbelzijdig afdrukken:' : 'Afdrukmodus:'}</strong>{' '}
                {layoutMode === 'duplex' 
                  ? (isA7 
                      ? (duplexBinding === 'book' ? 'Omdraaien over de KORTE zijde (Flip on short edge)' : 'Omdraaien over de LANGE zijde (Flip on long edge)') 
                      : (duplexBinding === 'book' ? 'Omdraaien over de LANGE zijde (Flip on long edge)' : 'Omdraaien over de KORTE zijde (Flip on short edge)'))
                  : 'Enkelzijdig printen (vellen los afdrukken, knippen & op elkaar plakken)'
                }
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <ImageIcon size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Achtergrondafbeeldingen:</strong> AAN (noodzakelijk voor kaartkleuren en kaders)
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Layers size={20} color="#0ea5e9" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Snij-tip:</strong> Snijd de kaarten altijd uit vanaf de <u>voorkant</u> van het vel (langs de stippellijnen). Met de optie <em>Vergevingsgezind</em> sluit de achterkant altijd strak en naadloos aan.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Pages Container */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {chunks.map((chunk, chunkIdx) => {
          // Fill slots up to cardsPerPage so empty slots on the last page maintain consistent grid structure
          const frontChunk = [];
          for (let i = 0; i < cardsPerPage; i++) {
            frontChunk.push(chunk[i] || null);
          }

          // Reorder the back page according to layoutMode and duplexBinding
          const backChunk = [];
          for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
              let originalIndex;
              if (layoutMode === 'duplex') {
                if (isA7) {
                  // A7 Landscape (4 cols x 2 rows)
                  if (duplexBinding === 'book') {
                    // Omdraaien over korte zijde (Flip on short edge / Boekvorm):
                    // Rijen blijven hetzelfde, kolommen spiegelen horizontaal (0<->3, 1<->2)
                    originalIndex = row * cols + (cols - 1 - col);
                  } else {
                    // Omdraaien over lange zijde (Flip on long edge / Kalendervorm):
                    // Rijen wisselen om (0<->1), kolommen blijven gelijk
                    originalIndex = (rows - 1 - row) * cols + col;
                  }
                } else {
                  // Speelkaart Portrait (3 cols x 3 rows)
                  if (duplexBinding === 'book') {
                    // Omdraaien over lange zijde (Flip on long edge / Boekvorm):
                    // Rijen blijven hetzelfde, kolommen spiegelen horizontaal (0<->2, 1 blijft 1)
                    originalIndex = row * cols + (cols - 1 - col);
                  } else {
                    // Omdraaien over korte zijde (Flip on short edge / Kalendervorm):
                    // Rijen wisselen om (0<->2, 1 blijft 1), kolommen blijven gelijk
                    originalIndex = (rows - 1 - row) * cols + col;
                  }
                }
              } else {
                // 'same': 1-op-1 positie voor knippen & plakken
                originalIndex = row * cols + col;
              }

              backChunk.push({
                card: chunk[originalIndex] || null,
                frontSlotNum: chunk[originalIndex] ? originalIndex + 1 : null
              });
            }
          }

          const cardCount = chunk.filter(Boolean).length;

          return (
            <React.Fragment key={chunkIdx}>
              {/* PAGE INDICATOR (PREVIEW ONLY) */}
              <div className="no-print" style={{ width: isA7 ? '297mm' : '210mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 -1.25rem 0', padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Vel {chunkIdx + 1} van {chunks.length} • Voorkanten ({isA7 ? 'A7 Formaat • 8/vel' : 'Speelkaart • 9/vel'})</span>
                <span>{cardCount} {cardCount === 1 ? 'kaart' : 'kaarten'}</span>
              </div>

              {/* PAGE: FRONTS */}
              <div className="a4-page" style={{ width: isA7 ? '297mm' : '210mm', height: isA7 ? '210mm' : '297mm', background: 'white', padding: isA7 ? '4.5mm' : '11.5mm 13mm', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <div className="a4-page-content" style={{ display: 'grid', gridTemplateColumns: isA7 ? 'repeat(4, 70.5mm)' : 'repeat(3, 58mm)', gridTemplateRows: isA7 ? 'repeat(2, 99.5mm)' : 'repeat(3, 88mm)', gap: isA7 ? '2mm' : '5mm', justifyContent: 'center', alignContent: 'center', height: '100%', margin: '0 auto' }}>
                  {frontChunk.map((card, i) => {
                    const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'white';
                    return (
                    <div key={`front-${i}`} style={{ width: isA7 ? '70.5mm' : '58mm', height: isA7 ? '99.5mm' : '88mm', border: card ? '1px dashed #ccc' : 'none', boxSizing: 'border-box', position: 'relative', background: card ? `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)` : 'transparent', borderRadius: 0, overflow: 'hidden', visibility: card ? 'visible' : 'hidden' }}>
                      {card && (
                        <>
                          {/* Preview helper: Slot number */}
                          <div className="no-print" style={{ position: 'absolute', top: '3px', left: '5px', padding: '2px 5px', background: 'rgba(0,0,0,0.06)', borderRadius: '4px', fontSize: '0.62rem', fontWeight: '700', color: '#475569', zIndex: 40, lineHeight: 1 }}>
                            Vak #{i + 1}
                          </div>

                          <CardInnerBorder color={cardColor} outerColor="white" radius="0" />
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: isA7 ? '1.5mm' : '1mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Header (Badge) */}
                            {card.type && getCardTypeLetter(card.type) && (
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color: cardColor, lineHeight: 1.1, zIndex: 10, marginTop: card.src ? (isA7 ? '8mm' : '7mm') : (isA7 ? '12mm' : '11mm') }}>
                                <span style={{ fontSize: card.src ? (isA7 ? '15px' : '14px') : (isA7 ? '20px' : '18px'), display: 'flex', alignItems: 'center', justifyContent: 'center', width: card.src ? (isA7 ? '10mm' : '9mm') : (isA7 ? '13mm' : '12mm'), height: card.src ? (isA7 ? '10mm' : '9mm') : (isA7 ? '13mm' : '12mm'), borderRadius: '50%', backgroundColor: 'black', color: 'white', marginBottom: isA7 ? '1.8mm' : '1.5mm', boxSizing: 'border-box' }}>{getCardTypeLetter(card.type)}</span>
                                <span style={{ fontSize: card.src ? (isA7 ? '12px' : '11px') : (isA7 ? '14px' : '13px'), marginTop: '1mm', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black', fontWeight: 'bold' }}>{formatCardTypeLabel(getCardTypeLabel(card.type, card.title, card.id))}</span>
                                {getCardTypeLabel(card.type, card.title, card.id) === 'Copingmodus' && getCopingStyle(card.title, card.id) && (
                                  <span style={{ fontSize: card.src ? (isA7 ? '10.5px' : '9.5px') : (isA7 ? '12.5px' : '11.5px'), textTransform: 'uppercase', letterSpacing: '0.6px', color: 'black', fontWeight: '600', marginTop: isA7 ? '1.8mm' : '1.5mm', opacity: 0.9 }}>
                                    {getCopingStyle(card.title, card.id)}
                                  </span>
                                )}
                                {isForensicMode(card.title, card.id) && (
                                  <span style={{ fontSize: card.src ? (isA7 ? '10px' : '9px') : (isA7 ? '11.5px' : '11px'), textTransform: 'uppercase', letterSpacing: '0.8px', color: 'black', fontWeight: 'bold', marginTop: isA7 ? '2.5mm' : '2.5mm', opacity: 0.85 }}>
                                    FORENSISCH
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Image Container */}
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0, width: '100%' }}>
                              {card.src && <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: isA7 ? 'scale(1.20)' : 'scale(1.18)', imageRendering: '-webkit-optimize-contrast', ...card.style }} />}
                            </div>

                            {/* Footer (Title) */}
                            {card.title && (
                              <div style={{ textAlign: 'center', fontSize: isA7 ? '0.96rem' : '0.85rem', fontWeight: 'bold', color: 'black', margin: isA7 ? '2mm 0 6mm 0' : '2mm 0 6mm 0', lineHeight: '1.2', height: isA7 ? '11mm' : '10mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
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
              <div className="no-print" style={{ width: isA7 ? '297mm' : '210mm', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0 -1.25rem 0', padding: '0 4px', color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Vel {chunkIdx + 1} van {chunks.length} • Achterkanten ({isA7 ? 'A7 Formaat • 8/vel' : 'Speelkaart • 9/vel'})</span>
                <span style={{ fontSize: '0.82rem', background: 'rgba(0,0,0,0.06)', padding: '2px 8px', borderRadius: '4px' }}>
                  {layoutMode === 'same' 
                    ? 'Zelfde positie als voorkant (knippen & plakken)' 
                    : (isA7 
                        ? (duplexBinding === 'book' ? 'Horizontaal gespiegeld (duplex korte zijde)' : 'Verticaal gespiegeld (duplex lange zijde)')
                        : (duplexBinding === 'book' ? 'Horizontaal gespiegeld (duplex lange zijde)' : 'Verticaal gespiegeld (duplex korte zijde)'))
                  }
                </span>
              </div>

              {/* PAGE: BACKS */}
              <div className="a4-page" style={{ width: isA7 ? '297mm' : '210mm', height: isA7 ? '210mm' : '297mm', background: 'white', padding: isA7 ? '4.5mm' : '11.5mm 13mm', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <div 
                  className="a4-page-content" 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: isA7 ? 'repeat(4, 70.5mm)' : 'repeat(3, 58mm)', 
                    gridTemplateRows: isA7 ? 'repeat(2, 99.5mm)' : 'repeat(3, 88mm)', 
                    gap: isA7 ? '2mm' : '5mm', 
                    justifyContent: 'center', 
                    alignContent: 'center', 
                    height: '100%', 
                    margin: '0 auto',
                    position: 'relative',
                    left: `${backOffsetX}mm`,
                    top: `${backOffsetY}mm`,
                    transition: 'left 0.1s ease, top 0.1s ease'
                  }}
                >
                  {backChunk.map((slotItem, i) => {
                    const card = slotItem.card;
                    const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'white';
                    const descFontSize = isA7 ? '0.94rem' : '0.80rem';
                    const descLineHeight = isA7 ? '1.44' : '1.35';

                    return (
                    <div key={`back-${i}`} style={{ width: isA7 ? '70.5mm' : '58mm', height: isA7 ? '99.5mm' : '88mm', border: card ? (backBorderMode === 'border' ? '1px dashed #ccc' : 'none') : 'none', boxSizing: 'border-box', visibility: card ? 'visible' : 'hidden', position: 'relative', background: 'white', borderRadius: 0, overflow: 'hidden' }}>
                      {card && (
                        <>
                          {/* Preview helper: Front slot match & active offset */}
                          <div className="no-print" style={{ position: 'absolute', top: '3px', left: '5px', right: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 5px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '0.60rem', fontWeight: '700', color: '#15803d', zIndex: 40, lineHeight: 1 }}>
                            <span>{layoutMode === 'duplex' ? '🔄 Duplex' : '📋 Los vel'}</span>
                            <span>Achterzijde van Vak #{slotItem.frontSlotNum} {(backOffsetX !== 0 || backOffsetY !== 0) ? `(${backOffsetX > 0 ? '+' : ''}${backOffsetX}mm X, ${backOffsetY > 0 ? '+' : ''}${backOffsetY}mm Y)` : ''}</span>
                          </div>

                          {backBorderMode === 'border' && (
                            <CardInnerBorder color={cardColor} outerColor="white" radius="0" />
                          )}
                          <div style={{ 
                            position: 'absolute', 
                            top: 0, 
                            left: 0, 
                            right: 0, 
                            bottom: 0, 
                            padding: isA7 ? (backBorderMode === 'clean' ? '7.5mm 9mm 5mm 9mm' : '7mm 8.5mm 4.5mm 8.5mm') : (backBorderMode === 'clean' ? '7mm 8mm 5mm 8mm' : '6.5mm 8mm'), 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            justifyContent: 'flex-start', 
                            boxSizing: 'border-box' 
                          }}>
                            <h4 style={{ 
                              margin: 0, 
                              fontSize: isA7 ? '1.04rem' : '0.85rem', 
                              color: 'black', 
                              textAlign: 'center', 
                              width: '100%', 
                              lineHeight: '1.18', 
                              fontWeight: 800, 
                              letterSpacing: '-0.2px',
                              flexShrink: 0,
                              zIndex: 1,
                              height: isA7 ? '10mm' : '8.5mm',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}>
                              {formatCardTitle(card.title)}
                            </h4>
                            <div style={{ 
                              width: '100%', 
                              height: isA7 ? '2.5px' : '2px', 
                              backgroundColor: cardColor, 
                              margin: isA7 ? '2.8mm 0' : '2.5mm 0', 
                              flexShrink: 0, 
                              zIndex: 1 
                            }} />
                            <div style={{ 
                              fontSize: descFontSize, 
                              fontWeight: 'normal', 
                              lineHeight: descLineHeight, 
                              color: '#111', 
                              margin: '0', 
                              paddingBottom: isA7 ? '6mm' : '6mm',
                              textAlign: 'center', 
                              flexShrink: 0, 
                              zIndex: 1 
                            }}>
                              {card.description}
                            </div>

                            <div style={{
                              position: 'absolute',
                              bottom: isA7 ? '3.5mm' : '3mm',
                              left: 0,
                              right: 0,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              zIndex: 1
                            }}>
                              <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                                background: '#f4f4f5',
                                border: '1px solid #e4e4e7',
                                borderRadius: '999px',
                                padding: isA7 ? '2.5px 7px' : '2px 5px',
                                WebkitPrintColorAdjust: 'exact',
                                printColorAdjust: 'exact'
                              }}>
                                <ThreeSparklesLogo size={isA7 ? 9 : 8} theme="test" />
                                <span style={{ 
                                  fontSize: isA7 ? '0.46rem' : '0.4rem', 
                                  fontWeight: 700, 
                                  color: '#52525b',
                                  lineHeight: 1,
                                  letterSpacing: '-0.2px',
                                  WebkitPrintColorAdjust: 'exact',
                                  printColorAdjust: 'exact'
                                }}>Schematherapie Suite</span>
                              </div>
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
