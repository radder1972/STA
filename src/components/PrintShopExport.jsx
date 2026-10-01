import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, PrinterIcon } from './Icons';
import { FileText, Maximize, Image as ImageIcon, Info } from 'lucide-react';
import { getCardColor, CardInnerBorder } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { schemaDescriptions } from '../data/descriptions';
import { getVerdieping } from '../data/verdieping';
import { formatCardTitle, getCardTypeLetter, getCardTypeLabel } from './SchemaCard';

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

  const [borderMode, setBorderMode] = useState('5mm'); // '5mm' (PeterPrint), 'original' (1.6mm), 'none' (randloos)
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-shop-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
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
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <PrinterIcon size={40} useGameGradient={true} /> Printen
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>Druk je eigen kaarten af</h2>
      </div>
      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button className="btn btn-gradient-game" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Drukkerij
          </button>
          <button onClick={onViewHomePrintExport} className="btn btn-outline" style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            Thuisprint
          </button>
        </div>
      </div>

      <div className="no-print glass-panel" style={{ width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', padding: '3rem', borderRadius: '24px' }}>
        <div className="inner-box" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', margin: 0 }}>
          <h3 className="box-heading" style={{ marginBottom: '1rem' }}>
            <Info size={28} color="#3b82f6" /> Printhulp voor Drukkerijen
          </h3>
        <p style={{ color: 'var(--text-main)', lineHeight: '1.6', margin: 0 }}>
          Deze weergave is geoptimaliseerd voor professionele drukkerijen. Het papierformaat voor de PDF is ingesteld op <strong>Speelkaarten formaat (64x94mm inclusief 3mm afloop rondom)</strong>. Na het printen snijdt de drukker er rondom 3mm af, zodat de kaarten exact 58x88mm worden zonder witte randjes. Druk op de "Genereer Print-PDF" knop hieronder en kies "Opslaan als PDF" in Chrome.
        </p>

        {/* Kader Keuze Selector */}
        <div style={{ marginTop: '0.5rem', background: 'rgba(59, 130, 246, 0.08)', padding: '1.25rem', borderRadius: '16px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
          <div style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.6rem' }}>
            Kaderinstelling (PeterPrint):
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
            <button 
              onClick={() => setBorderMode('5mm')} 
              className={`btn ${borderMode === '5mm' ? 'btn-gradient-game' : 'btn-outline'}`}
              style={{ padding: '6px 14px', fontSize: '0.85rem', cursor: 'pointer', border: 'none' }}
            >
              🛡️ 5 mm kader (PeterPrint norm)
            </button>
            <button 
              onClick={() => setBorderMode('original')} 
              className={`btn ${borderMode === 'original' ? 'btn-gradient-game' : 'btn-outline'}`}
              style={{ padding: '6px 14px', fontSize: '0.85rem', cursor: 'pointer', border: 'none' }}
            >
              ⏪ 1.6 mm kader (Origineel)
            </button>
            <button 
              onClick={() => setBorderMode('none')} 
              className={`btn ${borderMode === 'none' ? 'btn-gradient-game' : 'btn-outline'}`}
              style={{ padding: '6px 14px', fontSize: '0.85rem', cursor: 'pointer', border: 'none' }}
            >
              ✨ Randloos (Geen kader)
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
            {borderMode === '5mm' && '✅ Het kader staat op 5 mm van de snijrand (8 mm van de paginarand). Dit voldoet aan de veiligheidsmarge van PeterPrint.'}
            {borderMode === 'original' && '⚠️ Het originele kader (1.6 mm van de snijrand). PeterPrint waarschuwt dat kleine snijverschillen hier direct opvallen.'}
            {borderMode === 'none' && '✨ Volledig randloos: geen kaders om de kaarten. Het kleurverloop loopt door tot de rand (professionele speelkaarten standaard).'}
          </p>
        </div>

        <button onClick={handlePrint} className="btn btn-gradient" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <PrinterIcon size={20} /> Genereer Print-PDF
        </button>

        <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <FileText size={20} color="#64748b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p style={{ margin: 0, color: 'var(--text-main)', lineHeight: '1.5' }}>
              <strong>Papierformaat:</strong> Aangepast (wordt automatisch door de browser geregeld, indien mogelijk, anders laat staan)
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

      <div className="print-shop-pages" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
        {allCards.map((card, idx) => {
          const cardColor = card.color || getCardColor(card.type, card.id);
          const verdieping = getVerdieping(card.title) || {};
          const borderInset = borderMode === '5mm' ? '8mm' : '3mm';
          return (
            <React.Fragment key={idx}>
              {/* VOORKANT */}
              <div className="print-shop-page card-front">
                <div className="print-shop-bleed" style={{ background: `radial-gradient(circle at center, white 30%, ${cardColor}50 130%)`, position: 'relative', width: '100%', height: '100%' }}>
                  <div style={{ position: 'absolute', top: borderInset, left: borderInset, right: borderInset, bottom: borderInset, borderRadius: '6px' }}>
                    {borderMode !== 'none' && <CardInnerBorder color={cardColor} outerColor={borderMode === '5mm' ? undefined : 'white'} />}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: borderMode === '5mm' ? '2mm' : '1mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                      {/* Header (Badge) */}
                      {card.type && getCardTypeLetter(card.type) && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', color: cardColor, lineHeight: 1.1, zIndex: 10, marginTop: borderMode === '5mm' ? (card.src ? '4mm' : '7mm') : (card.src ? '7mm' : '11mm') }}>
                          <span style={{ fontSize: card.src ? '14px' : '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: card.src ? '9mm' : '12mm', height: card.src ? '9mm' : '12mm', borderRadius: '50%', backgroundColor: 'black', color: 'white', marginBottom: '1.5mm', boxSizing: 'border-box' }}>{getCardTypeLetter(card.type)}</span>
                          <span style={{ fontSize: card.src ? '11px' : '13px', marginTop: '1mm', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'black', fontWeight: 'bold' }}>{getCardTypeLabel(card.type)}</span>
                        </div>
                      )}

                      {/* Image Container */}
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0, width: '100%' }}>
                        {card.src && <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: borderMode === '5mm' ? 'scale(1.08)' : 'scale(1.18)', ...card.style }} />}
                      </div>

                      {/* Footer (Title) */}
                      {card.title && (
                        <div style={{ textAlign: 'center', fontSize: borderMode === '5mm' ? '0.85rem' : '0.9rem', fontWeight: 'bold', color: 'black', margin: borderMode === '5mm' ? '1mm 0 4mm 0' : '2mm 0 6mm 0', lineHeight: '1.2', height: borderMode === '5mm' ? '9mm' : '10mm', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                  <div style={{ position: 'absolute', top: borderInset, left: borderInset, right: borderInset, bottom: borderInset, background: 'white', borderRadius: '6px' }}>
                    {borderMode !== 'none' && <CardInnerBorder color={cardColor} />}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: borderMode === '5mm' ? '3mm 5mm' : '5mm 8mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', boxSizing: 'border-box' }}>
                      <div style={{ height: borderMode === '5mm' ? '15mm' : '18mm', width: '100%', display: 'flex', alignItems: 'flex-end', borderBottom: `2px solid ${cardColor}`, paddingBottom: '2.5mm', margin: borderMode === '5mm' ? '0 0 3mm 0' : '0 0 4mm 0', flexShrink: 0, zIndex: 1 }}>
                        <h4 style={{ margin: 0, fontSize: borderMode === '5mm' ? '0.85rem' : '0.9rem', color: 'black', textAlign: 'center', width: '100%' }}>
                          {formatCardTitle(card.title)}
                        </h4>
                      </div>
                      <div style={{ fontSize: borderMode === '5mm' ? '0.82rem' : '0.9rem', fontWeight: 'normal', lineHeight: '1.4', color: '#111', margin: '0', textAlign: 'center', flexShrink: 0, zIndex: 1 }}>
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
