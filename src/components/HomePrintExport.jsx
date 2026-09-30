import React, { useState } from 'react';
import { ArrowLeftIcon, PrinterIcon } from './Icons';
import { FileText, Maximize, Image as ImageIcon, Info, Files } from 'lucide-react';
import { getCardColor } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { formatCardTitle, getCardTypeLetter, getCardTypeLabel } from './SchemaCard';
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

import { CardInnerBorder } from '../utils/colors';


export default function HomePrintExport({ onBack, onViewPrintShop }) {
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

  // Set color correctly like PrintShopExport does
  allCards.forEach(card => {
    if (!card.color) {
      card.color = getCardColor(card.type, card.id);
    }
  });


  // Chunk cards into groups of 9 (3x3 grid)
  const chunks = [];
  for (let i = 0; i < allCards.length; i += 9) {
    chunks.push(allCards.slice(i, i + 9));
  }

  const [filter, setFilter] = useState('optie1');
  const handlePrint = () => {
    window.print();
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

      <div className="no-print" style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <PrinterIcon size={40} useGameGradient={true} /> Printen
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>Druk je eigen kaarten af</h2>
      </div>

      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button onClick={onViewPrintShop} className="btn btn-outline" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Drukkerij
          </button>
          <button className="btn btn-gradient-game" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Thuisprint
          </button>
        </div>
      </div>

      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', padding: '2.5rem', borderRadius: '24px', background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(147, 51, 234, 0.05) 100%)', border: '1px solid rgba(147, 51, 234, 0.15)' }}>
        <h3 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '12px', fontSize: '1.4rem' }}>
          <span style={{ fontSize: '1.5rem' }}>✨</span> Een professioneel gedrukte set voor in jouw praktijk
        </h3>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
          Til je therapiesessies naar een hoger niveau met deze luxe kaartenset. Ontworpen om de abstracte theorie van schematherapie direct visueel en tastbaar te maken voor je cliënten. Perfect voor op tafel, overzichtelijk, en een onmisbare interactieve tool voor in de spreekkamer.
        </p>
        <div style={{ background: 'rgba(255,255,255,0.5)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.05)', marginTop: '1rem' }}>
          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
            <strong>Kun je zelf niet printen of wil je een hoogwaardige afdruk zonder zelf te hoeven knippen en snijden?</strong><br />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>Neem contact op of houd deze pagina in de gaten voor meer informatie.</span>
          </p>
        </div>
      </div>

      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', padding: '3rem', borderRadius: '24px' }}>
        <div className="inner-box" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
          <h3 className="box-heading" style={{ marginBottom: '1rem' }}>
            <Info size={28} color="#3b82f6" /> Printhulp voor Thuis / Praktijk
          </h3>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
          Met deze weergave kun je de kaarten zelf op A4-papier printen (bijv. op een inkjet of laserprinter thuis). De kaarten worden gerangschikt in een 3x3 grid. De achterkant-pagina's zijn <strong>gespiegeld</strong>, zodat ze perfect achter de voorkanten vallen als je dubbelzijdig print (omdraaien over de lange zijde). Druk op de "Print Proefdruk (A4)" knop hieronder.
        </p>

        <button onClick={handlePrint} className="btn btn-gradient" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <PrinterIcon size={20} /> Print Proefdruk (A4)
        </button>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <FileText size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
              <strong>Papierformaat:</strong> A4 Staand (Portrait)
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Maximize size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
              <strong>Schaal & Marges:</strong> Schaal op 100% of Standaard. Marges op <strong>Geen</strong> (Heel belangrijk voor dubbelzijdige uitlijning!)
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <Files size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
              <strong>Dubbelzijdig:</strong> Omdraaien over de lange zijde (Long edge binding)
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {chunks.map((chunk, chunkIdx) => {
          
          // Reorder the back page so it mirrors horizontally for double sided print
          // Original:
          // 0 1 2
          // 3 4 5
          // 6 7 8
          // Mirrored:
          // 2 1 0
          // 5 4 3
          // 8 7 6
          const backChunk = [];
          for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
              const originalIndex = row * 3 + (2 - col);
              backChunk.push(chunk[originalIndex] || null); // null for empty slots on last page
            }
          }

          return (
            <React.Fragment key={chunkIdx}>
              {/* PAGE: FRONTS */}
              <div className="a4-page" style={{ width: '210mm', height: '297mm', background: 'white', padding: '10mm', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <div className="a4-page-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58mm)', gridAutoRows: '88mm', gap: '5mm', justifyContent: 'center', alignContent: 'center', height: '100%' }}>
                  {chunk.map((card, i) => {
                    const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'white';
                    return (
                    <div key={`front-${i}`} style={{ width: '58mm', height: '88mm', border: '1px dashed #ccc', boxSizing: 'border-box', position: 'relative', background: card ? `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)` : 'transparent', borderRadius: '6px', overflow: 'hidden' }}>
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
                              {card.src && <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: 'scale(1.18)', ...card.style }} />}
                            </div>

                            {/* Footer (Title) */}
                            {card.title && (
                              <div style={{ textAlign: 'center', fontSize: '12.5px', fontWeight: '900', color: 'black', margin: '2mm 0 6mm 0', lineHeight: '1.2', height: '10mm', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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

              {/* PAGE: BACKS */}
              <div className="a4-page" style={{ width: '210mm', height: '297mm', background: 'white', padding: '10mm', boxSizing: 'border-box', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
                <div className="a4-page-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 58mm)', gridAutoRows: '88mm', gap: '5mm', justifyContent: 'center', alignContent: 'center', height: '100%' }}>
                  {backChunk.map((card, i) => {
                    const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'white';
                    return (
                    <div key={`back-${i}`} style={{ width: '58mm', height: '88mm', border: '1px dashed #ccc', boxSizing: 'border-box', visibility: card ? 'visible' : 'hidden', position: 'relative', background: 'white', borderRadius: '6px', overflow: 'hidden' }}>
                      {card && (
                        <>
                          <CardInnerBorder color={cardColor} />
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '5mm 8mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                            <div style={{ height: '18mm', width: '100%', display: 'flex', alignItems: 'flex-end', borderBottom: `2px solid ${cardColor}`, paddingBottom: '3mm', margin: '0 0 4mm 0', flexShrink: 0, zIndex: 1 }}>
                              <h4 style={{ margin: 0, fontSize: '0.9rem', color: 'black', textAlign: 'center', width: '100%' }}>
                                {formatCardTitle(card.title)}
                              </h4>
                            </div>
                            <div style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#111', margin: '0', textAlign: 'center', flexShrink: 0, zIndex: 1 }}>
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
