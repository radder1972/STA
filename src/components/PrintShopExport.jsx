import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, PrinterIcon } from './Icons';
import { FileText, Maximize, Image as ImageIcon, Info } from 'lucide-react';
import { getCardColor, CardInnerBorder } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { schemaDescriptions } from '../data/descriptions';
import { formatCardTitle, getCardTypeLetter, getCardTypeLabel } from './SchemaCard';
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

export default function PrintShopExport({ onBack, onViewHomePrintExport }) {
  const [deckSelection, setDeckSelection] = useState('all'); // 'all', 'vst', 'base'

  useEffect(() => {
    document.body.classList.add('print-shop-export-mode');
    return () => {
      document.body.classList.remove('print-shop-export-mode');
    };
  }, []);

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
    style: { transform: 'scale(1)' }
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
    style: { transform: 'scale(0.85)' }
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
    style: { transform: 'scale(1.1)' }
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

  const handlePrint = () => {
    window.print();
  };

  const getDeckButtonTitle = () => {
    if (deckSelection === 'vst') return 'VSt 2021 Uitbreiding (12 kaarten • 24 pagina\'s)';
    if (deckSelection === 'base') return 'Basisdeck (43 kaarten • 86 pagina\'s)';
    return 'Volledige Set (55 kaarten • 110 pagina\'s)';
  };

  return (
    <div className="print-shop-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <style>{`
        @media print {
          @page {
            size: 64mm 94mm;
            margin: 0;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .print-shop-container {
            padding: 0 !important;
            background: white !important;
          }
          .print-shop-pages {
            display: block !important;
            gap: 0 !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '2.5rem', width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <PrinterIcon size={40} useGameGradient={true} /> Printen
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>Druk je eigen kaarten af</h2>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button className="btn btn-gradient-game" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Drukkerij
          </button>
          <button onClick={onViewHomePrintExport} className="btn btn-outline" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Thuisprint
          </button>
        </div>
      </div>

      {/* Deck Selector Panel */}
      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', padding: '2rem 2.5rem', borderRadius: '24px' }}>
        <h3 style={{ fontSize: '1.15rem', margin: '0 0 1rem 0', color: 'var(--text-main)', textAlign: 'center', fontWeight: '600' }}>
          Welke kaartenset wil je exporteren voor de drukker?
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>
          <button
            onClick={() => setDeckSelection('all')}
            className={`btn ${deckSelection === 'all' ? 'btn-gradient-game' : 'btn-outline'}`}
            style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px',
              border: deckSelection === 'all' ? 'none' : '1px solid #cbd5e1',
              boxShadow: deckSelection === 'all' ? '0 8px 20px rgba(59, 130, 246, 0.35)' : 'none',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>🌟 Volledige Set</span>
            <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>55 kaarten • 110 pagina's</span>
          </button>

          <button
            onClick={() => setDeckSelection('vst')}
            className={`btn ${deckSelection === 'vst' ? 'btn-gradient-game' : 'btn-outline'}`}
            style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px',
              border: deckSelection === 'vst' ? 'none' : '1px solid #cbd5e1',
              boxShadow: deckSelection === 'vst' ? '0 8px 20px rgba(59, 130, 246, 0.35)' : 'none',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>🚀 VSt 2021 Uitbreiding</span>
            <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>12 kaarten • 24 pagina's</span>
          </button>

          <button
            onClick={() => setDeckSelection('base')}
            className={`btn ${deckSelection === 'base' ? 'btn-gradient-game' : 'btn-outline'}`}
            style={{ 
              padding: '1rem', 
              borderRadius: '16px', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              gap: '4px',
              border: deckSelection === 'base' ? 'none' : '1px solid #cbd5e1',
              boxShadow: deckSelection === 'base' ? '0 8px 20px rgba(59, 130, 246, 0.35)' : 'none',
              cursor: 'pointer'
            }}
          >
            <span style={{ fontWeight: 'bold', fontSize: '1rem' }}>📦 Alleen Basisdeck</span>
            <span style={{ fontSize: '0.82rem', opacity: 0.9 }}>43 kaarten • 86 pagina's</span>
          </button>
        </div>

        {deckSelection === 'vst' && (
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '0.85rem 1.2rem', color: '#166534', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center' }}>
            💡 <strong>Uitbreidingsset geselecteerd:</strong> Exporteert alleen de 12 officiële VSt 2021 kaarten (recto en verso inclusief 3mm afloop). Ideaal voor professionele kaartensites (zoals MakePlayingCards) om een losse uitbreidingsbooster te laten drukken!
          </div>
        )}
        {deckSelection === 'all' && (
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px', padding: '0.85rem 1.2rem', color: '#1e40af', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center' }}>
            💡 <strong>Volledige Set geselecteerd:</strong> Exporteert 55 kaarten (110 pagina's recto/verso) met 3mm bleed rondom.
          </div>
        )}
        {deckSelection === 'base' && (
          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.85rem 1.2rem', color: '#334155', fontSize: '0.9rem', lineHeight: '1.5', textAlign: 'center' }}>
            💡 <strong>Klassiek Basisdeck geselecteerd:</strong> Exporteert de 43 klassieke theoriekaarten (86 pagina's recto/verso).
          </div>
        )}
      </div>

      {/* Printhulp Box */}
      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2.5rem auto', padding: '2.5rem 3rem', borderRadius: '24px' }}>
        <div className="inner-box" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
          <h3 className="box-heading" style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Info size={26} color="#3b82f6" /> Printhulp voor Drukkerijen
          </h3>
          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
            Deze weergave is geoptimaliseerd voor professionele drukkerijen. Het papierformaat voor de PDF is ingesteld op <strong>Speelkaarten formaat (64x94mm inclusief 3mm afloop rondom)</strong>. Na het printen snijdt de drukker er rondom 3mm af, zodat de kaarten exact 58x88mm worden zonder witte randjes. Klik op de knop hieronder en kies "Opslaan als PDF" in Chrome.
          </p>

          <button onClick={handlePrint} className="btn btn-gradient" style={{ width: '100%', padding: '1.1rem', fontSize: '1.15rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', borderRadius: '14px' }}>
            <PrinterIcon size={22} /> Genereer Print-PDF ({getDeckButtonTitle()})
          </button>

          <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <FileText size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Papierformaat:</strong> Aangepast (wordt automatisch door de browser ingesteld op 64x94mm)
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Maximize size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Marges:</strong> Geen
              </p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <ImageIcon size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
                <strong>Achtergrondafbeeldingen:</strong> AAN
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Pages Container */}
      <div className="print-shop-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {activeCards.map((card, idx) => {
          const cardColor = card.color || getCardColor(card.type, card.id);
          const descLength = card?.description?.length || 0;
          const descFontSize = descLength > 160 ? '0.78rem' : (descLength > 120 ? '0.84rem' : '0.88rem');
          const descLineHeight = descLength > 160 ? '1.3' : '1.38';

          return (
            <React.Fragment key={idx}>
              {/* VOORKANT */}
              <div className="print-shop-page card-front">
                <div className="print-shop-bleed" style={{ background: `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)`, position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', borderRadius: '6px' }}>
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
                        {card.src && <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', ...card.style }} />}
                      </div>

                      {/* Footer (Title) */}
                      {card.title && (
                        <div style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 'bold', color: 'black', margin: '2mm 0 6mm 0', lineHeight: '1.2', height: '10mm', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                          {formatCardTitle(card.title)}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* ACHTERKANT */}
              <div className="print-shop-page card-back" style={{ background: 'white' }}>
                <div className="print-shop-bleed" style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: 'white', borderRadius: '6px' }}>
                    <CardInnerBorder color={cardColor} />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '5mm 8mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                      <div style={{ height: '18mm', width: '100%', display: 'flex', alignItems: 'flex-end', borderBottom: `2px solid ${cardColor}`, paddingBottom: '3mm', margin: '0 0 4mm 0', flexShrink: 0, zIndex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: '0.88rem', color: 'black', textAlign: 'center', width: '100%', lineHeight: '1.2' }}>
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
                  </div>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
