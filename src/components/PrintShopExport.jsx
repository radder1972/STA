import React, { useEffect } from 'react';
import { ArrowLeftIcon } from './Icons';
import { getCardColor, CardInnerBorder } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { schemaDescriptions } from '../data/descriptions';
import { getVerdieping } from '../data/verdieping';

import {
  ysqSchemaNamesMap,
  smiModesMap,
  schemaSortOrder,
  modeSortOrder,
  basisbehoeftenData,
  modicategorieenData
} from '../data/cards';

import imgB1 from '../assets/images/basisbehoeften/1.png'
import imgB2 from '../assets/images/basisbehoeften/2.png'
import imgB3 from '../assets/images/basisbehoeften/3.png'
import imgB4 from '../assets/images/basisbehoeften/4.png'
import imgB5 from '../assets/images/basisbehoeften/5.png'

import imgM1 from '../assets/images/modicategorieen/1.png'
import imgM2 from '../assets/images/modicategorieen/2.png'
import imgM3a from '../assets/images/modicategorieen/coping_overgave.png'
import imgM3b from '../assets/images/modicategorieen/coping_vermijding.png'
import imgM3c from '../assets/images/modicategorieen/coping_overcompensatie.png'
import imgM4 from '../assets/images/modicategorieen/4.png'

const formatCardTitle = (title) => {
  if (!title) return title;
  
  if (title === 'Kwetsbaarheid voor ziekte en gevaar') {
    return <>Kwetsbaarheid voor ziekte<br />en gevaar</>;
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

export default function PrintShopExport({ onBack, onViewHomePrintExport }) {
  useEffect(() => {
    document.body.classList.add('print-shop-export-mode');
    return () => {
      document.body.classList.remove('print-shop-export-mode');
    };
  }, []);

  // Assemble all cards
  const allCards = [];

  // 1. Basisbehoeften
  allCards.push(...basisbehoeftenData.map(c => ({...c, type: 'basisbehoefte', style: {transform: 'scale(0.85)'}})));

  // 2. Schemas
  const schemas = Object.keys(schemaImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
    return { 
      id: filename, type: 'schema', src: schemaImages[path], title, 
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
  allCards.push(...schemas);

  // 3. Modi Categorieën
  allCards.push(...modicategorieenData.map(c => ({...c, type: 'modicategorie', style: {transform: 'scale(0.85)'}})));

  // 4. Modi
  const modi = Object.keys(modeImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = smiModesMap[filename] || filename;
    return { id: filename, type: 'mode', src: modeImages[path], title, description: schemaDescriptions[title], style: { transform: 'scale(1.1)' } };
  }).sort((a, b) => {
    const indexA = modeSortOrder.indexOf(a.title);
    const indexB = modeSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
  allCards.push(...modi);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-shop-container" style={{ background: '#f0f0f0', minHeight: '100vh', padding: '1rem' }}>
      <style>{`
        @media print {
          @page {
            size: 64mm 94mm;
            margin: 0;
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
      <div className="no-print" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>

        <h1 style={{ color: 'black', marginBottom: '1rem' }}>Print Shop Export (PeterPrint)</h1>
        <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '1rem' }}>
          Dit is de verborgen generator voor professionele drukkerijen. Het papierformaat voor de PDF is ingesteld op <strong>Speelkaarten formaat (64x94mm inclusief 3mm afloop rondom)</strong>. Na het printen snijdt de drukker er rondom 3mm af, zodat de kaarten exact 58x88mm worden zonder witte randjes.
        </p>
        <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '1rem' }}>
          Druk op de knop hieronder en kies "Opslaan als PDF" in Chrome. Zorg dat je de volgende print-instellingen gebruikt:
          <br/><br/>
          - <strong>Papierformaat:</strong> Aangepast (wordt automatisch door de browser geregeld, indien mogelijk, anders laat staan)<br/>
          - <strong>Marges:</strong> Geen<br/>
          - <strong>Achtergrondafbeeldingen:</strong> AAN<br/>
        </p>
        <button onClick={handlePrint} className="btn btn-gradient" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Genereer Print-PDF (PeterPrint)
        </button>
        <button onClick={onViewHomePrintExport} className="btn btn-outline" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
          Naar A4 Thuisprint Export
        </button>
      </div>

      <div className="print-shop-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {allCards.map((card, idx) => {
          const cardColor = card.color || getCardColor(card.type, card.id);
          const verdieping = getVerdieping(card.title) || {};
          return (
            <React.Fragment key={idx}>
              {/* VOORKANT */}
              <div className="print-shop-page card-front">
                <div className="print-shop-bleed" style={{ background: 'white', position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: '3mm', left: '3mm', right: '3mm', bottom: '3mm', background: `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)`, borderRadius: '6px' }}>
                    <CardInnerBorder color={cardColor} outerColor="white" />
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '1mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Header (Badge) */}
                      {card.type && getCardTypeLetter(card.type) && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color: cardColor, lineHeight: 1.1, zIndex: 10, marginTop: card.src ? '4mm' : '8mm' }}>
                          <span style={{ fontSize: card.src ? '14px' : '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: card.src ? '9mm' : '12mm', height: card.src ? '9mm' : '12mm', borderRadius: '50%', backgroundColor: 'black', color: 'white', marginBottom: '1.5mm', boxSizing: 'border-box' }}>{getCardTypeLetter(card.type)}</span>
                          <span style={{ fontSize: card.src ? '5.5px' : '6.5px', marginTop: '1mm', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black' }}>{getCardTypeLabel(card.type)}</span>
                        </div>
                      )}

                      {/* Image Container */}
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0, width: '100%' }}>
                        {card.src && <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', ...card.style }} />}
                      </div>

                      {/* Footer (Title) */}
                      {card.title && (
                        <div style={{ textAlign: 'center', fontSize: '10.5px', fontWeight: '900', color: 'black', margin: '2mm 0 6mm 0', lineHeight: '1.2', height: '10mm', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '5mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                      <h4 style={{ margin: '0 0 4mm 0', fontSize: '0.9rem', color: 'black', borderBottom: `2px solid ${cardColor}`, paddingBottom: '3mm', textAlign: 'center', width: '100%', flexShrink: 0, zIndex: 1 }}>
                        {formatCardTitle(card.title)}
                      </h4>
                      <p style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#111', margin: '0 0 6mm 0', textAlign: 'center', flexShrink: 0, zIndex: 1 }}>
                        {card.description}
                      </p>
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
