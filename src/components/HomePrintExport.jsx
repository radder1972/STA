import React from 'react';
import { ArrowLeftIcon } from './Icons';
import { getCardColor } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';
import { schemaDescriptions } from '../data/descriptions';
import { getVerdieping } from '../data/verdieping';

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

const formatCardTitle = (title) => {
  if (!title) return title;
  
  if (title === 'Kwetsbaarheid voor ziekte en gevaar') {
    return <>Kwetsbaarheid voor ziekte<br />en gevaar</>;
  }
  if (title === 'Kluwen / Onderontwikkeld zelf') {
    return <>Kluwen / Onderontwikkeld<br />zelf</>;
  }
  
  if (title.length > 20 && title.includes(' / ')) {
    const parts = title.split(' / ');
    return <>{parts[0]} /<br />{parts[1]}</>;
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

const basisbehoeftenText = {
  'Veilige hechting': 'Veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een thuishaven zonder angst voor verlating of afwijzing.',
  'Autonomie': 'Ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen als onafhankelijk individu.',
  'Vrije expressie': 'Ruimte om je vrij uit te drukken. Eigen gevoelens (ook boosheid of verdriet) en behoeften zijn geldig en belangrijk.',
  'Spontaniteit en spel': 'Ruimte voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn.',
  'Realistische grenzen': 'Kaders om te leren omgaan met frustratie. Leren dat je niet altijd je zin kunt krijgen en rekening moet houden met anderen.'
};

const categorieText = {
  'Kindmodi': 'De modus waarin je je kwetsbaar, eenzaam, boos of impulsief voelt, net als een kind van vroeger dat iets tekortkwam.',
  'Oudermodi': 'De geïnternaliseerde stem van een veeleisende of straffende ouder. Een innerlijke criticus die zegt dat je tekortschiet.',
  'Coping: Overgave': 'Je gedraagt je alsof het schema 100% waar is. Je past je aan en ondergaat de situatie passief.',
  'Coping: Vermijding': 'Je vermijdt de emotionele pijn van het schema door situaties uit de weg te gaan of jezelf af te leiden/verdoven.',
  'Coping: Overcompensatie': 'Je vecht tegen het schema door je precies tegenovergesteld te gedragen aan wat het schema dicteert.',
  'Gezonde volwassene': 'De gezonde kant die zorgt voor het kwetsbare kind, gezonde grenzen stelt en de strenge oudermodi bestrijdt.'
};

const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness_unlovability': 'Tekortschieten / Schaamte',
  'Emotional deprivation': 'Emotioneel tekort',
  'Social isolation_Alienation': 'Sociale isolatie / Vervreemding',
  'Practical incompetence_Dependence': 'Afhankelijkheid / Incompetentie',
  'Vulnerability to harm_illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Kluwen / Onderontwikkeld zelf',
  'Failure to achieve': 'Mislukken',
  'Insufficient self-control_self-discipline': 'Onvoldoende zelfcontrole',
  'Entitlement_Superiority': 'Veeleisendheid / Grandiositeit',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration_Recognition-seeking': 'Goedkeuring / Erkenning zoeken',
  'Pessimism_Worry': 'Negativisme / Pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen',
  'Self-punitiveness': 'Bestraffendheid'
};

const schemaSortOrder = [
  'Verlating / Instabiliteit',
  'Wantrouwen / Misbruik',
  'Emotioneel tekort',
  'Tekortschieten / Schaamte',
  'Sociale isolatie / Vervreemding',
  'Afhankelijkheid / Incompetentie',
  'Kwetsbaarheid voor ziekte en gevaar',
  'Kluwen / Onderontwikkeld zelf',
  'Mislukken',
  'Onvoldoende zelfcontrole',
  'Veeleisendheid / Grandiositeit',
  'Onderwerping',
  'Zelfopoffering',
  'Goedkeuring / Erkenning zoeken',
  'Emotionele geremdheid',
  'Meedogenloze normen',
  'Negativisme / Pessimisme',
  'Bestraffendheid'
];

const smiModesMap = {
  'kk': 'Kwetsbare kind',
  'rk': 'Razende kind',
  'ik': 'Impulsieve kind',
  'ok': 'Ongedisciplineerde kind',
  'bk': 'Boze kind',
  'wi': 'Willoze inschikkelijke',
  'ob': 'Onthechte beschermer',
  'oz': 'Onthechte zelfsusser',
  'wk': 'Wantrouwende overcontroleerder',
  'zh': 'Zelfverheerlijker',
  'pa': 'Pest en aanval',
  'so': 'Straffende ouder',
  'vo': 'Veeleisende ouder',
  'gv': 'Gezonde volwassene'
};

const modeSortOrder = [
  'Kwetsbare kind',
  'Boze kind',
  'Razende kind',
  'Impulsieve kind',
  'Ongedisciplineerde kind',
  'Willoze inschikkelijke',
  'Onthechte beschermer',
  'Onthechte zelfsusser',
  'Wantrouwende overcontroleerder',
  'Zelfverheerlijker',
  'Pest en aanval',
  'Straffende ouder',
  'Veeleisende ouder'
];


export default function HomePrintExport({ onBack, onViewPrintShop }) {
  const allCards = [];

  // 1. Basisbehoeften
  const basisCards = [
    { src: imgB1, title: 'Veilige hechting', description: basisbehoeftenText['Veilige hechting'], color: '#60a5fa' },
    { src: imgB2, title: 'Autonomie', description: basisbehoeftenText['Autonomie'], color: '#34d399' },
    { src: imgB5, title: 'Realistische grenzen', description: basisbehoeftenText['Realistische grenzen'], color: '#fb923c' },
    { src: imgB3, title: 'Vrije expressie', description: basisbehoeftenText['Vrije expressie'], color: '#facc15' },
    { src: imgB4, title: 'Spontaniteit en spel', description: basisbehoeftenText['Spontaniteit en spel'], color: '#f87171' }
  ];
  allCards.push(...basisCards.map(c => ({...c, type: 'basisbehoefte', style: {transform: 'scale(0.85)'}})));

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

  // 3. Modi Categorieen
  const modiCatCards = [
    { src: imgM1, title: 'Kindmodi', description: categorieText['Kindmodi'], color: '#60a5fa' },
    { src: imgM2, title: 'Oudermodi', description: categorieText['Oudermodi'], color: '#f87171' },
    { src: imgM3a, title: 'Coping: Overgave', description: categorieText['Coping: Overgave'], color: '#facc15' },
    { src: imgM3b, title: 'Coping: Vermijding', description: categorieText['Coping: Vermijding'], style: { width: '80%', height: '80%' }, color: '#facc15' },
    { src: imgM3c, title: 'Coping: Overcompensatie', description: categorieText['Coping: Overcompensatie'], color: '#facc15' },
    { src: imgM4, title: 'Gezonde volwassene', description: categorieText['Gezonde volwassene'], color: '#34d399' },
  ];
  allCards.push(...modiCatCards.map(c => ({...c, type: 'modicategorie', style: {transform: 'scale(0.85)'}})));

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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="home-print-container" style={{ background: '#f0f0f0', minHeight: '100vh', padding: '1rem' }}>
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          .home-print-container {
            padding: 0 !important;
            background: white !important;
          }
          .a4-page {
            page-break-after: always;
            break-after: page;
            margin: 0 !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
          /* Force exact sizing for A4 to prevent scaling */
          .a4-page-content {
            width: 190mm !important; /* A4 width (210) minus 2x10mm margins */
            height: 277mm !important; /* A4 height (297) minus 2x10mm margins */
          }
        }
      `}</style>

      <div className="no-print" style={{ maxWidth: '800px', margin: '0 auto 2rem auto', background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
        <h1 style={{ color: 'black', marginBottom: '1rem' }}>Thuisprint Export (A4)</h1>
        <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '1rem' }}>
          Met deze optie kun je de kaarten zelf op A4-papier printen om te proberen (bijv. op een inkjet of laserprinter thuis).<br/>
          De kaarten worden gerangschikt in een 3x3 grid. De achterkant-pagina's zijn <strong>gespiegeld</strong>, zodat ze perfect achter de voorkanten vallen als je dubbelzijdig print (omdraaien over de lange zijde).
        </p>
        <p style={{ color: '#333', lineHeight: '1.6', marginBottom: '1rem' }}>
          Zorg dat je printer instaat op:
          <br/><br/>
          - <strong>Papierformaat:</strong> A4 Staand (Portrait)<br/>
          - <strong>Schaal:</strong> 100% of Standaard (Niet passend maken!)<br/>
          - <strong>Dubbelzijdig:</strong> Omdraaien over de lange zijde (Long edge binding)<br/>
          - <strong>Achtergrondafbeeldingen:</strong> AAN<br/>
          - <strong>Marges:</strong> Standaard (of Minimum)<br/>
        </p>
        <button onClick={handlePrint} className="btn btn-gradient" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginBottom: '1rem' }}>
          Print Proefdruk (A4)
        </button>
        <button onClick={onViewPrintShop} className="btn btn-outline" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
          Terug naar Drukkerij Export
        </button>
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
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8mm 6mm 2mm 6mm' }}>
                              <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                            </div>
                            {card.type && getCardTypeLetter(card.type) && (
                              <>
                                <div style={{ position: 'absolute', top: '4mm', left: '4mm', display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', fontSize: '18px', color: cardColor, lineHeight: 1.1, zIndex: 10 }}>
                                  <span>{getCardTypeLetter(card.type)}</span>
                                </div>
                                <div style={{ position: 'absolute', bottom: '4mm', right: '4mm', display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '900', fontSize: '18px', color: cardColor, transform: 'rotate(180deg)', lineHeight: 1.1, zIndex: 10 }}>
                                  <span>{getCardTypeLetter(card.type)}</span>
                                </div>
                              </>
                            )}
                            {card.title && (
                              <div style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', margin: '2mm 0 10mm 0', lineHeight: '1.2', color: 'black' }}>
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
                          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: '5mm', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxSizing: 'border-box' }}>
                            <h4 style={{ margin: '0 0 4mm 0', fontSize: '0.9rem', color: 'black', borderBottom: `2px solid ${cardColor}`, paddingBottom: '3mm', textAlign: 'center', width: '100%', flexShrink: 0, zIndex: 1 }}>
                              {formatCardTitle(card.title)}
                            </h4>
                            <p style={{ fontSize: '0.75rem', lineHeight: '1.4', color: '#111', margin: '0 0 6mm 0', textAlign: 'center', flexShrink: 0, zIndex: 1 }}>
                              {card.description}
                            </p>
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
