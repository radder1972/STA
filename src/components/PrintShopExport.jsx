import React, { useEffect } from 'react';
import { ArrowLeftIcon } from './Icons';
import { getCardColor, CardInnerBorder } from '../utils/colors';
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

const schemaGroups = [
  { group: 'Verlating & Afwijzing', titles: ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'] },
  { group: 'Verzwakte Autonomie', titles: ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'] },
  { group: 'Verzwakte Grenzen', titles: ['Onvoldoende zelfcontrole', 'Veeleisendheid / Grandiositeit'] },
  { group: 'Gerichtheid op Anderen', titles: ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'] },
  { group: 'Overmatige Waakzaamheid', titles: ['Emotionele geremdheid', 'Meedogenloze normen', 'Negativisme / Pessimisme', 'Bestraffendheid'] }
];
const schemaSortOrder = schemaGroups.flatMap(g => g.titles);

const modeGroups = [
  { group: 'Kindmodi', titles: ['Kwetsbare kind', 'Boze kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind'] },
  { group: 'Coping: Overgave', titles: ['Willoze inschikkelijke'] },
  { group: 'Coping: Vermijding', titles: ['Onthechte beschermer', 'Onthechte zelfsusser'] },
  { group: 'Coping: Overcompensatie', titles: ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'] },
  { group: 'Oudermodi', titles: ['Straffende ouder', 'Veeleisende ouder'] },
  { group: 'Gezonde Volwassene', titles: ['Gezonde volwassene'] }
];
const modeSortOrder = modeGroups.flatMap(g => g.titles);

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

export default function PrintShopExport({ onBack }) {
  useEffect(() => {
    document.body.classList.add('print-shop-export-mode');
    return () => {
      document.body.classList.remove('print-shop-export-mode');
    };
  }, []);

  // Assemble all cards
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
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
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
        <button onClick={handlePrint} className="btn btn-gradient" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem' }}>
          Genereer Print-PDF
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
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: '8mm 6mm 2mm 6mm' }}>
                        <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                      </div>
                      {card.title && (
                        <div style={{ textAlign: 'center', fontSize: '0.9rem', fontWeight: 'bold', margin: '2mm 0 10mm 0', lineHeight: '1.2', color: 'black' }}>
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
                    <CardInnerBorder color={cardColor} outerColor="white" />
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
